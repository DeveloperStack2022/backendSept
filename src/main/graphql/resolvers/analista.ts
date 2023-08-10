import { adaptResolver } from '@/main/adapters'
import {makeGetAnalistaByNumeroCedulaControllerFactory } from '@/main/factories'

export default {
  Query: {
    getAnalistaByNumCl: async (parent: any, args: any, context: any) => adaptResolver(makeGetAnalistaByNumeroCedulaControllerFactory(), args, context)
  },

  Mutation: {
    // saveSurveyResult: async (parent: any, args: any, context: any) => adaptResolver(makeSaveSurveyResultController(), args, context)
  }
}


// {
//   "cedula": "1722039789",
//   "nombres": "Luis Zapata",
//   "grado": "SGOS",
//   "ID_UNIDAD": "64cac83f9c5e3aaed3267b6e",
//   "ID_ZONA": "64cac83f9c5e3aaed3267b6f",
//   "unidad": {
//     "_id": "64cac83f9c5e3aaed3267b6e",
//     "nombre_unidad": "UNCI",
//     "id_direccion": "64cab72961e2d695b3d0a74f"
//   },
//   "direccion": {
//     "nombre_direccion": "DGI"
//   },
//   "zona": {
//     "_id": "64cac83f9c5e3aaed3267b6f",
//     "nombre_zona": 9,
//     "IDS_UNIDADES": [
//       "64cac83f9c5e3aaed3267b6e",
//       "64cac83f9c5e3aaed3267b6e",
//       "64cac83f9c5e3aaed3267b6e"
//     ]
//   },
//   "id": "64d0fe066cced5beb95ca1df"
// }