import {MongoHelper, QueryBuilder} from '@/infra/db'
import {AddSolicitudRepository,LoadSolicitudesRepository} from '@/data/protocols/db'
import {ObjectId} from 'mongodb'
import { AddSolicitud } from '@/domain/usecases'

export class SolicitudMongoRepository implements AddSolicitudRepository,LoadSolicitudesRepository {
    
    async add(data: AddSolicitud.Params):Promise<void> {
        const solicitudCollection = MongoHelper.getCollection('solicitud');
        const celularCollection = MongoHelper.getCollection('celulares');
        const solicitanteCollection = MongoHelper.getCollection('solicitantes')
        const ubicacionCollection = MongoHelper.getCollection('ubicacion')
        
        let ids_celulares = []
        if(data.celular.length > 0){
            data.celular.map(async item => {
                let id = (await celularCollection.insertOne({...item})).insertedId
                ids_celulares.push(id)
            })
        } 
        const solicitante_insert = await solicitanteCollection.insertOne(data.solicitante)
        const ubicacion_insert = await ubicacionCollection.insertMany(data.ubicacion)

        let ids_ubicaciones = []
        for(let i = 0; i < ubicacion_insert.insertedCount; i++){
            ids_ubicaciones.push(ubicacion_insert.insertedIds[i])
        }

        const solicitud_insert = await solicitudCollection.insertOne({...data,celular:ids_celulares,solicitante:new ObjectId(solicitante_insert.insertedId),ubicacion:ids_ubicaciones })
        
        const _id_solicitud = solicitud_insert.insertedId
        
        await solicitanteCollection.findOneAndUpdate({'_id':new ObjectId(solicitante_insert.insertedId)},{
            $set:{
                'id_solicitud':new ObjectId(_id_solicitud)
            }
        })

        if(ids_celulares.length > 0){
            ids_celulares.map(async (item,index) => {
                await celularCollection.findOneAndUpdate({_id:new ObjectId(item)},{
                    $set:{
                        'id_solicitud': new ObjectId(_id_solicitud),
                        'id_ubicacion':new ObjectId(ids_ubicaciones[index])
                    }
                })
            })
        }

        
        if(ids_ubicaciones.length > 0 ){
            ids_ubicaciones.map(async (item,index) => {
                await ubicacionCollection.findOneAndUpdate({_id: new ObjectId(item)},{
                    $set:{
                        'id_solicitud': new ObjectId(_id_solicitud),
                        'id_celular': new ObjectId(ids_celulares[index])
                    }
                })
            })
        }
        
        
    }

    async loadAll(accountId: string):Promise<LoadSolicitudesRepository.Result> {
        const solicitudCollection = MongoHelper.getCollection('solicitud');
        const query = new QueryBuilder()
            .match({
                "accountId": accountId
            })
            .lookup({
                from: 'solicitantes',
                foreignField: '_id',
                localField:'solicitante',
                as:'solicitante_result'
            })
            .unwind({path:'$solicitante_result'})
            .lookup({
                from: 'celulares',
                foreignField: '_id',
                localField:'celular',
                as:'celulares_solicitados'
            })
            .build()
            
        const solicitudes = await solicitudCollection.aggregate(query).toArray()
        return MongoHelper.mapCollection(solicitudes)
    }
}