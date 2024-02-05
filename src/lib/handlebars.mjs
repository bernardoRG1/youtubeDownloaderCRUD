import { format } from "timeago.js";


const helpers = {};

helpers.stampTotime = (tiemstamp) => {
   try {
      return format(tiemstamp)
   } catch (error) {
      console.log(error)
   }
}

helpers.isInvalidInput = async (type, value, originalPassword) => {
   try {
      const types = {
         username: /^[a-zA-Z0-9_]{3,15}$/, // Expresión regular para el nombre de usuario
         password: /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/, // Expresión regular para la contraseña (al menos 8 caracteres con al menos un número y una letra)
         fullName: /^[a-zA-Z\s]+$/, // Expresión regular para el nombre completo (solo letras y espacios)
         secondPass: () => secondPass(value, originalPassword), // Usar la función secondPass para validar la repetición de la contraseña
      };

      if (types[type]) {
         // Verificar si el tipo de validación es válido
         if (types[type].call(null, value)) {
            // La entrada es válida
            return { isValid: true, errorMessage: "" };
         } else {
            // La entrada no cumple con la validación
            return { isValid: false, errorMessage: `Ingrese un ${type} válido.` };
         }
      } else {
         // El tipo de validación no está definido
         throw new Error("Tipo de validación no definido.");
      }
   } catch (error) {
      console.log(error);
      return { isValid: false, errorMessage: "Error al validar la entrada." };
   }
};

export default helpers;