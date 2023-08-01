import {MongoHelper,QueryBuilder} from '@/infra/db'
import { CreateZona, SearchZona } from "@/data/protocols";

export class ZonaMongodbRepository implements CreateZona,SearchZona {
    // Zona
    async search_zona(nombre_zona: SearchZona.Params): Promise<boolean> {
        const ZonaCollection = MongoHelper.getCollection('Zona')
        const query = new QueryBuilder()
        .match({
            nombre_zona:nombre_zona
        })
        .build()
        const  zona = await ZonaCollection.aggregate(query).toArray()
        return zona.length ? true : false
    }
    async create_zona(data: CreateZona.Params): Promise<boolean> {
        const ZonaCollection = MongoHelper.getCollection('Zona')
        await ZonaCollection.insertOne({nombre_zona:data.numero_zona,IDS_UNIDADES:[data.id_unidad]})
        return true
    }
}