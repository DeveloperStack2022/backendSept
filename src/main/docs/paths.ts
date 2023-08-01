import {
  loginPath,
  surveyPath,
  signUpPath,
  surveyResultPath,
  solicitudPath,
  SolicitudByPath
} from './paths/'

export default {
  '/login': loginPath,
  '/signup': signUpPath,
  '/surveys': surveyPath,
  '/surveys/{surveyId}/results': surveyResultPath,
  '/solicitud': solicitudPath,
  '/solicitudBy':SolicitudByPath.get
}
