$(document).ready(function () {
  let cantidad = 0;
  let total = 0;
  let totalDiscos = 0;
  let carritoEntradas = [];

  /*****************************************/
  /*************VENTA ENTRADAS**************/
  /*****************************************/
  const entradas = [
    {
      id: 1,
      lugar: "Sala Acapulco",
      precio: 18,
    },
    {
      id: 2,
      lugar: "Sala Gong",
      precio: 18,
    },
    {
      id: 3,
      lugar: "Sala Albeniz",
      precio: 18,
    },
  ];

  //bucle for para rellenar el select con las salas que haya disponibles
  entradas.forEach((item) => {
    $("#mySelect").append("<option>" + item.lugar + "</option>");
  });

  $("#addCarrito").click(function (e) {
    e.preventDefault();
    let sala = $("#mySelect :selected").val();
    entradas.forEach((item) => {
      if (item.lugar === sala) {
        carritoEntradas.push(item);
      }
    });
    cantidad = parseFloat($("input#cantidad").val());
    let index = carritoEntradas.length - 1;
    if (cantidad > 0) {
      let precio = carritoEntradas[index].precio;

      $("#carrito").append(
        "<div class='col-10 row border rounded-2 mb-2 mx-0'><p class='col-9 py-2 m-0'>" +
          carritoEntradas[index].lugar +
          "</p><p class='col-3 py-2 m-0'>" +
          cantidad +
          "</p></div><div class='col-2'><p class='m-0 py-2'><i class='fa-solid fa-xmark fs-4'></i></p></div>"
      );

      total += cantidad * precio;

      $("#total").text(total);
    } else {
      $("input#cantidad").addClass("border-danger border-1");
    }

    /*Manejadores para el botón close*/

    $("body").on("mouseenter", ".fa-xmark", function (e) {
      $(e.target).addClass("text-secondary");
    });
    $("body").on("mouseleave", ".fa-xmark", function (e) {
      $(e.target).removeClass("text-secondary");
    });

    $("#carrito i").on("click", function (e) {
      console.log(e.target);
      let sala = $(e.target)
        .parentsUntil("#carrito")
        .prev()
        .children()
        .eq(0)
        .text();
      let cantidad = parseInt(
        $(e.target).parentsUntil("#carrito").prev().children().eq(1).text()
      );

      $(e.target).parentsUntil("#carrito").hide();
      $(e.target).parentsUntil("#carrito").prev().hide();
      let precioTotal = parseInt($("span#total").text());

      entradas.forEach((item) => {
        if (item.lugar === sala) {
          precioTotal = precioTotal - item.precio * cantidad;
        }
      });
      $("#total").text(precioTotal);
      total = precioTotal;
    });
  }); /*fin función addCarrito*/

  $("#comprar").click(function (e) {
    if ($("#carrito").children().is("div")) {
      console.log("compra");
      $("#carrito").empty();
      $("#total").empty();
      $("#carrito").append(
        "<p><h4 class='fw-bold border border-2 rounded-2 border-danger text-center p-2'>Compra realizada con éxito</h4></p>"
      );
    } else {
      console.log("no compra");
    }
  });

  $("#btn-vaciar").click(function (e) {
    console.log(e);
    $("#carrito").empty();
    $("#total").empty();
  });

  /*****************************************/
  /*************VENTA DISCOS****************/
  /*****************************************/

  const discos = [
    {
      id: 1,
      nombre: "Hidin' from the butcher",
      imagen: "img/hiddn.jpg",
      precio: 15,
    },
    {
      id: 2,
      nombre: "Keepin' it warm",
      imagen: "img/keepin.jpg",
      precio: 15,
    },
  ];

  //Rellenamos la web con los discos disponibles
  discos.forEach((disco, index) => {
    $("#discos div").first()
      .append(`<div class='col-12 col-md-5 mb-3'><div class='card  h-100'>
    <img src='${disco.imagen}' class='card-img-top' alt='caratula'>
    <div class='card-body '>
      <h5 class='card-title'>${disco.nombre}</h5>
      <div class='row '>
        <p class='card-text col-3 col-sm-4 pe-0'><span>${disco.precio}</span>€</p>
        <p class='col-8 pt-0 col-sm-6 d-flex'>
          <label for='cantidadD${index}'>Cantidad: </label>
          <input type='number' minvalue='1' id='cantidadD${index}' class='mb-1 ms-2 border border-1 rounded-2 col-5 text-center'/>
      </p>
      </div>
      <button class='btn btn-primary btn-add'>Añadir al carrito</button>
    </div>
   </div></div>`);
  });

  //Accedemos al botón de añadir al carrito y extraemos la información del producto
  $("#cards button").click(function (e) {
    console.log(e.target);
    let producto = $(this).closest("div");

    const info = {
      cantidad: parseInt(
        $(producto)
          .closest("div")
          .children("div")
          .eq(0)
          .children("p")
          .eq(1)
          .children("input")
          .val()
      ),
      nombre: $(producto).closest("div").children("h5").eq(0).text(),
      precio: parseFloat(
        $(producto)
          .closest("div")
          .children("div")
          .eq(0)
          .children("p")
          .eq(0)
          .children("span")
          .text()
      ),
    };
    if (info.cantidad > 0) {
      $("#carrito-discos").prepend(
        "<div class='col-10 row border rounded-2 mb-2 mx-0'><p class='col-9 py-2 m-0'>" +
          info.nombre +
          "</p><p class='col-3 py-2 m-0'>" +
          info.cantidad +
          "</p></div><div class='col-2'><p class='m-0 py-2'><i class='fa-solid fa-xmark fs-4'></i></p></div>"
      );

      totalDiscos += info.precio * info.cantidad;

      $("#total-discos").text(totalDiscos);
    }

    /*Limpiamos el input con la cantidad*/
    $(producto)
      .closest("div")
      .children("div")
      .eq(0)
      .children("p")
      .eq(1)
      .children("input")
      .val("");

    /*Manejadores para el botón close*/

    $("body").on("mouseenter", ".fa-xmark", function (e) {
      $(e.target).addClass("text-secondary");
    });
    $("body").on("mouseleave", ".fa-xmark", function (e) {
      $(e.target).removeClass("text-secondary");
    });

    $("#carrito-discos i").click(function (e) {
      let nombre = $(e.target)
        .parentsUntil("#carrito-discos")
        .prev()
        .children()
        .eq(0)
        .text();
      let cantidad = parseInt(
        $(e.target)
          .parentsUntil("#carrito-discos")
          .prev()
          .children()
          .eq(1)
          .text()
      );

      $(e.target).parentsUntil("#carrito-discos").hide();
      $(e.target).parentsUntil("#carrito-discos").prev().hide();
      let precioTotal = parseInt($("span#total-discos").text());

      if (nombre == info.nombre)
        precioTotal = precioTotal - info.precio * cantidad;

      $("#total-discos").text(precioTotal);
      totalDiscos = precioTotal;
    });
    $("#comprar-discos").click(function (e) {
      if ($("#carrito-discos").children().is("div")) {
        console.log("compra");
        $("#carrito-discos").empty();
        $("#total-discos").empty();
        $("#carrito-discos").append(
          "<p><h4 class='fw-bold border border-2 rounded-2 border-danger text-center p-2'>Compra realizada con éxito</h4></p>"
        );
      } else {
        console.log("no compra");
      }
    });

    $("#btn-vaciar-discos").click(function (e) {
      console.log(e);
      $("#carrito-discos").remove("div");
      $("#total-discos").empty();
    });
  });
});
