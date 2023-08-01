import {CreateAnalista } from '@/data/protocols'
import { MongoHelper } from '../../mongo-helper'

export class CreateAnalistaMongoRepository  implements CreateAnalista {

    async create_analista(data: CreateAnalista.Params): Promise<CreateAnalista.Resutl> {
        const AnalistaCollection = MongoHelper.getCollection('Analista')

        const created = await AnalistaCollection.insertOne({...data})

        return {
            create: created ? true : false
        }
        
    }
}