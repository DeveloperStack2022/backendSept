import { SolicitudModel } from '@/domain/models'

export interface LoadSolicitudes {
  load: (accountId: string,skip:number,limit:number) => Promise<LoadSolicitudes.Result>
}

export namespace LoadSolicitudes {
  export type Result = SolicitudModel[]
}
