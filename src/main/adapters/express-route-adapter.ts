import { Controller } from '@/presentation/protocols'

import { Request, Response } from 'express'

interface RequestAccountId extends Request {
  accountId?:string
}

export const adaptRoute = (controller: Controller) => {
  return async (req: RequestAccountId, res: Response) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
      ...(req.query || {}),
      imageAnexo: req.image_anexo,
      accountId: req.accountId
    }
    const httpResponse = await controller.handle(request)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
