import {MongoHelper,QueryBuilder} from '@/infra/db'
import {ObjectId,Collection} from 'mongodb'
import {CreateDatosGenerales,UpdateDatosGenerales,GetReporteApoyoTecnico} from '@/data/protocols'


export class DatosGeneralesMongoRepository implements CreateDatosGenerales,UpdateDatosGenerales,GetReporteApoyoTecnico {
    
    private db:Collection = null

    constructor(){
        this.db = MongoHelper.getCollection('ApoyoTecnico_DatosGenerales')
    }

    async create_datos_generales(params: CreateDatosGenerales.Params): Promise<CreateDatosGenerales.Result> {
        const id = (await this.db.insertOne({...params})).insertedId
        return id.toHexString()
    }
    async update_datos_generales(params: UpdateDatosGenerales.Params): Promise<boolean> {
        try {
            await this.db.updateOne({_id: new ObjectId(params.datosGenerales)},{
                '$set':{
                    'id_armas': params.armas.map(item => new ObjectId(item)),
                    'id_detenidos': params.detenidos.map(item => new ObjectId(item)),
                    'id_vehiculos':params.vehiculo.map(item => new ObjectId(item)),
                    'id_resumen_caso':new ObjectId(params.resumenCaso),
                }      
            })
            return true
        } catch (error) {
            return false
        }
    }

    async get_reporte_Apoyo_Tecnico(): Promise<GetReporteApoyoTecnico.Result> {
        try {
            const query = new QueryBuilder()
            .project({
                nombre_caso:1,
                unidad_ejecotoria:1,
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
}