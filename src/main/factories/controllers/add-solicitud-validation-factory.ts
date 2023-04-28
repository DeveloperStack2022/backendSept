import {ValidationComposite,RequiredFieldValidation} from '@/validation/validators'
import {Validation} from '@/presentation/protocols'

export const makeAddSolicitudValidation = ():ValidationComposite => {
    const validations:Validation[] = [] 
    for (const field of ['hora','plataforma','caso']){
        validations.push(new RequiredFieldValidation(field))
    }
    return new ValidationComposite(validations)
}