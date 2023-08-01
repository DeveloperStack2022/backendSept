import {LoadSearch} from '@/domain/usecases'
import {LoadSearch as LoadSearchRepositoryProtocols} from '@/data/protocols'


export class DbLoadSearch implements LoadSearch {
    constructor(
        private readonly loadSearch: LoadSearchRepositoryProtocols
    ){}

    async load_search(text_search: LoadSearch.Params): Promise<LoadSearch.Result> {
        try {
            return await this.loadSearch.load_search(text_search.text_search)
        } catch (error) {
            return null
        }
    }
}