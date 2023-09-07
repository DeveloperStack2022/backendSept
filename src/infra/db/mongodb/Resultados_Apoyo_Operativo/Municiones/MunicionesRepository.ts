import {MongoHelper,QueryBuilder} from '@/infra/db'
import {ObjectId,Collection} from 'mongodb'
import {CreateMuniciones} from '@/data/protocols'

export class MunicionesMongoRepository implements CreateMuniciones {
    private db:Collection = null 

    constructor() {
        this.db = MongoHelper.getCollection('ApoyoTecnico_Municiones')
    }

    async create_municiones(params: CreateMuniciones.Params): Promise<CreateMuniciones.Result> {
        const data_ids = (await this.db.insertMany(params)).insertedIds
        return Object.values(data_ids).map(value => value.toHexString())
    }
}