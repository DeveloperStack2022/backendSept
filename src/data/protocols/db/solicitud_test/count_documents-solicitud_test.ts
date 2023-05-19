export interface CountDocumentsSolicitudTest {
    count_documents():Promise<CountDocumentsSolicitudTest.Result>
}

export namespace CountDocumentsSolicitudTest {
    export type Result = number
}