import { CreateDireccion, SearchDireccion } from "@/data/protocols";
import {MongoHelper,QueryBuilder} from '@/infra/db'

export class DireccionMongodbRepository implements CreateDireccion,SearchDireccion {
    // Direccion 
    async create_direccion(data: CreateDireccion.Params): Promise<boolean> {
        const DireccionesCollection = MongoHelper.getCollection('Direcciones')
        await DireccionesCollection.insertOne({nombre_direccion:data.Direccion.nombre_direccion,IDS_UNIDADES:[data.Direccion.id_unidades]})
        return true
    }
    async search_direccion(nombre_direccion: SearchDireccion.Params): Promise<boolean> {
        const DireccionesCollection = MongoHelper.getCollection('Direcciones')
        const query = new QueryBuilder()
        .match({
            nombre_direccion: nombre_direccion.nombre_direccion
        })
        .build()
        const direccion = await DireccionesCollection.aggregate(query).toArray()
        return direccion.length ? true : false
    }
}