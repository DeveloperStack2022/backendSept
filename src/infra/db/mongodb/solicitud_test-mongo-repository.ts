import {MongoHelper,QueryBuilder} from '@/infra/db'
import {LoadSolicitudTestRepository} from '@/data/protocols'
import { SolicitudModelTestResult,SolicitudModelTest } from '@/domain/models'

export class SolicitudTestMongoRepository implements LoadSolicitudTestRepository {
    async load(accountId: string, skip: number, limit: number): Promise<SolicitudModelTestResult> {
        // Get collection 
        const solicitudTestCollection = MongoHelper.getCollection('solicitud')
        const n_documents:number =await solicitudTestCollection.count()
        const query = new QueryBuilder()
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
        const solicitudes = await solicitudTestCollection.aggregate<SolicitudModelTest>(query).toArray()
       
        return {
            n_documents:n_documents,
            solicitud: solicitudes
        }
    }
}