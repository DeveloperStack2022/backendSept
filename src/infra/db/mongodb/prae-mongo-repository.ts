import {MongoHelper,QueryBuilder} from '@/infra/db'
import {Collection, ObjectId} from 'mongodb'
import {AddRegistroPraeRepository} from '@/data/protocols'



export class PraeMongoRepository implements AddRegistroPraeRepository {
    
    private db:Collection = null
    constructor() {
        this.db = MongoHelper.getCollection('RegistroPrae')
    }

    async add(data: AddRegistroPraeRepository.Params): Promise<AddRegistroPraeRepository.Result> {
        const data_add = await this.db.insertOne({...data,fecha: new Date(data.fecha)})
        if (!data_add.insertedId){
            return false;
        }
        return true;
    }

}