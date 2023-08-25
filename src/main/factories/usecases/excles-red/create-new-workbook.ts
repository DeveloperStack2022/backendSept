import {XslxAdapter} from '@/infra/xlsx'
import {CreateNewWorkBook} from '@/domain/usecases'
import { GenerateWorkBook } from '@/data/usecases'

export const makeCreateNewWorkBook = (): CreateNewWorkBook => {
    const excelAdapter = new XslxAdapter()
    return new GenerateWorkBook(excelAdapter,excelAdapter,excelAdapter,excelAdapter)
}