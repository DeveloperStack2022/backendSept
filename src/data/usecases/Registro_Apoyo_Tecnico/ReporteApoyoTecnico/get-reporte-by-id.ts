import {GetReporteApoyoTecnicoById} from '@/domain/usecases'
import {GetReporteApoyoTecnicoById as getReporteApoyoTecnicoById} from '@/data/protocols'

export class DbGetReporteApoyoTecnicoById implements GetReporteApoyoTecnicoById {
    constructor(
        private readonly _getReporteApoyoTecnicoById: getReporteApoyoTecnicoById
    ){}

    async get_reporte_apoyo_tecnico_byId(id: getReporteApoyoTecnicoById.Params): Promise<getReporteApoyoTecnicoById.Result> {
        return await this._getReporteApoyoTecnicoById.get_reporte_apoyo_tecnico_by_id(id)
    }
}
