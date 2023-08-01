import {CreateAnalista} from '@/domain/usecases'
import {CreateAnalista as createAnalista,CreateUnidad,SearchUnidad,CreateZona, SearchZona, SearchAnalista} from '@/data/protocols'
import {SearchDireccion,CreateDireccion} from '@/data/protocols'


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
        private readonly search_analista_: SearchAnalista,
        private readonly search_direccion_: SearchDireccion,
        private readonly create_direccion_: CreateDireccion,
        private readonly create_unidad_: CreateUnidad,
        private readonly search_unidad_: SearchUnidad,
        private readonly create_zona_: CreateZona,
        private readonly search_zona_:SearchZona,
    ){}

    async create_analista(data: CreateAnalista.Params): Promise<CreateAnalista.Result> {
        try {
            
            const numero_cedula_analista = data.Analista.numero_cedula
            const existe_analista = await this.search_analista_.search_analista(numero_cedula_analista)
            if(!existe_analista){
                // Creamos el Analista 
                const created_analista = await this.create_analista_.create_analista({Analista:data.Analista})
            }
            //Direccion 
            const existe_direccion = await this.search_direccion_.search_direccion({nombre_direccion:data.Direcciones.nombre_direccion})
            if(!existe_direccion){
                const created_direccion = await this.create_direccion_.create_direccion({Direccion:data.Direcciones})
            }
            //Unidad
            const nombre_unidad = data.Unidad.nombre_unidad
            const exist_unidad = await this.search_unidad_.search_unidad({nombre_unidad})
            
            if(!exist_unidad){
                const created_unidad = await this.create_unidad_.create_unidad({Unidad:data.Unidad})
            }
            
            // Zona
            const numero_zona = data.Zona.numero_zona
            const existe_zona = await this.search_zona_.search_zona({numero_zona})
            if(!existe_zona){
                const created_zona = await this.create_zona_.create_zona({numero_zona:data.Zona.numero_zona,id_unidad:'123456'})
            }
            
            return await this.create_analista_.create_analista(data)
        } catch (error) {
            
        }
    }
}