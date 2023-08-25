import {MongoHelper,QueryBuilder} from '@/infra/db'
import {ObjectId,Collection} from 'mongodb'
import {CreateDinero} from '@/data/protocols'




export class DineroMongoRepository implements CreateDinero {
    
    private db:Collection = null

    constructor(){
        this.db = MongoHelper.getCollection('ApoyoTecnico_Dinero')
    }

    async create_dinero(params: CreateDinero.Params): Promise<CreateDinero.Result> {
        const data_id = (await this.db.insertMany(params)).insertedIds
        return Object.values(data_id).map(value => value.toHexString())
    }
}