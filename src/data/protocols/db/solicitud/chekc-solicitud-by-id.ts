export interface CheckSolicitudByIdRepository {
  checkById: (id: string) => Promise<CheckSolicitudByIdRepository.Result>
}

export namespace CheckSolicitudByIdRepository {
  export type Result = boolean
}
