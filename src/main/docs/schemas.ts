import {
  accountSchema,
  loginParamsSchema,
  errorSchema,
  surveyAnswerSchema,
  surveysSchema,
  surveySchema,
  signUpParamsSchema,
  addSurveyParamsSchema,
  saveSurveyParamsSchema,
  surveyResultSchema,
  surveyResultAnswerSchema,
  addSolicitudParamsSchema,
  solicitanteSchema,
  celularSchema,
  ubicacionSchema,
  solicitudSchema
} from './schemas/'

export default {
  account: accountSchema,
  loginParams: loginParamsSchema,
  signUpParams: signUpParamsSchema,
  addSurveyParams: addSurveyParamsSchema,
  error: errorSchema,
  surveys: surveysSchema,
  survey: surveySchema,
  surveyAnswer: surveyAnswerSchema,
  saveSurveyParams: saveSurveyParamsSchema,
  surveyResult: surveyResultSchema,
  surveyResultAnswer: surveyResultAnswerSchema,
  addSolicitudParamsSchema: addSolicitudParamsSchema,
  solicitante: solicitanteSchema,
  celular: celularSchema,
  ubicacion: ubicacionSchema,
  solicitud: solicitudSchema
}
