import {MongoHelper,QueryBuilder} from '@/infra/db'
import { CreateZona, SearchZona } from "@/data/protocols";

export class ZonaMongodbRepository implements CreateZona,SearchZona {
    // Zona
    async search_zona(nombre_zona: SearchZona.Params): Promise<SearchZona.Result> {
        const ZonaCollection = MongoHelper.getCollection('Zonas')
        const query = new QueryBuilder()
        .match({
            nombre_zona:nombre_zona
        })
        .build()
        const  zona = await ZonaCollection.aggregate<SearchZona.Result>(query).toArray()
        return zona.length ? zona[0] : null
    }
    async create_zona(data: CreateZona.Params): Promise<CreateZona.Result> {
        const ZonaCollection = MongoHelper.getCollection('Zonas')
        const unidad = await ZonaCollection.insertOne({nombre_zona:data.numero_zona,IDS_UNIDADES:[data.id_unidad]})
        return {
            ...data,
            ids_unidades:[data.id_unidad],
            id:unidad.insertedId.toHexString()
        }
    }
}