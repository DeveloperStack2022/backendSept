import {Terminal,RadioBase} from '@/domain/models'

export interface CreateRegistroEcuRepository {
    create_registro(params:CreateRegistroEcuRepository.Parmas):Promise<CreateRegistroEcuRepository.Result>
}

export namespace CreateRegistroEcuRepository {
    export type Parmas = {
        terminal:Terminal,
        radios_base?:RadioBase;
    } 
    export type Result = string;
}