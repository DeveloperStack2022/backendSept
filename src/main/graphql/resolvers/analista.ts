import { adaptResolver } from '@/main/adapters'
import {makeGetAnalistaByNumeroCedulaControllerFactory,makeGetAnalistaByGradoControllerFactory,makeGetAnalistaByUnidadControllerFactory } from '@/main/factories'

export default {
  Query: {
    getAnalistaByNumCl: async (parent: any, args: any, context: any) => adaptResolver(makeGetAnalistaByNumeroCedulaControllerFactory(), args, context),
    // GetAnalista By Grado
    getAnalistaByGrado: async (parent:any,args:any,context:any) => adaptResolver(makeGetAnalistaByGradoControllerFactory(),args,context),
    // NODE -> Get Analista By Unidad
    getAnalistaByUnidad: async (parent:any,args:any,context:any) => adaptResolver(makeGetAnalistaByUnidadControllerFactory(),args,context)
    // NODE -> Get Analista By Direccion 
    // getAnalistaByDireccion: async(parent:any,args:any,context:any) => adaptResolver()
  },

  Mutation: {
    // saveSurveyResult: async (parent: any, args: any, context: any) => adaptResolver(makeSaveSurveyResultController(), args, context)
  }
}
