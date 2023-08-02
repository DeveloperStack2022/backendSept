import { UpdateDireccion } from "@/domain/usecases";
import {UpdateDireccion as updateDireccion} from '@/data/protocols'

export class DbUpdateDireccion implements UpdateDireccion {
    constructor(
        private readonly update_direccion_:updateDireccion
    ){}

    async update_direccion(data: UpdateDireccion.Params): Promise<void> {
        try {
            await this.update_direccion_.update_direccion({id_unidad:data.id_unidad,id:data.id})
        } catch (error) {
            console.log(error)
        }
    }
}