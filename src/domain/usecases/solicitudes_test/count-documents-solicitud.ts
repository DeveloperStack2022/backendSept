interface SolicitudCountDocuments {
    count_documents():Promise<SolicitudCountDocuments.Result>
}

export namespace SolicitudCountDocuments {
    export type Result = number
}