import { DbGetAnalistaByNumCl } from '@/data/usecases/Registro_Analista/Analista/get_analista_by_num_cl'
import {Analista} from '@/domain/models'


export interface GetAnalistaByNumCl {
    get_analista_by_num_cl(numero_cedula: GetAnalistaByNumCl.Params):Promise<GetAnalistaByNumCl.Result>
}

export namespace GetAnalistaByNumCl {
    export type Params = string;
    export type Result = Analista
}