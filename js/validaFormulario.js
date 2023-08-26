/**
 * @author Pilar Fernández Nieto
 * @version 1.0
 * @description script para la validación del formulario de contacto
 */

$(document).ready(function () {
  $("input#enviar").click(function (e) {
    let nombre = $("input#nombre").val();
    let apellidos = $("input#apellidos").val();
    let email = $("input#email").val();
    let telefono = $("input#tfno").val();

    if (
      validaNombre(nombre) &&
      validaApellidos(apellidos) &&
      validaMail(email) &&
      validaTelefono(telefono) &&
      validaCheck()
    ) {
      alert("Envio correcto");
      return true;
    } else {
      e.preventDefault();
      return false;
    }
  });

  /**
   * validaNombre
   * @param {String} nombre
   * @returns {Boolean}
   * función para validar el nombre
   */
  function validaNombre(nombre) {
    let regExpNombre = /[A-Z]\w{1,20}/g;
    let elemento = $("input#nombre");
    let mensaje = "";
    if (nombre == "") {
      mensaje = "Campo obligatorio";
      error(elemento, mensaje);
    } else if (regExpNombre.test(nombre)) {
      limpiar(elemento);
      return true;
    } else {
      mensaje = "Formato incorrecto";
      error(elemento, mensaje);
      return false;
    }
  }

  /**
   * validaApellidos
   * @param {String} apellidos
   * @returns {Boolean}
   */
  function validaApellidos(apellidos) {
    //admite un apellido o dos
    let regApellidos = /^[[A-ZÁ-Ú][a-zá-ú]+(\s[[A-ZÁ-Ú][a-zá-ú]+)?/g;
    let elemento = $("input#apellidos");
    let mensaje = "";
    if (apellidos == "") {
      mensaje = "Campo obligatorio";
      error(elemento, mensaje);
    } else if (regApellidos.test(apellidos)) {
      limpiar(elemento);
      return true;
    } else {
      mensaje = "Formato incorrecto";
      error(elemento, mensaje);
      return false;
    }
  }

  /**
   * validaMail
   * @param {String} email
   * @returns {Boolean}
   */
  function validaMail(email) {
    let regEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[\w-]{2,}$/g;
    let elemento = $("input#email");
    let mensaje = "";
    if (email == "") {
      mensaje = "Campo obligatorio";
      error(elemento, mensaje);
      return false;
    } else if (regEmail.test(email)) {
      limpiar(elemento);
      return true;
    } else {
      mensaje = "Formato incorrecto";
      error(elemento, mensaje);
      return false;
    }
  }

  /**
   * validaTelefono
   * @param {String} telefono
   * @returns {Boolean}
   */
  function validaTelefono(telefono) {
    let regTelefono = /^[6|9]+\d{8}$/g;
    let elemento = $("input#tfno");
    let mensaje = "";
    if (telefono == "") {
      mensaje = "Campo obligatorio";
      error(elemento, mensaje);
      return false;
    } else if (regTelefono.test(telefono)) {
      limpiar(elemento);
      return true;
    } else {
      mensaje = "Formato incorrecto";
      error(elemento, mensaje);
      return false;
    }
  }

  /**
   * validaCheck
   * @returns {Boolean}
   */
  function validaCheck() {
    let elemento = $("input#privacidad");
    $("input#privacidad").click(function (e) {
      $(elemento).parent().removeClass("text-danger fw-bold");
    });

    if (!$("input#privacidad").prop("checked")) {
      $(elemento).parent().addClass("text-danger fw-bold");

      return false;
    } else {
      limpiar(elemento);
      return true;
    }
  }

  /**
   * limpiar
   * @param {Element} elemento
   * elimina el formato de error si lo tuviera
   */
  function limpiar(elemento) {
    $(elemento).parent().removeClass("text-danger fw-bold");
    $(elemento).removeClass("border-danger");
    $(elemento).next().remove();
  }

  /**
   * error
   * @param {Element} elemento
   * @param {String} mensaje
   * función que le da estilos al mensaje de error al no validar una función
   */
  function error(elemento, mensaje) {
    $(elemento).addClass("border-danger");
    $(elemento).next().remove();
    $(elemento)
      .parent()
      .append("<p>" + mensaje + "</p>")
      .addClass("text-danger fw-bold");
  }
});
