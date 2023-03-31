//definicio datos
const type = ["vino", "vodka", "fernet" , "bebidasinalcohol"];
class bebida {
    constructor (id, name, type, img, price,){
        this.id = id
        this.name = name
        this.type = type
        this.img = img
        this.price = price
    }
}
class User {
    constructor (nameuser, email, age, password){
        this.nameuser = nameuser
        this.email = email
        this.age = age
        this.password = password
    }
}
let UsuariosRegistrados = []
let UsuariosRegistradosJSON = JSON.stringify(UsuariosRegistrados)
const UsuariosRegistradosStorage = localStorage.setItem("Usuarios", UsuariosRegistradosJSON)

let logueado = false
const fecha = new Date();
const añoActual = fecha.getFullYear();

let catena = new bebida(0, "Catena", type[0],["./assets/catena.jpeg"], 2000);
let penfolds = new bebida(1, "Penfolds", type[0],['assets/penfolds.jpeg'], 2700);
let Symington = new bebida(2, "Symington", type[0],['assets/Symington.jpeg'], 3000);
let torres = new bebida(3,"Torres", type[0],['assets/torres.jpeg'], 2500);
let Antinori = new bebida(4,"Antinori", type[0],['assets/Antinori.jpeg'], 2000);
let VegaSicilia = new bebida(5,"Vega Sicilia", type[0],['assets/VegaSicilia.jpeg'], 2500);
let sernova = new bebida(6,"Sernova", type[1],['assets/sernova.jpeg'], 1000);
let smirnoff = new bebida(7,"Smirnoff", type[1],['./assets/smirnoffjpeg.jpeg'], 1100);
let skyy = new bebida(8,"Skyy", type[1],['assets/skyy.jpeg'], 1500);
let vitone = new bebida(9,"Vitone", type[2],['assets/vitone.jpeg'], 700);
let branca = new bebida(10, "Branca", type[2],['assets/branca.jpeg'], 1000);
let sprite = new bebida(11,"Sprite", type[3],['assets/sprite.jpeg'], 500);
let coca = new bebida(12,"Coca", type[3],['assets/coca.jpeg'], 500);
let speed = new bebida(13,"Speed", type[3],['assets/speed.jpeg'], 300);
let redbull = new bebida(14,"Redbull", type[3],['assets/redbull.jpeg'], 300);

let sesion_iniciada = false


let arrayBebidas = [catena, penfolds, Symington, torres, Antinori, VegaSicilia, sernova, smirnoff, skyy, vitone, branca, sprite, coca, speed, redbull]
const arrayBebidasJSON = JSON.stringify(arrayBebidas)
localStorage.setItem("Bebidas", arrayBebidasJSON)
let contenedorBebidas = document.getElementById("contenedorBebidas")
// Armador de cards
function armadocards(){
arrayBebidas.forEach(bebida =>{
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card mb-3">
    <img src="${bebida.img}" class="card-img-top">
    <div class="card-body">
    <h5 class="card-title">${bebida.name}</h5>
    <p class="card-text">Esta bebida es  ${bebida.type} <br> 
    y su precio es de $  ${bebida.price}</p>
    <input type="button" onclick= "funciones_comprar(${bebida.id}, carrito)" class="btn btn-primary" value="Comprar">
    </div>
    </div>`;
    contenedorBebidas.appendChild(div);
})}
let cards = armadocards()
// Contar total X bebidas
function contar_bebidas(bebidas, id){
    cont = 0
    for (let i = 0; i < bebidas.length ; i++) {
        for (const key in bebidas[i]){
            if (key === "type"){
                if (bebidas[i][key] === id){
                    cont += 1
                }
            }
        }
        }
    return cont
    }
//Filtro Spans-->
const spans = document.getElementsByClassName("spans");
ValorSpans(spans, arrayBebidas)
function ValorSpans(filtro,array){
    for (let i = 0; i < filtro.length ; i++){
        let cantidad = null
        cantidad = contar_bebidas(array, filtro[i].id)
        filtro[i].innerText = cantidad
}}
//Filtro Ordenamiento *No se como hacer para que se quite el orden actual de bebidas por el nuevo orden generado, cuando lo aprieto se ejecuta nuevamente la creacion de cards, pero no se quita la formacion anterior
const filtrototal = document.getElementsByClassName("filtro");
function Filtro(valor1, array2){
    array2.filter(p => { 
    if( p.type == valor1){
    array2.sort((a,b) => {
        if (a.type == valor1 && b.type == 1){
            return 0}
        if (a.type == valor1 && b.type != 1){
            return -1}
        return 1   }) 
    console.log(array2)
    arrayBebidas = array2
    armadocards()}
})}


//Sumar bebidas al Carrito de compra
const carrito = []
class OBJcarrito {
    constructor (id, nombre, precio, cantidad){
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.cantidad = cantidad
    }
}
let CarritoJSON = JSON.stringify(carrito)
const CarritoStorage = localStorage.setItem("Carrito", CarritoJSON)

function agregarCarrito(cod, bebidas){
    let bebidacomprada = bebidas.find(b => b.id == cod)
    let existeEnCarrito = carrito.find(e => e.id == cod)
    if (existeEnCarrito != undefined){
        let posicion = carrito.findIndex(elemento => elemento.id == existeEnCarrito.id)
        carrito[posicion].precio = carrito[posicion].precio + bebidacomprada.price
        carrito[posicion].cantidad += 1
        CarritoJSON = JSON.stringify(carrito)
        localStorage.setItem("Carrito", CarritoJSON)
        Toastify({
            text: "El sumo uno mas del producto " + OBj.name + " tiene " + carrito[posicion].cantidad +" unidades",
            duration: 3000,
            gravity: "bottom",
            position: "right",
        }).showToast()
    } else {
        function buscar_bebida(Bebidas, cod){
            OBj = []
            for (let i = 0; i < Bebidas.length ; i++) {
                for (const key in Bebidas[i]){
                    if (key === "id"){
                        if (Bebidas[i][key] === cod){
                            OBj = Bebidas[i]
                            const SumaralCarrito = new OBJcarrito (OBj.id, OBj.name, OBj.price, 1)
                            carrito.push(SumaralCarrito)
                            contador_precio = SumaralCarrito.precio
                            const Carritoget = localStorage.getItem("Carrito")
                            const CarritoAgregar = JSON.parse(Carritoget)
                            CarritoAgregar.push(SumaralCarrito)
                            CarritoJSON = JSON.stringify(CarritoAgregar)
                            localStorage.setItem("Carrito", CarritoJSON)
                            Toastify({
                                text: "Se agrego correctamente el producto " + OBj.name + " al carrito",
                                duration: 3000,
                                gravity: "bottom",
                                position: "right",
                            }).showToast()
                        }}}
            }}
        let respuesta = buscar_bebida(arrayBebidas, cod)
    }
    console.log(carrito)
}
//Total Bebidas Carrito de Compras
function contar_bebidas_carrito(carrito, cualidad){
    cont = 0
    for (let i = 0; i < carrito.length ; i++) {
        for (const key in carrito[i]){
            if (key === cualidad){
                if (carrito[i][key] != 0){
                    cont += carrito[i][key]
                }
            }
        }
        }
    return cont
    }
// Funciones de boton Comprar
const spanBebidasCarrito = document.getElementById("BebidasCarrito");
function funciones_comprar(id, carrito){
    agregarCarrito(id, arrayBebidas);
    TotalBebidasCarrito = contar_bebidas_carrito(carrito, "cantidad");
    costo_total = contar_bebidas_carrito(carrito, "precio")
    console.log(costo_total)
    spanBebidasCarrito.innerText = TotalBebidasCarrito
    localStorage.setItem("total", costo_total)
}

// Registrar Nuevo Usuario
let NameUser = document.getElementById("NameUser")
let Password = document.getElementById("Password")
let Ingresar = document.getElementById("Ingresar")
let Registrarme = document.getElementById("Registrarme")
const form = document.createElement("form");
form.innerHTML = `
    <form>
    <div id= "Registrarse">
        <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label mt-3" >Nombre de Usuario</label>
        <input type="form-text" class="form-control" style="width: 85%;"; id="NameUser">
        </div>
        <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Contraseña</label>
        <input type="password" class="form-control" style="width: 85%;" id="Password">
        </div>
        <button type="button" onclick= "Ingresando(NameUser.value,Password.value,  UsuariosRegistrados)" class="btn btn-primary me-3" id="Ingresar">Ingresar</button>
        <button type="button" onclick= "registrarme(UsuariosRegistrados)" class="btn btn-primary ms-3" id="Registrarme">Registrarme</button>
        <div class="form-text">Debe saber que si no inicio sesion  <br> no podra ver nuestros productos</div>
        </div>
    </form>`
formulario.appendChild(form);

function Ingresando(Nombre, Contraseña, UsuariosRegistrados){
    let creado = false
    let encontrado = false
    if (UsuariosRegistrados.length < 1){
        console.log("No estas registrado")
    }
    else{   for (let i = 0; i < UsuariosRegistrados.length ; i++) {
                for (const key in UsuariosRegistrados[i]){
                    if (key === "nameuser" && encontrado == false){
                        if(UsuariosRegistrados[i][key] == Nombre){
                            encontrado = true
                            for (const pas in UsuariosRegistrados[i]){
                                if (pas === "password"){
                                    if (UsuariosRegistrados[i][pas] == Contraseña){
                                        usuarioencontrado = UsuariosRegistrados[i]
                                        console.log(usuarioencontrado)
                                        sesion_iniciada = true
                                        creado = true
                                        console.log("Bienvenido " + usuarioencontrado.nameuser)
                                        return usuarioencontrado}
                                    else{console.log("Su contraseña ingresada es incorrecta")
                                        creado = true
                                        encontrado = true}
                                }}}
                    }
                }}
        }
        if (encontrado == false){console.log("Ese usuario no existe")}
    }
function registrarme (array){
    UserNuevo = new User()
    UserNuevo.nameuser = prompt("Hola podrias indicarme cual sera tu usuario?")
    for (let i = 0; i < array.length ; i++){
        if (UserNuevo.nameuser == array[i].nameuser || UserNuevo.nameuser == ""){
            swal({
                title: "Este nombre de usuario ya esta en uso o no es correcto",
                text: "Es necesario volver a cargar el nombre de usuario",
                icon: "warning",
                button: "Aceptar",
            })
            UserNuevo.nameuser = prompt("Hola podrias indicarme cual sera tu usuario?")
        }
    }
    UserNuevo.email = prompt("Buenisimo " + UserNuevo.nameuser +  " ahora necesito saber tu correo")
    while (UserNuevo.nameuser === "nameuser" || UserNuevo.email === "email" || UserNuevo.email == "" || UserNuevo.nameuser === "nameuser") {
        swal({
            title: "Los datos ingresados son incorrectos",
            text: "Es necesario volver a chequear el nombre de usuario o el mail cargados",
            icon: "warning",
            button: "Aceptar",
        })
        UserNuevo.nameuser = prompt("Hola podrias indicarme cual es tu nombre de usuario?")
        UserNuevo.email = prompt("Buenisimo " + UserNuevo.nameuser + " " + UserNuevo.email + " ahora necesito saber tu correo")}
        UserNuevo.age = (prompt(UserNuevo.nameuser + " necesito que me digas tu año de nacimiento"));
    parseInt (UserNuevo.age);
    if ( añoActual - UserNuevo.age < 18){
        UserNuevo = delete UserNuevo();
        swal({
            title: "No cuenta con la edad apropiada",
            text: "Es necesario ser mayor de 18 años para comprar en nuestra tienda",
            icon: "warning",
            button: "Aceptar",
        })
    }
    UserNuevo.password = prompt("Lo unico que nos falta es generar la contraseña, es necesario que sepas que la misma debe tener como minimo seis caracteres")
    while (UserNuevo.password === "password" || UserNuevo.password.length < 6) {
        swal({
            title: "La contraseña es invalida!!",
            text: "Se encontro el Usuario pero su contraseña ingresada es incorrecta",
            icon: "error",
            button: "Aceptar",
        })
        console.log("Ya estas integrado")
        UserNuevo.password = prompt("La contraseña es invalida!!")
    }
    UsuariosRegistrados.push(UserNuevo)
    const Userget = localStorage.getItem("Usuarios")
    const UserAgregar = JSON.parse(Userget)
    UserAgregar.push(UserNuevo)
    UsuariosRegistradosJSON = JSON.stringify(UserAgregar)
    localStorage.setItem("Usuarios", UsuariosRegistradosJSON)
    document.getElementById("Registrarse").style.display= 'none';
    swal({
        title: "Te registraste correctamente!!",
        text: "Tu usuario de ahora en adelante es " + UserNuevo.nameuser,
        icon: "success",
        button: "Aceptar",
    })
    console.log("Ya estas integrado")
}

/*Falta generar funcion de:
Metodos de Envio = el precio de envio si es que se envia a domicilio indique la Direccion del Domicilio a llevar y se sume al precio total, y este vaya a la pestaña de la tarjeta. Y si no que se pueda elegir Retirar en Sucursal y indique la Direccion del local.
Metodos de Pago  = Se debe solicitar tarjeta de Debito o Credito al Usuario y comparar la fecha de caducidad con la fecha actual para ver si es aceptable. */
/*

// Buscar X bebida
function buscar_bebida(bebida, nombre){
    encontrada = null
    for (let i = 0; i < bebida.length ; i++) {
        for (const key in bebida[i]){
            if (key === "name"){
                if (bebida[i][key] === nombre){
                    encontrada = bebida[i]
                    console.log("Si tenemos la bebida " + nombre + " estos son sus datos:")
                    return encontrada
                }}}}
    }
/*
//let bebida_buscar = document.getElementById("search").value; No se como definir que el search a recibir sea el valor indicado por el Usuario en la barra de busqueda
let bebida_buscar = "skyy"
let lotenemos = buscar_bebida(arrayBebidas, skyy);
console.log(bebida_buscar, lotenemos);*/
