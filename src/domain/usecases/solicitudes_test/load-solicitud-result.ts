import {SolicitudModelTestResult} from '@/domain/models'

export interface LoadSolicitudResultTest {
    load(accountId:string,skip:number,limit:number): Promise<SolicitudModelTestResult>
}