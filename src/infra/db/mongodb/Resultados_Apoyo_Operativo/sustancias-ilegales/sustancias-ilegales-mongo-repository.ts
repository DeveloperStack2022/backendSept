import {MongoHelper,QueryBuilder} from '@/infra/db'
import {ObjectId,Collection} from 'mongodb'
import {CreateSustanciasIlegales} from '@/data/protocols'




export class SustanciasIlegalesMongoRepository implements CreateSustanciasIlegales {
    
    private db:Collection = null

    constructor(){
        this.db = MongoHelper.getCollection('ApoyoTecnico_SustanciasIlegales')
    }

    async create_sustancias_ilegales(params: CreateSustanciasIlegales.Params): Promise<CreateSustanciasIlegales.Result> {
        const datas_id = (await this.db.insertMany(params)).insertedIds
        return Object.values(datas_id).map(value => value.toHexString())
    }   
    
}