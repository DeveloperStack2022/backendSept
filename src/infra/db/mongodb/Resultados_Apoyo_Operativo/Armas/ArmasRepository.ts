import {MongoHelper,QueryBuilder} from '@/infra/db'
import {ObjectId,Collection} from 'mongodb'
import {CreateArmas} from '@/data/protocols'


export class ArmasMongoRepository implements CreateArmas {
    
    private db:Collection = null

    constructor(){
        this.db = MongoHelper.getCollection('ApoyoTecnico_Armas')
    }

    async create_armas(params: CreateArmas.Params[]): Promise<CreateArmas.Result> {
        const armas_created = (await this.db.insertMany(params)).insertedIds
        return Object.values(armas_created).map(value => value.toHexString());   
    }
}