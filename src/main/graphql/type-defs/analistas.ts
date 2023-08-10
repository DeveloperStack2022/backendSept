import {gql} from 'apollo-server-express'

export default gql`
    extend type Query {
        getAnalistaByNumCl (numero_cedula:String!):AnlistaResult
    }

    type AnlistaResult {
        id:String!
        cedula:String!
        nombres:String!
        grado:String!
        unidad:Unidad!
        direccion:Direccion!
        zona:Zona!
    }

    type Zona {
        _id:String!
        nombre_zona:Int!
    }

    type Direccion {
        nombre_direccion:String!
    }

    type Unidad {
        _id:String!
        nombre_unidad:String!
    }
    
`