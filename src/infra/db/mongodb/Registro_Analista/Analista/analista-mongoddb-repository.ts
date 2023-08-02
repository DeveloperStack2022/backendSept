import {MongoHelper,QueryBuilder} from '@/infra/db'
import {ObjectId} from 'mongodb'
import {GetAnalista,CreateAnalista,SearchAnalista,GetAnalistaByNumCl} from '@/data/protocols'

export class AnalistaMongoDbRepository implements GetAnalista,CreateAnalista,SearchAnalista,GetAnalistaByNumCl {

    async get_analista(id_analista: GetAnalista.Params): Promise<GetAnalista.Result> {
        const AnlistaCollection = MongoHelper.getCollection('Analistas')

        const query = new QueryBuilder()
            .match({
                _id: new ObjectId(id_analista.id_analista)
            })
            .build()
        const analista = await AnlistaCollection.aggregate<GetAnalista.Result>(query).toArray()
        return analista.length ? analista[0] : null
    }

    async create_analista(data: CreateAnalista.Params): Promise<CreateAnalista.Resutl> {
        const AnalistaCollection = MongoHelper.getCollection('Analistas')

        const created = await AnalistaCollection.insertOne({cedula:data.numero_cedula,nombres:data.nombres_completos,grado:data.grado,ID_UNIDAD:data.ID_UNIDAD,ID_ZONA:data.ID_ZONA})

        return {
            create: created ? true : false
        }
    }

    async search_analista(numero_cedula: string): Promise<boolean> {
        const AnalistaCollection = MongoHelper.getCollection('Analistas')
        const query = new QueryBuilder()
        .match({
            numero_cedula:numero_cedula
        })
        .build()
        const analista = await AnalistaCollection.aggregate(query).toArray()
        return analista.length ? true : false
    }

    async get_analista_by_num_cl(numero_cedula: string): Promise<GetAnalistaByNumCl.Result> {
        const AnalistaCollection = MongoHelper.getCollection('Analistas')
        const query = new QueryBuilder()
        .match({
            cedula:numero_cedula
        })
        .build()
        const analista = await AnalistaCollection.aggregate<GetAnalistaByNumCl.Result>(query).toArray()
        return analista.length ? analista[0] : null
    }
    
}