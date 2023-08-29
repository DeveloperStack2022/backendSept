import {GetReporteApoyoTecnico} from '@/domain/usecases'
import {GetReporteApoyoTecnico as getReporteApoyoTecnico} from '@/data/protocols'
export class DbGetReporteApoyoTecnico implements GetReporteApoyoTecnico {
    constructor(
        private readonly getReporteApoyoTecnico: getReporteApoyoTecnico
    ){}

    async get_reporte_apoyo_tecnico(): Promise<GetReporteApoyoTecnico.Result> {
        return await this.getReporteApoyoTecnico.get_reporte_Apoyo_Tecnico()
    }
}