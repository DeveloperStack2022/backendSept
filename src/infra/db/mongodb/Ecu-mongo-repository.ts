import {CreateRegistroEcuRepository} from '@/data/protocols'
import { Collection } from 'mongodb'
import { MongoHelper } from './mongo-helper'

export class EcuMongoRepository implements CreateRegistroEcuRepository {
    private db:Collection = null

    constructor(){
        this.db = MongoHelper.getCollection('RegistroEcu')
    }

    async create_registro(params: CreateRegistroEcuRepository.Parmas): Promise<string> {
        
        const data = await this.db.insertOne({...params,fecha: new Date()})
        if(!data.insertedId) {
            return null
        }
        // convert to ObjectId -> string
        return data.insertedId.toHexString()
    }
}