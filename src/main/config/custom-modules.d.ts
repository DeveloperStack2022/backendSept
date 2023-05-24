import multer from 'multer'

declare module Express {
  interface Request {
    accountId?: string
  }
}
