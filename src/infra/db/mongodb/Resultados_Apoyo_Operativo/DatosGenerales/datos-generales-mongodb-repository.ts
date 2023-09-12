import {MongoHelper,QueryBuilder} from '@/infra/db'
import {ObjectId,Collection} from 'mongodb'
import {CreateDatosGenerales,UpdateDatosGenerales,GetReporteApoyoTecnico,GetReporteApoyoTecnicoById,GetResultsByRangeDate} from '@/data/protocols'



export class DatosGeneralesMongoRepository implements CreateDatosGenerales,UpdateDatosGenerales,GetReporteApoyoTecnico,GetReporteApoyoTecnicoById,GetResultsByRangeDate {
    
    private db:Collection = null

    constructor(){
        this.db = MongoHelper.getCollection('ApoyoTecnico_DatosGenerales')
    }

    async create_datos_generales(params: CreateDatosGenerales.Params): Promise<CreateDatosGenerales.Result> {
        const id = (await this.db.insertOne({...params,fecha: new Date(params.fecha)})).insertedId
        return id.toHexString()
    }

    async update_datos_generales(params: UpdateDatosGenerales.Params): Promise<boolean> {
        try {
            await this.db.updateOne({_id: new ObjectId(params.datosGenerales)},{
                '$set':{
                    'id_armas': params.hasOwnProperty('armas') ? params.armas.map(item => new ObjectId(item)) : [],
                    'id_detenidos':params.hasOwnProperty('detenidos') ? params.detenidos.map(item => new ObjectId(item)): [],
                    'id_vehiculos': params.hasOwnProperty('vehiculo')  ? params.vehiculo.map(item => new ObjectId(item)) : [],
                    'id_resumen_caso':new ObjectId(params.resumenCaso),
                    'id_sustancias_ilegales': params.hasOwnProperty('sustancias_sujetas_fiscalizacion') ? params.sustancias_sujetas_fiscalizacion.map(item => new ObjectId(item)) : [],
                    'id_dinero': params.hasOwnProperty('dinero') ? params.dinero.map(item => new ObjectId(item)) : [],
                    'id_municiones':params.hasOwnProperty('municiones') ? params.municiones.map(item => new ObjectId(item)) : []
                }      
            })
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async get_reporte_Apoyo_Tecnico(): Promise<GetReporteApoyoTecnico.Result> {
        try {
            const query = new QueryBuilder()
            .project({
                nombre_caso:1,
                unidad_ejecotoria:1,
                fecha:1,
                n_detenidos:{
                    '$cond':{
                        if:{'$isArray':'$id_detenidos'},
                        then:{'$size':'$id_detenidos'},
                        else: "0"
                    }
                },
                unidad_ejecutoria:1
            })
            .build()
            const reporte = await this.db.aggregate<GetReporteApoyoTecnico.Result>(query).toArray()
            return MongoHelper.mapCollection(reporte)
        } catch (error) {
            console.log(error)
        }
    }

    async get_reporte_apoyo_tecnico_by_id(id: GetReporteApoyoTecnicoById.Params): Promise<GetReporteApoyoTecnicoById.Result> {
        try {
            const query = new QueryBuilder()
            .match({
                _id: new ObjectId(id)
            })
            .lookup({
                from:'ApoyoTecnico_ResumenCaso',
                foreignField:'_id',
                localField:'id_resumen_caso',
                as:'ResumenCaso'
            })
            .unwind({
                path: '$ResumenCaso'
            })
            .lookup({
                from:'ApoyoTecnico_SustanciasIlegales',
                foreignField: '_id',
                localField: 'id_sustancias_ilegales',
                as:'SustanciasIlegales'
            })
            .lookup({
                from:'ApoyoTecnico_Municiones',
                foreignField: '_id',
                localField: 'id_municiones',
                as:'Municiones'
            })
            .group({
                "_id":{
                    "_id":"$_id",
                    "ejecutor":'$unidad_ejecutoria',
                    'latitud':'$coordenadas.latitud',
                    'longitud':'$coordenadas.longitud',
                    'direccion':'$direccion',
                    'nombre_caso':'$nombre_caso',
                    'contexto':'$ResumenCaso.asunto',
                    'delito':'$ResumenCaso.tipo_de_delito',
                    'id_detendidos':'$id_detenidos',
                    'id_armas':'$id_armas',
                    'id_vehiculos':'$id_vehiculos',
                    'id_dinero':'$id_dinero',
                    'id_sustancias_ilegales':'$id_sustancias_ilegales',
                    'SustanciasIlegales':'$SustanciasIlegales',
                    'id_municiones':'$id_municiones',
                    "name_image":'$image_anexo',
                    "municiones": '$Municiones',
                    'municiones_transform':{
                        '$map':{
                            'input':'$Municiones',
                            'as':'municiones_int',
                            'in':{
                                '_id':'$$municiones_int._id',
                                'cantidad':{'$toInt':'$$municiones_int.cantidad'}
                            }
                        }
                    },
                }
            })
            .project({
                '_id':'$_id._id',
                'nombre_caso':'$_id.nombre_caso',
                'ejecutor':'$_id.ejecutor',
                'direccion':'$_id.direccion',
                'latitud':"$_id.latitud",
                'longitud':'$_id.longitud',
                'delito':"$_id.delito",
                'contexto':'$_id.contexto',
                'name_image':'$_id.name_image',
                "detenidos":{
                    '$cond':{
                        if:{'$isArray':'$_id.id_detendidos'},
                        then:{'$size':'$_id.id_detendidos'},
                        else: 0
                    }
                },
                'indicios': {
                    'armas':{
                        '$cond':{
                            if:{'$isArray':'$_id.id_armas'},
                            then:{'$size':'$_id.id_armas'},
                            else: 0
                        }
                    },
                    'vehiculos':{
                        '$cond':{
                            if:{'$isArray':'$_id.id_vehiculos'},
                            then:{'$size':'$_id.id_vehiculos'},
                            else: 0
                        }
                    },
                    'SustanciasIlegales':'$_id.SustanciasIlegales',
                    'Dinero':{
                        '$cond':{
                            if: {'$isArray':'$_id.id_dinero'},
                            then:{'$size':'$_id.id_dinero'},
                            else:0
                        }
                    },
                    'municiones':{
                        '$sum':'$_id.municiones_transform.cantidad'
                    },
                },
                  
            })
            .build()
            const reporte_by_id = await this.db.aggregate<GetReporteApoyoTecnicoById.Result>(query).toArray()
            const data = MongoHelper.mapCollection(reporte_by_id)
            return data.length > 0 ? data[0] : null
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async get_results_by_range_date(params: GetResultsByRangeDate.Params): Promise<GetResultsByRangeDate.Result> {

        const query = new QueryBuilder()
        .match({
            fecha:{
                '$gte':params.date_start,
                '$lt':params.date_end
            }
        })
        .lookup({
            from:'ApoyoTecnico_Municiones',
            foreignField: '_id',
            localField: 'id_municiones',
            as:'Municiones'
        })
        .lookup({
            from:'ApoyoTecnico_SustanciasIlegales',
            foreignField: '_id',
            localField: 'id_sustancias_ilegales',
            as:'SustanciasIlegales'
        })
        .group({
            _id:{
                '_id':'$_id',
                'id_detenidos':'$id_detenidos',
                'id_armas':'$id_armas',
                'id_vehiculos':'$id_vehiculos',
                'municiones_transform':{
                    '$map':{
                        'input':'$Municiones',
                        'as':'municiones_int',
                        'in':{
                            '_id':'$$municiones_int._id',
                            'cantidad':{'$toInt':'$$municiones_int.cantidad'}
                        }
                    }
                },
                'sustancias_ilegales':'$SustanciasIlegales'
            }
        })
        .group({
            '_id':'$_id._id',
            'total_municiones':{'$first':{'$sum':'$_id.municiones_transform.cantidad'}},
            'total_sustancias_ilegales':{'$first':{'$sum':'$_id.sustancias_ilegales.peso_kg'}},
            'total_detenidos':{'$first':'$_id.id_detenidos'},
            'total_armas':{'$first':'$_id.id_armas'},
            'total_vehiculos':{'$first':'$_id.id_vehiculos'},
        })
        .project({
            '_id':'$_id',
            'total_municiones':{'$sum':'$total_municiones'},
            'total_sustancias_ilegales':{'$sum':'$total_sustancias_ilegales'},
            "total_detenidos":{
                '$cond':{
                    if:{'$isArray':'$total_detenidos'},
                    then:{'$size':'$total_detenidos'},
                    else: 0
                }
            },
            "total_armas":{
                '$cond':{
                    if:{'$isArray':'$total_armas'},
                    then:{'$size':'$total_armas'},
                    else: 0
                }
            },
            "total_vehiculos":{
                '$cond':{
                    if:{'$isArray':'$total_vehiculos'},
                    then:{'$size':'$total_vehiculos'},
                    else: 0
                }
            },
        })
        .group({
            '_id':null,
            'total_municiones':{'$sum':'$total_municiones'},
            'total_sustancias_ilegales':{'$sum':'$total_sustancias_ilegales'},
            'total_detenidos':{'$sum':'$total_detenidos'},
            'total_armas':{'$sum':'$total_armas'},
            'total_vehiculos':{'$sum':'$total_vehiculos'}
        })
        .build()

        let totales = await this.db.aggregate<GetResultsByRangeDate.Result>(query).toArray()
        totales = MongoHelper.mapCollection(totales)
        console.log(totales)
        return totales.length > 0 ? totales[0] : null
        
    }   
}