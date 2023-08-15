import {MongoHelper,QueryBuilder} from '@/infra/db'
import {ObjectId,Collection} from 'mongodb'
import {CreateDatosGenerales} from '@/data/protocols'


export class DatosGeneralesMongoRepository implements CreateDatosGenerales {
    
    private db:Collection = null

    constructor(){
        this.db = MongoHelper.getCollection('ApoyoTecnico_DatosGenerales')
    }

    async create_datos_generales(params: CreateDatosGenerales.Params): Promise<any> {
        await this.db.insertOne({...params})

        return {
            message: 'Inserted'
        }
    }
}