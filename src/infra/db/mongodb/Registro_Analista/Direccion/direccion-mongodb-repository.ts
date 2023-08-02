import { CreateDireccion, SearchDireccion,UpdateDireccion } from "@/data/protocols";
import {MongoHelper,QueryBuilder} from '@/infra/db'
import {ObjectId} from 'mongodb'

export class DireccionMongodbRepository implements CreateDireccion,SearchDireccion,UpdateDireccion {

    // Direccion 
    async create_direccion(data: CreateDireccion.Params): Promise<CreateDireccion.Result> {
        const DireccionesCollection = MongoHelper.getCollection('Direcciones')
        const direccion_created = await DireccionesCollection.insertOne({nombre_direccion:data.nombre_direccion,IDS_UNIDADES:data.id_unidades})
        return {
            ...data,
            id_unidades:data.id_unidades,
            id:direccion_created.insertedId.toHexString()
        }
    }
    async search_direccion(nombre_direccion: SearchDireccion.Params): Promise<SearchDireccion.Result> {
        const DireccionesCollection = MongoHelper.getCollection('Direcciones')
        // const direccion = await DireccionesCollection.findOne({nombre_direccion})
        const query = new QueryBuilder()
        .match({
            nombre_direccion: nombre_direccion.nombre_direccion
        })
        .build()
        const direccion = await DireccionesCollection.aggregate(query).toArray()
        
        return direccion.length ? {
            id_unidades: direccion[0].id_unidades,
            nombre_direccion: direccion[0].nombre_direccion,
            id: direccion[0]._id.toHexString()
        } : null
    }

    async update_direccion(data: UpdateDireccion.Params): Promise<void> {
        const DireccionesCollection = MongoHelper.getCollection('Direcciones')
        await DireccionesCollection.updateOne({_id: new ObjectId(data.id)},{$push:{'IDS_UNIDADES':data.id_unidad}})
    }
}