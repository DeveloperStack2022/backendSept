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

    async get_reporte_Apoyo_Tecnico(params:GetReporteApoyoTecnico.Params ): Promise<GetReporteApoyoTecnico.Result> {
        try {
            const query_first = new QueryBuilder()
            .group({
                _id:null,
                totalDocuments:{$sum:1}
            })
            .build()
            // Execute Query First 
            const count_documents = await this.db.aggregate<{_id:null,totalDocuments:number}[]>(query_first).toArray()
            const objectTotalDocuments = MongoHelper.mapCollection(count_documents)
            
            const query = new QueryBuilder()
            .skip(params.skip)
            .limit(params.limit)
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
            return{
                DataShowTable:  MongoHelper.mapCollection(reporte),
                total_documents: objectTotalDocuments[0].totalDocuments
            }
        } catch (error) {
            console.log('Aqui esta el Error')
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
                    'tipo_operativo':'$tipo_operativo',
                    "ejecutor":'$unidad_ejecutoria',
                    'unidad_apoyo':'$unidades_apoyo',
                    'numero_reporte':'$numero_reporte',
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
                    'fecha':'$fecha',
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
                "tipo_operativo":'$_id.tipo_operativo',
                'nombre_caso':'$_id.nombre_caso',
                'ejecutor':'$_id.ejecutor',
                'unidades_apoyo':'$_id.unidad_apoyo',
                'numero_reporte':'$_id.numero_reporte',
                'direccion':'$_id.direccion',
                'latitud':"$_id.latitud",
                'longitud':'$_id.longitud',
                'delito':"$_id.delito",
                'contexto':'$_id.contexto',
                'name_image':'$_id.name_image',
                'fecha':'$_id.fecha',
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
        console.log({start_date:params.date_start,end_date:params.date_end })
        try {
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
        .lookup({
            from: 'ApoyoTecnico_Dinero',
            foreignField:'_id',
            localField:'id_dinero',
            as:'Dinero_ApoyoTecnico'
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
                'total_dinero':{
                    '$map':{
                        'input':'$Dinero_ApoyoTecnico',
                        'as':'dinero_int',
                        'in':{
                            '_id':'$$dinero_int._id',
                            'valor_total':{'$toInt':'$$dinero_int.valor_total'}
                        }
                    }
                },
                'sustancias_ilegales':'$SustanciasIlegales',
                // 'total_dinero':'$Dinero_ApoyoTecnico'
            }
        })
        .group({
            '_id':'$_id._id',
            'total_municiones':{'$first':{'$sum':'$_id.municiones_transform.cantidad'}},
            'total_sustancias_ilegales':{'$first':{'$sum':'$_id.sustancias_ilegales.peso_kg'}},
            'total_dinero':{'$first':{'$sum':'$_id.total_dinero.valor_total'}},
            'total_detenidos':{'$first':'$_id.id_detenidos'},
            'total_armas':{'$first':'$_id.id_armas'},
            'total_vehiculos':{'$first':'$_id.id_vehiculos'},
        })
        .project({
            '_id':'$_id',
            'total_municiones':{'$sum':'$total_municiones'},
            'total_sustancias_ilegales':{'$sum':'$total_sustancias_ilegales'},
            'total_dinero':{'$sum':'$total_dinero'},
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
            'total_vehiculos':{'$sum':'$total_vehiculos'},
            'total_dinero':{'$sum':'$total_dinero'}
        })
        .build()

        let totales = await this.db.aggregate<GetResultsByRangeDate.Result>(query).toArray()
        totales = MongoHelper.mapCollection(totales)
       
        return totales.length > 0 ? totales[0] : {
            total_armas:0,
            total_detenidos:0,
            total_dinero:0,
            total_sustancia_ilegales:0,
            total_municiones:0,
            total_vehiculos:0
        }
        
        } catch (error) {
            console.log('Aqui esta el error ')
            console.log(error)    
        }
    }   
}