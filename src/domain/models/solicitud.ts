export type SolicitudModel = {
  id: string
  hora: string
  fecha: Date
  plataforma: string
  investigacion_previa: string // Ip
  delito?: string
  caso?: string
  evento?: string
  organizacion_delicuencial?: string
  // Relaciones
  solicitante: Solicitante
  celular: Celular[]
  ubicacion: Ubicacion[]
}

export type SolicitudResult = { 
  id: string
  hora: string
  fecha: Date
  plataforma: string
  investigacion_previa: string // Ip
  delito?: string
  caso?: string
  evento?: string
  organizacion_delicuencial?: string
  nombre_fiscal:string
  nombre_fiscalia:string
  tipo_solicitud:string
  // Relaciones
  solicitante_result: Solicitante
  celular: Celular[]
  ubicacion: Ubicacion[]
}

export type Celular = {
  id: string
  numero_celular: string
  imsi: string
  id_ubicacion: string
  id_solicitud?: string
}

export type Ubicacion = {
  id: string
  latitud: string
  longitud: string
  id_celular?: string
}

export type Solicitante = {
  id: string
  grado: string
  nombres_completos: string
  unidad?: string
  zona?: string
}
