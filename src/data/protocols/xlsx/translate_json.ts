import {WorkSheet} from 'xlsx'

export interface TranslateToJson {
    sheet_to_json(workSheet:WorkSheet):unknown[]
}