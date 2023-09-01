import { makeAddRegistroApoyoTecnico,makeGetReportesApoyoTecnico,makeGetReporteApoyoTecnicoById,makeGetResultsByRangeDate_ } from '@/main/factories'
import { adaptRoute } from '@/main/adapters'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/registroApoyoTecnico', adaptRoute(makeAddRegistroApoyoTecnico()))
  router.get('/getApoyoTecnico',adaptRoute(makeGetReportesApoyoTecnico()))
  router.get('/getApoyoTecnicoId/:id',adaptRoute(makeGetReporteApoyoTecnicoById()))
  router.get('/getResultByRangeDate',adaptRoute(makeGetResultsByRangeDate_()))
}
