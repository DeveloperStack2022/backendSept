import {MongoHelper,QueryBuilder} from '@/infra/db'
import {ObjectId} from 'mongodb'
import {GetAnalista} from '@/data/protocols'

export class AnalistaMongoDbRepository implements GetAnalista {

    async get_analista(id_analista: GetAnalista.Params): Promise<GetAnalista.Result> {
        const AnlistaCollection = MongoHelper.getCollection('Analista')

        const query = new QueryBuilder()
            .match({
                _id: new ObjectId(id_analista.id_analista)
            })
            .build()
        const analista = await AnlistaCollection.aggregate<GetAnalista.Result>(query).toArray()
        return analista.length ? analista[0] : null
    }
}