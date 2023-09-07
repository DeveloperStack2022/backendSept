import { Municion } from "@/domain/models"

export interface CreateMuniciones { 
    create_municiones(params:CreateMuniciones.Params):Promise<CreateMuniciones.Result> 
}

export namespace CreateMuniciones {
    export type Params = Municion[]
    export type Result = string[]
}