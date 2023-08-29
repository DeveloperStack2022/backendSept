import {DataShowTable} from '@/domain/models'
export interface GetReporteApoyoTecnico {
    get_reporte_apoyo_tecnico():Promise<GetReporteApoyoTecnico.Result>
}

export namespace GetReporteApoyoTecnico {
    export type Result = DataShowTable[]
}