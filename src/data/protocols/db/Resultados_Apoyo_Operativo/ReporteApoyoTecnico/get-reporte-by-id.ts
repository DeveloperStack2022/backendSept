import {DataShowImage} from '@/domain/models'
export interface GetReporteApoyoTecnicoById{
    get_reporte_apoyo_tecnico_by_id(id:GetReporteApoyoTecnicoById.Params):Promise<GetReporteApoyoTecnicoById.Result>
}

export namespace GetReporteApoyoTecnicoById {
    export type Params = string;
    export type Result = DataShowImage
}