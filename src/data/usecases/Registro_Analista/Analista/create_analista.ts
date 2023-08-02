import {CreateAnalista} from '@/domain/usecases'
import {CreateAnalista as createAnalista,CreateUnidad,SearchUnidad,CreateZona, SearchZona, UpdateZona} from '@/data/protocols'
import {SearchDireccion,CreateDireccion,UpdateUnidad} from '@/data/protocols'


/**
 * 1. Verificar si Existe el Analista 
 * 2. En caso de que no exista el Analista Crear / Caso Contrario tomar el id y agregarle a la Unidad.
 * 3. Una vez Creado el Analista tomar el id y paserle al Unidad.
 * - - - - - - 
 * 1.Verificar si Existe la Unidad 
 * 2.En caso de que no exista la Unidad Crear / Caso Contrario tomar el id y agregarle al Analista.
 * 3. Una vez Creada la unidad tomar el id y paserle al Analista.
 * - - - - - - 
 * 1. Verificar Si Existe la Direccion 
 * 2. En caso de que no Existe  Direccion Crear / Caso Contrario tomar el id y agregarle ala Unidad.
 * 3. Una vez Creada la Direccion tomar el id y pasarle a la  Unidad. 
 * - - - - - -
 * 1. Verificar Si Existe La Zona
 * 2. En caso de que no Exista la Zona Crear / Caso Contrario tomar el id y Agregarle a la Unidad.
 * 3. Una vez Creada la Zona tomar el Id y pasarle ala Unidad.
*/


export class DbCreateAnalista implements CreateAnalista {
    constructor(
        private readonly create_analista_: createAnalista,
        private readonly search_direccion_: SearchDireccion,
        private readonly create_direccion_: CreateDireccion,
        private readonly create_unidad_: CreateUnidad,
        private readonly search_unidad_: SearchUnidad,
        private readonly create_zona_: CreateZona,
        private readonly search_zona_:SearchZona,
    ){}

    async create_analista(data: CreateAnalista.Params): Promise<CreateAnalista.Result> {
        try {
            let created_direccion: CreateDireccion.Result
            let unidad_: SearchUnidad.Result
            let zona_:SearchZona.Result     
            //Unidad
            const nombre_unidad = data.Unidad.nombre_unidad

            unidad_ = await this.search_unidad_.search_unidad({nombre_unidad})
            
            if(!unidad_.id){
                unidad_ = await this.create_unidad_.create_unidad({...data.Unidad})
            }

            //Direccion 
            created_direccion = await this.search_direccion_.search_direccion({nombre_direccion:data.Direcciones.nombre_direccion})
            if(!created_direccion.id){
                created_direccion = await this.create_direccion_.create_direccion({...data.Direcciones,id_unidades:[unidad_.id]})
            }

            // Zona
            zona_ = await this.search_zona_.search_zona({numero_zona:data.Zona.numero_zona})
            if(!zona_){
                zona_ = await this.create_zona_.create_zona({numero_zona:data.Zona.numero_zona,id_unidad:unidad_.id})
            }
            // await this.update_unidad.update_unidad()
            await this.create_analista_.create_analista({...data.Analista,ID_UNIDAD:unidad_.id,ID_ZONA:zona_.id})
            return {
                create:true,
                Direccion:created_direccion,
                Zona:zona_
            }
            
        } catch (error) {
            console.log(error)
        }
    }
}