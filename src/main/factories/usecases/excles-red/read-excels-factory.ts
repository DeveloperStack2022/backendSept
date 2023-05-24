import {XslxAdapter} from '@/infra/xlsx'
import {ExcelI} from '@/domain/usecases'
import {DbExcelSave} from '@/data/usecases'

export const makeDbExcles = (): ExcelI => {
    const excelAdapter = new XslxAdapter()
    return new DbExcelSave(excelAdapter,excelAdapter,excelAdapter)
}