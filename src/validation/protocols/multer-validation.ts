interface FileFilterCallback {
    (error: Error): void;
    (error: null, acceptFile: boolean): void;
}

export interface FileValitation {
    fileFilter(req:any,file:Buffer,cb:FileFilterCallback): void
}