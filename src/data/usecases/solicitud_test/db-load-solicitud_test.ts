import {LoadSolicitudResultTest} from '@/domain/usecases'
import {LoadSolicitudTestRepository} from '@/data/protocols'
import { SolicitudModelTestResult } from '@/domain/models'

export class DBLoadSolicitudesTest implements LoadSolicitudResultTest {

    constructor(
        private readonly loadSolicitudesTestRepository: LoadSolicitudTestRepository
    ){}

    load(accountId: string, skip: number, limit: number): Promise<SolicitudModelTestResult> {
        return this.loadSolicitudesTestRepository.load(accountId,skip,limit)
    }
}
