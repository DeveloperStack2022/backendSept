export interface FileFilter {
    fileFilter():void
}

export namespace FileFilter {
    export interface FileFilterCallback {
        (error:Error):void;
        (error:null,acceptFile:boolean):void
    }
}