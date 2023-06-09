export type SolicitudNumero = {
   numero_celular:string;
   solicitud:SolicitudM;
   solicitante:SolicitanteM
}

type SolicitudM = {
   caso:string;
   delito:string;
   organizacion_delicuencial:string;
   investigacion_previa:string;
}

type SolicitanteM = {
   grado:string;
   nombres_completos:string;
   unidad:string;
   zona:string;
}

/**
 * Model -> celular 
    - numero celular
    - id solicitud

 * Model -> Solicitud
    - solicitante {_id solicitante }
    - caso
    - delito
    - organizacion_delicuencial
    - investigacion_previa
 * Model -> Solicitantes
    - grado
    - nombres completos
    - unidad 
 */