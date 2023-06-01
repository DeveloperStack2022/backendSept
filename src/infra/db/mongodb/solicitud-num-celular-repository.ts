import {MongoHelper,QueryBuilder} from '@/infra/db'
import {LoadNumCelularRepositoryI} from '@/data/protocols'

export class NumeroCelularMongoRepository implements LoadNumCelularRepositoryI {

    async load_num_celular(numero_celular: string): Promise<LoadNumCelularRepositoryI.Result> {
        const numeroCelularCollection = MongoHelper.getCollection('celulares')
        const query = new QueryBuilder()
            .match({
                numero_celular:numero_celular
            })
            .build()
        const docs_ = await numeroCelularCollection.aggregate(query).toArray()
        return MongoHelper.mapCollection(docs_)
    }
}   