import {MongoHelper,QueryBuilder} from '@/infra/db'
import {ObjectId} from 'mongodb'
import {GetAnalista,CreateAnalista,SearchAnalista,GetAnalistaByNumCl,Get_analista_by_id} from '@/data/protocols'
import {GetAnalistaByIdUnidad} from '@/data/protocols'


export class AnalistaMongoDbRepository implements GetAnalista,CreateAnalista,SearchAnalista,GetAnalistaByNumCl,Get_analista_by_id,GetAnalistaByIdUnidad {

    async get_analista_by_id_unidad(id_unidad: GetAnalistaByIdUnidad.Params): Promise<GetAnalistaByIdUnidad.Result> {
        const AnalistaCollection = MongoHelper.getCollection('Analistas')
        const analistas = await AnalistaCollection.find({
            ID_UNIDAD: new ObjectId(id_unidad)
        },
        {
            'projection':{
                ID_UNIDAD:0,
                ID_ZONA:0
        }}).toArray()
        return analistas.length ? MongoHelper.mapCollection(analistas) : null
        
    }

    async get_analista_by_id(id: Get_analista_by_id.Params): Promise<Get_analista_by_id.Result> {
        const AnalistaCollection = MongoHelper.getCollection('Analistas')
        const analista = await AnalistaCollection.findOne({_id: new ObjectId(id)})
        return analista && MongoHelper.map(analista)
    }

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

        const created = await AnalistaCollection.insertOne({
            cedula:data.numero_cedula,nombres:data.nombres_completos,
            grado:data.grado,ID_UNIDAD:new ObjectId(data.ID_UNIDAD),
            ID_ZONA:new ObjectId(data.ID_ZONA)
        })

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
        try {
            const AnalistaCollection = MongoHelper.getCollection('Analistas')
            // const analista = await AnalistaCollection.findOne({'cedula':numero_cedula})
            const query = new QueryBuilder()
            .match({
                'cedula':numero_cedula
            })
            .lookup({
                from: 'Unidades',
                foreignField:'_id',
                localField:'ID_UNIDAD',
                pipeline:[{
                    '$project':{
                        'id_zonas':0
                    }
                }],
                as:'unidad',
            })
            .unwind({
                path:'$unidad'
            })
            .lookup({
                from:'Direcciones',
                // Variable en Mongodb
                let:{
                    'unidadName':{
                        '$toString':{"$toString":"$unidad._id"}
                    }
                },
                pipeline:[{
                    '$match':{
                        '$expr':{
                            "$in":[
                                "$$unidadName","$IDS_UNIDADES"
                            ]
                        }
                    }
                },
                {
                    "$project": {
                        IDS_UNIDADES: 0,
                        _id: 0
                    }
                }],
                
                as:'direccion'
            })
            .unwind({
                path: '$direccion'
            })
            .lookup({
                from:'Zonas',
                foreignField:'_id',
                localField:'ID_ZONA',
                as:'zona'
            })
            .unwind({
                path:'$zona'
            })
            .build()
            let analista = await AnalistaCollection.aggregate<GetAnalistaByNumCl.Result>(query).toArray()
            analista = MongoHelper.mapCollection(analista)
            return analista.length ? analista[0] : null
        } catch (error) {
            console.log(error)    
        }
        // return analista && MongoHelper.map(analista)
    }
    
}