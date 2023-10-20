import {Terminal,RadioBase} from '@/domain/models'

export interface CreateRegistroEcu {
    create_registro(params: CreateRegistroEcu.Params):Promise<CreateRegistroEcu.Result>
}

export namespace CreateRegistroEcu {
    export type Params = {
        terminal:Terminal,
        radioBase?:RadioBase;
    }
    export type Result = string;

}