import {ObjectId} from 'mongodb'
import {MongoHelper,QueryBuilder} from '@/infra/db'
import { CreateUnidad, GetUnidadWithZonas, SearchUnidad,UpdateUnidad} from "@/data/protocols";



export class UnidadMongodbRepository implements CreateUnidad,SearchUnidad,UpdateUnidad,GetUnidadWithZonas {

    async get_unidad_with_zonas(id_unidad: string): Promise<GetUnidadWithZonas.Result> {
        
        const UnidadCollection = MongoHelper.getCollection('Unidades')
        const query = new QueryBuilder()
        .match({
            _id: new ObjectId(id_unidad)
        })
        .unwind({
            path:'$id_zonas'
        })
        .lookup({
            from:'Zonas',
            localField:'id_zonas',
            foreignField:"_id",
            as:"Zona"
        })
        .unwind({
            path:'$Zona'
        })
        .group({
            _id: '$_id',
            unidad:{'$first':'$nombre_unidad'},
            zonas:{'$addToSet':'$Zona.nombre_zona'}
        })
        .build()

        let unidad = await UnidadCollection.aggregate(query).toArray()
        unidad = MongoHelper.mapCollection(unidad)
        return unidad.length && {
            id: unidad[0].id,
            zonas: [...unidad[0].zonas]
        } 
    }


    // Unidad 
    async create_unidad(data: CreateUnidad.Params): Promise<CreateUnidad.Result> {
        const UnidadCollection = MongoHelper.getCollection('Unidades')
        const unida_created_ = await UnidadCollection.insertOne({...data})
        return {
            ...data,
            id:unida_created_.insertedId.toHexString()
        }
    }
    
    async search_unidad(nombre_unidad: SearchUnidad.Params): Promise<SearchUnidad.Result> {
        const SearchUnidad = MongoHelper.getCollection('Unidades')
        const unidad = await SearchUnidad.findOne({nombre_unidad:nombre_unidad.nombre_unidad})
        return unidad && MongoHelper.map(unidad)
    }

    
    async update_unidad(data: UpdateUnidad.Params): Promise<void> {
        const UnidadCollection = MongoHelper.getCollection('Unidades')
        await UnidadCollection.updateOne({ _id: new ObjectId(data.id)},{
            $push:{'id_zonas':data.id_zonas},
            $set:{
                'id_direccion':data.id_direccion
            }
        })
    }

}