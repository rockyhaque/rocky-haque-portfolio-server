import { NextFunction, Request, RequestHandler, Response } from 'express'


const catchAsync = (func: RequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(func(req, res, next)).catch((error) => next(error))
  }
}

export default catchAsync