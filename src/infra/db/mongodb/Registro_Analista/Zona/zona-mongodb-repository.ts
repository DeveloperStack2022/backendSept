import {MongoHelper,QueryBuilder} from '@/infra/db'
import { CreateZona, SearchZona,AddUnidadToZone } from "@/data/protocols";
import {ObjectId} from 'mongodb'

export class ZonaMongodbRepository implements CreateZona,SearchZona,AddUnidadToZone {
    // Zona
    async search_zona(nombre_zona: SearchZona.Params): Promise<SearchZona.Result> {
        const ZonaCollection = MongoHelper.getCollection('Zonas')
        const query = new QueryBuilder()
        .match({
            nombre_zona:nombre_zona.numero_zona
        })
        .build()
        const  zona = await ZonaCollection.aggregate(query).toArray()
        return zona.length ? {
            id:zona[0]._id.toHexString(),
            ids_unidades:zona[0].IDS_UNIDADES,
            numero_zona:zona[0].numero_zona,
        } : null
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

    async add_unidad_to_zone(id_zona: string, id_unidad: string): Promise<void> {
        const ZonaCollection = MongoHelper.getCollection('Zonas')
        await ZonaCollection.updateOne({_id: new ObjectId(id_zona)},{
            $push:{
                IDS_UNIDADES:id_unidad
            }
        })
    }
}