import { SolicitudModel } from '@/domain/models'

/**
 * Account Id => Auth token -> id 
 * limit -> numero de documentos al extraer [total index]
 * skip -> desde [index] donde empiezo a extraer
 * */ 


export interface LoadSolicitudesRepository {
  loadAll: (accountId: string,skip:number,limit:number) => Promise<LoadSolicitudesRepository.Result>
}

export namespace LoadSolicitudesRepository {
  export type Result = SolicitudModel[]
}
