import { CreateRegistroPrae } from "@/domain/usecases";
import {PraeMongoRepository} from '@/infra/db'
import {DbCreateRegistroPrae} from '@/data/usecases'

export const makeDbRegistroPrae = ():CreateRegistroPrae => {
    const repositoryPrae = new PraeMongoRepository();
    return new DbCreateRegistroPrae(repositoryPrae)
}