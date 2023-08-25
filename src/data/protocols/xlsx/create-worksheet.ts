import {WorkSheet} from 'xlsx'
export interface CreateworkSheet {
    create_new_worksheet(data:unknown[]):WorkSheet
}