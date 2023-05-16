import { MongoHelper, QueryBuilder } from '@/infra/db'
import { AddSolicitudRepository,LoadSolicitudesRepository,LoadSolicitudByIdRepository,CheckSolicitudByIdRepository } from '@/data/protocols/db'
import { ObjectId } from 'mongodb'
import { AddSolicitud } from '@/domain/usecases'
import { SolicitudModel } from '@/domain/models'

export class SolicitudMongoRepository implements AddSolicitudRepository,LoadSolicitudesRepository, LoadSolicitudByIdRepository,CheckSolicitudByIdRepository {
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

  async loadAll (accountId: string): Promise<LoadSolicitudesRepository.Result> {
    const solicitudCollection = MongoHelper.getCollection('solicitud')
    const query = new QueryBuilder()
      .match({
        accountId: accountId
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
      .build()

    const solicitudes = await solicitudCollection.aggregate(query).toArray()
    return MongoHelper.mapCollection(solicitudes)
  }

  async loadById (idSolicitud: string): Promise<SolicitudModel> {
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

    const solicitud = await solicitudCollection.aggregate<SolicitudModel>(query).toArray()
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
}
