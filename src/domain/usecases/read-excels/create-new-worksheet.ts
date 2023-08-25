import {WorkSheet} from 'xlsx'
export interface CreateNewWorkSheet {
    create_new_worksheet(data:unknown[]):WorkSheet
}