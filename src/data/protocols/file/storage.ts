import {StorageEngine} from 'multer'
export interface Storage {
    diskStorage:(path:string,fileName:string) => StorageEngine
}