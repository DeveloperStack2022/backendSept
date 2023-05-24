import {TranslateToJsonI,ViewData} from '@/domain/usecases'
export interface ExcelI extends  TranslateToJsonI,ViewData {
    read(ruta:string):any
}