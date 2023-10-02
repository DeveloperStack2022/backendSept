import {DataShowTable} from '@/domain/models'
export interface GetReporteApoyoTecnico {
    get_reporte_apoyo_tecnico(params: GetReporteApoyoTecnico.Params):Promise<GetReporteApoyoTecnico.Result>
}

export namespace GetReporteApoyoTecnico {
    export type Params = {
        skip:number;
        limit:number;
    }
    export type Result = {
        DataShowTable:DataShowTable[]
        total_documents:number
    }
}