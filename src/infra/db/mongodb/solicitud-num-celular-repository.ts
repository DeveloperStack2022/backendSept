import {MongoHelper,QueryBuilder} from '@/infra/db'
import {LoadNumCelularRepositoryI,LoadSolicitudByNumeroCelularRepository} from '@/data/protocols'


export class NumeroCelularMongoRepository implements LoadNumCelularRepositoryI,LoadSolicitudByNumeroCelularRepository {

    async load_num_celular(numero_celular: string): Promise<LoadNumCelularRepositoryI.Result> {
        const numeroCelularCollection = MongoHelper.getCollection('celulares')
        const query = new QueryBuilder()
            .match({
                numero_celular:numero_celular
            })
            .build()
        const docs_ = await numeroCelularCollection.aggregate(query).toArray()
        return MongoHelper.mapCollection(docs_)
    }

    async load_solicitud_numero_celular(params: LoadSolicitudByNumeroCelularRepository.Params): Promise<LoadSolicitudByNumeroCelularRepository.Result> {
        const numeroCelularCollection = MongoHelper.getCollection('celulares')
       
        
        const query = new QueryBuilder()
        .match({
            numero_celular:params.numero_celular
        })
        .sort({
            _id: -1
        })
        .group({
            _id:null, //Para no agrupar ningun campo en particular
            lastOrder:{'$first':'$$ROOT'}
        })
        .lookup({
            from:'solicitud',
            foreignField:'_id',
            localField:'lastOrder.id_solicitud',
            as:'solicitud'
        })
        .unwind({
            path:'$solicitud'
        })
        .build()
        const docs_ = await numeroCelularCollection.aggregate<LoadSolicitudByNumeroCelularRepository.Result>(query).toArray()
        const docs_array =  MongoHelper.mapCollection(docs_)
        
        return docs_array.length > 0 ? docs_array.length > 1 ? docs_array[docs_array.length - 1 ] : docs_array[0] : null 
    }
}   