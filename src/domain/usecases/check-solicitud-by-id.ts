export interface CheckSolicitudById {
  checkById: (id: string) => Promise<CheckSolicitudById.Result>
}

export namespace CheckSolicitudById {
  export type Result = boolean
}
