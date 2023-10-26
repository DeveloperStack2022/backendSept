import { MongoHelper } from '@/infra/db'
import {CreateTerminalesMoviles} from '@/data/protocols'
import { Collection, MongoAPIError } from 'mongodb'
export class TerminalesMovilesMongoRepository implements CreateTerminalesMoviles {
    private db: Collection = null 
    constructor(){
        this.db = MongoHelper.getCollection('ApoyoTecnico_TerminalesMoviles')
    }
    
    async create_terminales_moviles(params: CreateTerminalesMoviles.Params): Promise<CreateTerminalesMoviles.Result> {
        const data_id = (await this.db.insertMany(params)).insertedIds
        return Object.values(data_id).map(value => value.toHexString())
    }
}