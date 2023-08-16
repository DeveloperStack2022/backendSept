import {MongoHelper,QueryBuilder} from '@/infra/db'
import {ObjectId,Collection} from 'mongodb'
import {CreateDetenido} from '@/data/protocols'




export class DetenidoMongoRepository implements CreateDetenido {
    
    private db:Collection = null

    constructor(){
        this.db = MongoHelper.getCollection('ApoyoTecnico_Detenido')
    }

    async create_detenido(params: CreateDetenido.Params): Promise<any> {
        await this.db.insertOne({...params})
        return {
            'created':'create'
        }
    }
}