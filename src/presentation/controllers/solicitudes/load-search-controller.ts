import {Controller,HttpResponse} from '@/presentation/protocols'
import {noContent,ok,serverError} from '@/presentation/helpers'
import {LoadSearch} from '@/domain/usecases'

export class LoadSearchController implements Controller { 
    constructor(
        private readonly loadSearch: LoadSearch
    ){}

    async handle(request: LoadSearchController.Request): Promise<HttpResponse> {
        try {
            const {text_search,type_search} = request
            const solicitud = await this.loadSearch.load_search({text_search,type_search})
            return solicitud ? ok(solicitud) : noContent()
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace LoadSearchController {
    type Search = "CASO" | "GDO" | "NUMCELULAR"
    export type Request = {
        text_search:string;
        type_search:Search;
    }
}