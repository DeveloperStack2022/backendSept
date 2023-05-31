import {MongoHelper,QueryBuilder} from '@/infra/db'
import {LoadSolicitudTestRepository} from '@/data/protocols'
import { SolicitudModelTestResult,SolicitudModelTest } from '@/domain/models'

export class SolicitudTestMongoRepository implements LoadSolicitudTestRepository {
    async load(accountId: string, skip: number, limit: number): Promise<SolicitudModelTestResult> {
        // Get collection 
        const solicitudTestCollection = MongoHelper.getCollection('solicitud')
       
        const query = new QueryBuilder()
            .match({
                'accountId':accountId
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
            .sort({
                _id: -1
            })
            .skip(skip)
            .limit(limit)
            .build()
        
        const queryCounts = new QueryBuilder()
            .match({
                'accountId':accountId
            })
            .count('n_documents')
            .build()
        
        const solicitudes = await solicitudTestCollection.aggregate<SolicitudModelTest>(query).toArray()
        const n_documents = await solicitudTestCollection.aggregate(queryCounts).toArray()
        
        return {
            n_documents:n_documents[0]?.n_documents,
            solicitud: solicitudes
        }
    }
}