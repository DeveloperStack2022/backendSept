import {SolicitudModelTestResult} from '@/domain/models'
export interface LoadSolicitudTestRepository { 
    load(accountId:string,skip:number,limit:number): Promise<LoadSolicitudTestRepository.Resut>
}

export namespace LoadSolicitudTestRepository {
    export type Resut = SolicitudModelTestResult
}