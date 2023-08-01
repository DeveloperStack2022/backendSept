import {MongoHelper,QueryBuilder} from '@/infra/db'
import { CreateUnidad, SearchUnidad } from "@/data/protocols";

export class UnidadMongodbRepository implements CreateUnidad,SearchUnidad {
    // Unidad 
    async create_unidad(data: CreateUnidad.Params): Promise<boolean> {
        const UnidadCollection = MongoHelper.getCollection('Unidad')
        await UnidadCollection.insertOne({nombre_unidad:data.Unidad.nombre_unidad,ID_DIRECCION:data.Unidad.id_direccion,ID_ZONAS:[data.Unidad.id_zonas]})
        return true
    }
    
    async search_unidad(nombre_unidad: SearchUnidad.Params): Promise<boolean> {
        const SearchUnidad = MongoHelper.getCollection('Unidad')
        const query = new QueryBuilder()
        .match({
            nombre_unidad: nombre_unidad
        })
        .build()
        const unidad = await SearchUnidad.aggregate(query).toArray()
        return unidad.length ? true : false
    }
}