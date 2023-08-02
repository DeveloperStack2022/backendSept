import {ObjectId} from 'mongodb'
import {MongoHelper,QueryBuilder} from '@/infra/db'
import { CreateUnidad, SearchUnidad,UpdateUnidad } from "@/data/protocols";



export class UnidadMongodbRepository implements CreateUnidad,SearchUnidad,UpdateUnidad {
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
        
        // await UnidadCollection.findOneAndUpdate({_id: new ObjectId(data.id)},{
        //     // $set:{
        //     //     'id_direccion':data.id_direccion,
        //     // },
        // })
        await UnidadCollection.updateOne({ _id: new ObjectId(data.id)},{
            $push:{'id_zonas':data.id_zonas},
            $set:{
                'id_direccion':data.id_direccion
            }
        })
    }

}