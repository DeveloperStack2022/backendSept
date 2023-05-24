import {WorkBook} from 'xlsx'

export interface readFile {
    readFile(ruta:string):WorkBook;
}