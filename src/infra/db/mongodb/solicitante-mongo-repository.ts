import {LoadSolicitanteById} from '@/data/protocols'
import {Collection } from 'mongodb'
import { MongoHelper } from './mongo-helper'
import { QueryBuilder } from './query-builder'


export class SolictanteMongoRepository implements LoadSolicitanteById {
    private db:Collection = null
    constructor(){
        this.db = MongoHelper.getCollection('solicitantes')        
    }
    async load_solicitante_by_id(params: LoadSolicitanteById.Params): Promise<LoadSolicitanteById.Result> {
        try {
            const query = new QueryBuilder()
            .match({
                _id: params.id_solicitante
            })
            .sort({
                _id: -1
            })
            .group({
                _id:null,
                data:{
                    '$first':'$$ROOT'  
                }
            })
            .project({
                _id:0,
                grado: '$data.grado',
                nombres_completos: '$data.nombres_completos',
                unidad: '$data.unidad',
                zona: '$data.zona',
            })
            .build()
            const docs_ = await this.db.aggregate<LoadSolicitanteById.Result>(query).toArray()
            return docs_.length > 0 && docs_[0]
        } catch (error) {
            return null
        }
    }
}