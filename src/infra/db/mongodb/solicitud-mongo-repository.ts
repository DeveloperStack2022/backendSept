import { MongoHelper, QueryBuilder } from '@/infra/db'
import { AddSolicitudRepository,LoadSolicitudesRepository,LoadSolicitudByIdRepository,CheckSolicitudByIdRepository,AddSolicitudManyRepository } from '@/data/protocols/db'
import {LoadSolicitudByIpRepository,LoadsolicitudByCasoRepository} from '@/data/protocols/db'
import { ObjectId } from 'mongodb'
import { AddManySolicitud, AddSolicitud } from '@/domain/usecases'
import { SolicitudResult } from '@/domain/models'
import moment from 'node-moment'


export class SolicitudMongoRepository implements AddSolicitudRepository,LoadSolicitudesRepository, LoadSolicitudByIdRepository,CheckSolicitudByIdRepository,AddSolicitudManyRepository,LoadSolicitudByIpRepository,LoadsolicitudByCasoRepository {
  async add (data: AddSolicitud.Params): Promise<void> {
    const solicitudCollection = MongoHelper.getCollection('solicitud')
    const celularCollection = MongoHelper.getCollection('celulares')
    const solicitanteCollection = MongoHelper.getCollection('solicitantes')
    const ubicacionCollection = MongoHelper.getCollection('ubicacion')

    const idsCelulares = []

    if (data.celular.length > 0) {
      data.celular.map(async item => {
        const id = (await celularCollection.insertOne({ ...item })).insertedId
        idsCelulares.push(id)
      })
    }
    const solicitanteInsert = await solicitanteCollection.insertOne(data.solicitante)
    const ubicacionInsert = await ubicacionCollection.insertMany(data.ubicacion)

    const idsUbicaciones = []
    for (let i = 0; i < ubicacionInsert.insertedCount; i++) {
      idsUbicaciones.push(ubicacionInsert.insertedIds[i])
    }

    const solicitudInsert = await solicitudCollection.insertOne({ ...data,celular: idsCelulares,solicitante: new ObjectId(solicitanteInsert.insertedId),ubicacion: idsUbicaciones })

    const idSolicitud = solicitudInsert.insertedId

    await solicitanteCollection.findOneAndUpdate({ _id: new ObjectId(solicitanteInsert.insertedId) },{
      $set: {
        id_solicitud: new ObjectId(idSolicitud)
      }
    })

    if (idsCelulares.length > 0) {
      idsCelulares.map(async (item,index) => {
        await celularCollection.findOneAndUpdate({ _id: new ObjectId(item) },{
          $set: {
            id_solicitud: new ObjectId(idSolicitud),
            id_ubicacion: new ObjectId(idsUbicaciones[index])
          }
        })
      })
    }

    if (idsUbicaciones.length > 0) {
      idsUbicaciones.map(async (item,index) => {
        await ubicacionCollection.findOneAndUpdate({ _id: new ObjectId(item) },{
          $set: {
            id_solicitud: new ObjectId(idSolicitud),
            id_celular: new ObjectId(idsCelulares[index])
          }
        })
      })
    }
  }

 async loadAll(accountId: string, skip: number, limit: number):Promise<LoadSolicitudesRepository.Result> {

  console.log(accountId)
  const solicitudCollection = MongoHelper.getCollection('solicitud')
    const query = new QueryBuilder()
      .match({
        'accountId': accountId
      })
      .lookup({
        from: 'solicitantes',
        foreignField: '_id',
        localField: 'solicitante',
        as: 'solicitante_result'
      })
      .unwind({ path: '$solicitante_result' })
      .lookup({
        from: 'celulares',
        foreignField: '_id',
        localField: 'celular',
        as: 'celulares_solicitados'
      })
      .skip(skip)
      .limit(limit)
      .build()
    
    const solicitudes = await solicitudCollection.aggregate(query).toArray()
    return MongoHelper.mapCollection(solicitudes)
 }

  async loadById (idSolicitud: string): Promise<SolicitudResult> {
    
    const solicitudCollection = MongoHelper.getCollection('solicitud')
    const query = new QueryBuilder()
      .match({
        _id: new ObjectId(idSolicitud)
      })
      .lookup({
        from: 'solicitantes',
        foreignField: '_id',
        localField: 'solicitante',
        as: 'solicitante_result'
      })
      .lookup({
        from: 'celulares',
        foreignField: '_id',
        localField: 'celular',
        as: 'celulares_solicitados'
      })
      .lookup({
        from: 'ubicacion',
        foreignField: '_id',
        localField: 'ubicacion',
        as: 'ubicaciones_celulares'
      })
      .build()

    const solicitud = await solicitudCollection.aggregate<SolicitudResult>(query).toArray()
    return solicitud.length ? solicitud[0] : null
  }

  async checkById (id: string): Promise<boolean> {
    const solicitudCollection = MongoHelper.getCollection('solicitud')
   
    const solicitud = await solicitudCollection.findOne({
      _id: new ObjectId(id)
    },{
      projection: {
        _id: 1
      }
    })
    return solicitud !== null
  }
  async addMany(data: AddManySolicitud.Params[]): Promise<void> {
    const solicitudCollection = MongoHelper.getCollection('solicitudes_excel')
    const celularesCollection = MongoHelper.getCollection('celulares_excel')
    const ubicacionesCollection = MongoHelper.getCollection('ubicaciones_excel')
    const solicitanteCollection = MongoHelper.getCollection('solicitantes_excel')

    const valores = this.addDataArray(data)
    for(let i = 0; i < valores.length; i++){

      let id_solicitud = (await solicitudCollection.insertOne({
        'hora': valores[i].hora,
        'fecha': moment(valores[i].fecha).toISOString(),
        'ip':valores[i].ip,
        'delito':valores[i].delito,
        'organizacion_delicuencial':'',
        caso:valores[i].caso,
        plataforma:'SEPTIER'
      })).insertedId

      const id_solicitante  = (await solicitanteCollection.insertOne({
        grado: valores[i].grado,
        nombres: valores[i].nombres,
        unidad: valores[i].unidad,
        id_solicitud: id_solicitud
      })).insertedId

      // Solo para las solicitudes que solo han pedido un solo numero 
      if(valores[i].celulares.length == 1 && valores[i].ubicaciones.length == 1 ) {
        // Inser numeros celulare 
        let id_celular = (await celularesCollection.insertOne({
          numero_celular:valores[i].celulares[0].numero_celular,
          imsi: valores[i].celulares[0].imsi,
          id_solicitud: id_solicitud
        })).insertedId;

        // Insert ubicaciones 
        let id_ubicacion = (await ubicacionesCollection.insertOne({
          latitud: valores[i].ubicaciones[0].latitud,
          longitud: valores[i].ubicaciones[0].longitud,
          id_solicitud: id_solicitud,
          id_celular:id_celular
        })).insertedId

        await celularesCollection.updateOne({_id: id_celular},{
          $set:{
            id_ubicacion: id_ubicacion
          }
        })
        await solicitudCollection.updateOne({_id: id_solicitud},{
          $set:{
            'celular':[id_celular],
            'ubicacion':[id_ubicacion],
            solicitante:id_solicitante
          }
        })
      }

      if(valores[i].celulares.length > 1 && valores[i].ubicaciones.length > 1) {
        let ids_celulares = await this.addManyCelulares(valores[i].celulares,id_solicitud)
        // Transform Objects to Array --> Object.values(ids_celulares)
        let ids_ubicaciones = await this.addManyUbicacion(valores[i].ubicaciones,id_solicitud,Object.values(ids_celulares))
        // console.log(ids_celulares)
        await this.updateManyCelulares(Object.values(ids_celulares),Object.values(ids_ubicaciones))

        await solicitudCollection.updateOne({_id: id_solicitud},{
          $set:{
            'celular':ids_celulares,
            'ubicacion':ids_ubicaciones,
            solicitante:id_solicitante
          }
        })
           
      }

     
    }

  }   

  async load_solicitud_by_caso(caso: string): Promise<LoadsolicitudByCasoRepository.Result> {
    const solicitudCollection = MongoHelper.getCollection('solicitud')

    const query = new QueryBuilder()
      .match({
        'caso':caso
      })
      .build()
    
    const solicitudes =  await solicitudCollection.aggregate(query).toArray()
    return MongoHelper.mapCollection(solicitudes)
  }

  async load_solicitud_by_ip(ip: string): Promise<LoadSolicitudByIpRepository.Result> {
    const solicitudCollection = MongoHelper.getCollection('solicitud')
    const query = new QueryBuilder()
      .match({
        'investigacion_previa':ip
      })
      .build()
    const solicitudes = await solicitudCollection.aggregate(query).toArray()
    return MongoHelper.mapCollection(solicitudes)
  }


  private async addManyCelulares(data:any[],id_solicitud:ObjectId ):Promise<any>{
    const celularesCollection = MongoHelper.getCollection('celulares_excel')

    for(let i =0;i < data.length; i++){
      data[i].id_solicitud = id_solicitud
    }

    const ids_ = (await celularesCollection.insertMany(data)).insertedIds
    return ids_
  }

  private async addManyUbicacion(data:any[],id_solicitud:ObjectId,ids_celulares:any[]):Promise<any>{
    const ubicacionesCollection = MongoHelper.getCollection('ubicaciones_excel')

    for(let i =0; i < data.length; i++){
      data[i].id_solicitud = id_solicitud
      data[i].id_celular = ids_celulares[i]
    }

    const ids_ = (await ubicacionesCollection.insertMany(data)).insertedIds
    return ids_
  }

  private async updateManyCelulares(id_celulares:any[],id_ubicaciones:any[]):Promise<void>{
    const celularCollection = MongoHelper.getCollection('celulares_excel')

    for(let i = 0; i < id_celulares.length;i++){
      await celularCollection.updateOne({_id:id_celulares[i]},{
        $set: {
          'id_ubicacion':id_ubicaciones[i]
        }
      })
    }
  }


  private addDataArray(datos:any[]):any[] {
    return datos.reduce((acc,current)=> {
      const founddItem = acc.find(it => (it.hora == current.hora && it.unidad == current.unidad))
      if(founddItem){
        founddItem.celulares = founddItem.celulares ? [...founddItem.celulares, {'numero_celular':current.numero_celular,'imsi':current.imsi}] : [{'numero_celular':current.numero_celular,'imsi':current.imsi}]
        founddItem.ubicaciones = founddItem.ubicaciones ? [...founddItem.ubicaciones,{'latitud':current.latitud == 0 ? '' : current.latitud,'longitud':current.longitud == 0 ? '':current.longitud }]: [{'latitud':current.latitud == 0 ? '' : current.latitud,'longitud':current.longitud == 0 ? '' : current.longitud}]
      }else {
        
        acc.push({
          ...current,
          'celulares':[{
            'numero_celular':current.numero_celular,
            'imsi':current.imsi
          }],
          'ubicaciones':[{
            'latitud':current.latitud == 0 ?   '' : current.latitud,
            'longitud':current.longitud == 0 ? '' : current.longitud
          }]
        })
        delete current.numero_celular
        delete current.imsi
        delete current.latitud
        delete current.longitud
      }
      delete acc.numero_celular
      delete acc.imsi
      delete acc.latitud
      delete acc.longitud
      return acc;
    },[])
  }
}
