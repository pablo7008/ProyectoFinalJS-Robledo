const ContenidoCarritoJSON = localStorage.getItem("Carrito")
const ContenidoCarrito = JSON.parse(ContenidoCarritoJSON)
console.log(ContenidoCarrito)
function MostrarCarrito(carrito){
    if (carrito.length < 1){
        swal ({
            title: "No seleccionaste ninguna bebida a comprar!!",
            text: "Por favor debes volver al catalogo y indicar que bebida deseas comprar ",
            icon: "warning",
            button: "Entendido",
        })
    }
    else {
        carrito.forEach(producto =>{
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="card w-100 mb-3">
        <div class="card-body">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text">Esta por comprar ${producto.cantidad} y su valor total es de $ ${producto.precio}</p>
        </div>
        </div>`;
        contenedorcarrito.appendChild(div);})
        const TotalCarritos = document.createElement("div");
        TotalCarritos.innerHTML = `
        <h2>El precio total a pagar es de: $ ${localStorage.getItem("total")}</h2>`;
        TotalCarrito.appendChild(TotalCarritos);
        const checkboxs = document.createElement("div");
        checkboxs.innerHTML = `
        <h3>Como desea realizar el pago?</h3>
        <div class="cajitas">
            <div>
                <input class="form-check-input" type="checkbox" id="tarjeta"> Tarjeta
            </div>
            <div>
                <input class="form-check-input " type="checkbox" id="efectivo"> Efectivo
            </div>
        </div>
        <div>
            <button type="button" onclick= "verificar()" class="boton">Pagar</button>
        </div>
        `;
        checkbox.appendChild(checkboxs);
    }
}
function verificar(){
    let tarjetacheck = document.getElementById('tarjeta').checked;
    let efectivo = document.getElementById('efectivo').checked;
    if (tarjetacheck == false && efectivo == false){
        console.log("no selecciono ninguna opcion")
    } 
    else if (tarjetacheck == true && efectivo == true){
        console.log("seleccione solo 1")
    }
    else if (tarjetacheck == true && efectivo == false){
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingInput">
        <label for="floatingInput">Nombre y Apellido</label>
        </div>
        <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingInput">
        <label for="floatingInput">Numero de Tarjeta</label>
        </div>
        <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingInput">
        <label for="floatingInput">Fecha de Caducidad</label>
        </div>
        <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingInput">
        <label for="floatingInput">Codigo de Seguridad</label>
        </div>
        <div>
            <button type="submit" onclick= "TarjetaAceptada()" class="btn btn-primary">Confirmar</button>
        </div>
        </div>
        `;
        PagoTarjeta.appendChild(div);
    } else {const div = document.createElement("div");
        div.innerHTML = `
        <div class="form-floating mb-3">
        <input type="text" class="form-control" id="abonado">
        <label for="floatingInput">Efectivo Abonado</label>
        </div>
        <div>
            <button type="submit" onclick= "vuelto(abonado.value)" class="btn btn-primary">Confirmar</button>
        </div>
        </div>
        `;
        PagoEfectivo.appendChild(div);
        abonado = document.getElementById("abonado");}
}
function TarjetaAceptada(){
    swal({
        title: "Tu tarjeta fue aceptada!!",
        text: "Gracias por comprar con nosotros",
        icon: "success",
        button: "Aceptar",
    })
}
function vuelto(pago){
    total = localStorage.getItem("total")
    if (pago < 1 || pago < total){
        swal({
            title: "El valor indicado es menor al total a pagar",
            text: "Por favor indicar un valor positivo o superior al costo del carrito",
            icon: "error",
            button: "Aceptar",
        })
    } else {
        devolver = pago - total
        swal({
            title: "Gracias por comprar con nosotros!!",
            text: "El vuelto a entregar al cliente es de $" + devolver,
            icon: "success",
            button: "Aceptar",
        })
    }
}
MostrarCarrito(ContenidoCarrito)
console.log(localStorage.getItem("total"))
//No se por que en todas las acciones del pago se generan en orden ascendente, me queda eso de chequear