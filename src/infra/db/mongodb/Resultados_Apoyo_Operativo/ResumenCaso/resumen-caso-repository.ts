import {MongoHelper,QueryBuilder} from '@/infra/db'
import {ObjectId,Collection} from 'mongodb'
import {CreateResumenCaso} from '@/data/protocols'



export class ResumenCasoMongoRepository implements CreateResumenCaso {
    
    private db:Collection = null

    constructor(){
        this.db = MongoHelper.getCollection('ApoyoTecnico_ResumenCaso')
    }

    async create_resumen_caso(params: CreateResumenCaso.Params): Promise<CreateResumenCaso.Result> {
        const id = (await this.db.insertOne({...params})).insertedId
        return id.toHexString()
    }
}