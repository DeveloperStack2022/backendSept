import {Celular} from '@/domain/models'

export interface LoadNumCelularRepositoryI {
    load_num_celular(numero_celular:string): Promise<LoadNumCelularRepositoryI.Result>
}

export namespace LoadNumCelularRepositoryI {
    export type Result = Celular[]
}