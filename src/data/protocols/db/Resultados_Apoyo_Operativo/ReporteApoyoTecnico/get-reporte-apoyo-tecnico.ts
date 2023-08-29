import {DataShowTable} from '@/domain/models'
export interface GetReporteApoyoTecnico {
    get_reporte_Apoyo_Tecnico():Promise<GetReporteApoyoTecnico.Result>
}

export namespace GetReporteApoyoTecnico {
    export type Result = DataShowTable[]
}