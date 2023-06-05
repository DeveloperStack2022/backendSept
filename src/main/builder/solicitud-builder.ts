import {Builder} from './builder'
import {Solicitud} from './solicitud'

export class SolicitudBuilder implements Builder {

    private solicitud:Solicitud

    constructor(){
        this.solicitud = new Solicitud()
    }

    getData(key: string):void {
        console.log(key)
    }

    public showData():Solicitud {
        return this.solicitud
    }
}