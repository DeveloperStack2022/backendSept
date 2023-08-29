import {MongoHelper,QueryBuilder} from '@/infra/db'
import {ObjectId,Collection} from 'mongodb'
import {CreateDetenido} from '@/data/protocols'




export class DetenidoMongoRepository implements CreateDetenido {
    
    private db:Collection = null

    constructor(){
        this.db = MongoHelper.getCollection('ApoyoTecnico_Detenido')
    }

    async create_detenido(params: CreateDetenido.Params): Promise<CreateDetenido.Result> {
        const ids_detenidos = (await this.db.insertMany(params)).insertedIds
        return Object.values(ids_detenidos).map(value => value.toHexString())
    }
}