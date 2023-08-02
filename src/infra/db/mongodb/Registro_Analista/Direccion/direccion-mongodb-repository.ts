import { CreateDireccion, SearchDireccion } from "@/data/protocols";
import {MongoHelper,QueryBuilder} from '@/infra/db'

export class DireccionMongodbRepository implements CreateDireccion,SearchDireccion {

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
        const query = new QueryBuilder()
        .match({
            nombre_direccion: nombre_direccion.nombre_direccion
        })
        .build()
        const direccion = await DireccionesCollection.aggregate<SearchDireccion.Result>(query).toArray()
        return direccion.length ? direccion[0] : null
    }
}