import {MongoHelper,QueryBuilder} from '@/infra/db'
import {ObjectId,Collection} from 'mongodb'
import {CreateDinero} from '@/data/protocols'




export class DineroMongoRepository implements CreateDinero {
    
    private db:Collection = null

    constructor(){
        this.db = MongoHelper.getCollection('ApoyoTecnico_Dinero')
    }

    async create_dinero(params: CreateDinero.Params): Promise<CreateDinero.Result> {
        const valor_transform = this.convertNumberInStringToInt(params)
        const data_id = (await this.db.insertMany(valor_transform)).insertedIds
        return Object.values(data_id).map(value => value.toHexString())
    }

    private convertNumberInStringToInt(data: CreateDinero.Params){
        return data.map(item => {
            return {
                tipo_divisa: item.tipo_divisa,
                valor_total: item.valor_total,
                valor_total_int: parseInt(item.valor_total)
            }
        })
    }
}