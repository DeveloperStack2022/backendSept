import {MongoHelper,QueryBuilder} from '@/infra/db'
import {LoadNumCelularRepositoryI} from '@/data/protocols'

export class NumeroCelularMongoRepository implements LoadNumCelularRepositoryI {

    async load_num_celular(numero_celular: string): Promise<LoadNumCelularRepositoryI.Result> {
        const numeroCelularCollection = MongoHelper.getCollection('celulares')

        const numeroCelularDoc = await numeroCelularCollection.find({numero_celular:numero_celular}).toArray()
        return numeroCelularDoc && MongoHelper.map(numeroCelularDoc)
    }
}   