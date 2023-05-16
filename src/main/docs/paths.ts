import {
  loginPath,
  surveyPath,
  signUpPath,
  surveyResultPath,
  solicitudPath
} from './paths/'

export default {
  '/login': loginPath,
  '/signup': signUpPath,
  '/surveys': surveyPath,
  '/surveys/{surveyId}/results': surveyResultPath,
  '/solicitud': solicitudPath
}
