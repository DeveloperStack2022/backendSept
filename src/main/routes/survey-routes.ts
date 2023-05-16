import { adaptRoute } from '@/main/adapters'
import { makeAddSurveyController, makeLoadSurveysController } from '@/main/factories'
import { auth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/surveys',auth,adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
