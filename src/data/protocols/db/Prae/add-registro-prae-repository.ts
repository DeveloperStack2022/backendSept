import {CreateRegistroPrae} from '@/domain/usecases'
export interface AddRegistroPraeRepository {
    add(data: AddRegistroPraeRepository.Params):Promise<AddRegistroPraeRepository.Result>
}
export namespace AddRegistroPraeRepository {
    export type Params = CreateRegistroPrae.Params
    export type Result = CreateRegistroPrae.Result
}