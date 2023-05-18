import { LoadSolicitudes } from '@/domain/usecases'
import { LoadSolicitudesRepository } from '@/data/protocols'

export class DbLoadSolicitudes implements LoadSolicitudes {
  constructor (private readonly loadSolicitudesRepository: LoadSolicitudesRepository) {}

  async load (accountId: string,limit:number,skip:number): Promise<LoadSolicitudes.Result> {
    return this.loadSolicitudesRepository.loadAll(accountId,limit,skip)
  }
}
