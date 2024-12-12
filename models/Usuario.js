import { DataTypes } from "sequelize"
import bcrypt from 'bcrypt'
import db from '../config/db.js'


const Usuario = db.define('usuarios', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaNacimiento: {
        type: DataTypes.DATEONLY,  // Utiliza DATEONLY si solo quieres la fecha sin hora
        allowNull: false
    },
    token: {
        type: DataTypes.STRING
    },
    confirmado: DataTypes.BOOLEAN
}, {
    beforeCreate: async function (usuario) {
        //Encryptando contraseña con hash y bcryp 
        //Salt es como voy a disfrazar el mensaje, generamos la clave para el hasheo , se recp,oemdam 10 rondas de aleotorizacion para no consumir demasiados recuersos de hardware
       const salt = await bcrypt.genSalt(10);
       usuario.password = await bcrypt.hash( usuario.password, salt) 
    },

    beforeUpdate: async function (usuario) {

        //Verificar que token este activo o no este confirmado

        if(usuario.token == null && usuario.password != null){

            const salt = await bcrypt.genSalt(10);
            usuario.password = await bcrypt.hash( usuario.password, salt);
    
        }
        //Encryptando contraseña con hash y bcryp 
        //Salt es como voy a disfrazar el mensaje, generamos la clave para el hasheo , se recp,oemdam 10 rondas de aleotorizacion para no consumir demasiados recuersos de hardware
    },
    scopes: {
        eliminarPassword: {
            attributes: {
                exclude: ['password', 'token', 'confirmado', 'createdAt', 'updatedAt']
            }
        }
    }
})

//Metodos personalizados

Usuario.prototype.verificarPassword = function (password) {
    return bcrypt.compare(password, this.password);
}

export default Usuario