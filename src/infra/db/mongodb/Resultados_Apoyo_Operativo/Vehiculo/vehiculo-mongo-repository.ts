import {MongoHelper,QueryBuilder} from '@/infra/db'
import {ObjectId,Collection} from 'mongodb'
import {CreateVehiculos} from '@/data/protocols'


export class VehiculoMongoRepository implements CreateVehiculos {
    
    private db:Collection = null

    constructor(){
        this.db = MongoHelper.getCollection('ApoyoTecnico_Vehiculos')
    }

    async create_vehiculos(params: CreateVehiculos.Params): Promise<CreateVehiculos.Result> {
        const vehiculos_created = (await this.db.insertMany(params)).insertedIds
        const data_id =  Object.values(vehiculos_created).map(value => value.toHexString())
        return data_id
    }
}