import { LoadSolicitudesForDate } from "@/domain/usecases";
import {LoadAllSolictudesForDate} from '@/data/protocols'

export class DbLoadSolicitudesForDate implements LoadSolicitudesForDate {

    // Dependency Injection 
    constructor(
        private readonly LoadSolicitudesRepository: LoadAllSolictudesForDate
    ){}

    async load_solicitudes_for_date(data: LoadSolicitudesForDate.Params): Promise<unknown[]> {
        return await this.LoadSolicitudesRepository.load_solicitudes_for_date(data.start_date,data.end_date)
    }
}