let juegos = [
    {
        nombre: 'Resident Evil',
        id: 1,
        genre: 'Survival Horror',
        price: 250,
        imgUrl: 'http://2.bp.blogspot.com/-c3zVpbk5tfA/VL0mieXksvI/AAAAAAAAQtQ/4uVyCxqPN6k/s1600/resident-evil.jpg'
    },
    {
        nombre: "Uncharted 3: Drake's deception",
        id: 2,
        genre: 'Accion-aventura',
        price: 1200,
        imgUrl: "https://www.hd-tecnologia.com/imagenes/articulos/2019/08/Aqu%C3%AD-est%C3%A1n-Uncharted-3-y-The-Last-Of-Us-corriendo-en-PC-con-la-%C3%BAltima-versi%C3%B3n-de-RPCS3.jpg"
    },
    {
        nombre: 'Devil May Cry 3',
        id: 3,
        genre: 'Hack n slash',
        price: 1300,
        imgUrl: "https://i.ytimg.com/vi/1dXTpeANgGo/maxresdefault.jpg"
    },
    {
        nombre: 'Resident Evil 4',
        id: 4,
        genre: 'Survival Horror' + ', ' + 'Accion',
        price: 650,
        imgUrl: "https://phantom-marca.unidadeditorial.es/0e25d0867963f4f5a53e49fd57f28cc3/resize/1320/f/jpg/assets/multimedia/imagenes/2021/09/27/16327451990851.jpg"
    },
    {
        nombre: "God Of War",
        id: 5,
        genre: 'Hack n Slash' + ', ' + 'Puzzles',
        price: 6200,
        imgUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1593500/capsule_616x353.jpg?t=1642526157"
    },
    {
        nombre: 'Call Of Duty: Modern Warfare 2',
        id: 6,
        genre: 'fps',
        price: 4500,
        imgUrl: "https://phantom-marca.unidadeditorial.es/5a63ce6030006c77945628d0d67c426c/resize/1320/f/jpg/assets/multimedia/imagenes/2022/06/07/16546329958064.jpg"
    },
    {
        nombre: 'The Witcher 3: Wild Hunt',
        id: 7,
        genre: 'Mundo abierto' + ', ' + 'Rpg',
        price: 950,
        imgUrl: "https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg?t=1668443314"
    },
    {
        nombre: "The Elders Scrolls V: Skyrim",
        id: 8,
        genre: 'Mundo abierto' + ', ' + 'Rpg',
        price: 1200,
        imgUrl: "https://cdn.akamai.steamstatic.com/steam/apps/489830/header.jpg?t=1650909796"
    },
    {
        nombre: 'Hollow Knight',
        id: 9,
        genre: 'Metroidvania',
        price: 400,
        imgUrl: "https://cdn.akamai.steamstatic.com/steam/apps/367520/capsule_616x353.jpg?t=1667006028"
    },
    {
        nombre: 'The Forest',
        id: 10,
        genre: 'Terror' + ', ' + 'Supervivencia',
        price: 600,
        imgUrl: "https://i.ytimg.com/vi/6R9zo30Vpao/maxresdefault.jpg"
    },


]


let contenedorCarrito = document.getElementById("contenedorCarrito")

let contenedor = document.getElementById("contenedorJuegos")

renderizarJuegos(juegos)

let carrito = [] 
if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"))
}
renderizarCarrito(carrito)


let buscador = document.getElementById("buscador")

buscador.addEventListener("input", renderizarJuegosFiltrados)

function renderizarJuegosFiltrados() {
    let juegosFiltrados = juegos.filter(juego => juego.nombre.toLowerCase().includes(buscador.value) || juego.genre.toLowerCase().includes(buscador.value))

    renderizarJuegos(juegosFiltrados)
}

function renderizarJuegos(arrayDeJuegos) {
    contenedor.innerHTML = ""
    for (const juego of arrayDeJuegos) {
        let tarjetaJuego = document.createElement("div")
        tarjetaJuego.className = "juego"
        tarjetaJuego.innerHTML = `
    <h3>${juego.nombre}</h3>
    <p>
    <p>Precio: $${juego.price}</p>
    <img src=${juego.imgUrl}>
    <button class='boton' id=${juego.id}>Añadir al carrito</button>
    `

        contenedor.append(tarjetaJuego)
    }
    let botones = document.getElementsByClassName("boton")

    for (const boton of botones) {
        boton.addEventListener("click", agregarAlCarrito)
    }

}

function agregarAlCarrito(e) {
    let juegoBuscado = juegos.find(juego => juego.id == e.target.id)
    let posicionJuegoBuscado = carrito.findIndex(juego => juego.id == juegoBuscado.id)
    if (posicionJuegoBuscado != -1) {
        carrito[posicionJuegoBuscado].unidades++
        carrito[posicionJuegoBuscado].subtotal = carrito[posicionJuegoBuscado].unidades * carrito[posicionJuegoBuscado].precioUnitario
    } else {
        carrito.push({ id: juegoBuscado.id, nombre: juegoBuscado.nombre, precioUnitario: juegoBuscado.price, unidades: 1, subtotal: juegoBuscado.price })
    }
    localStorage.setItem("carrito", JSON.stringify(carrito))
    renderizarCarrito(carrito)
}

function renderizarCarrito(arrayDeJuegos) {
    contenedorCarrito.innerHTML = " "
    for (const juego of arrayDeJuegos) {
        contenedorCarrito.innerHTML += `
        <div class='flex'>
            <p>${juego.nombre} </p>
            <p>${juego.precioUnitario}</p>
            <p>${juego.unidades} </p
            <p>${juego.subtotal} </p
        `
    }
    let total = carrito.reduce((acc, valorActual) => acc + valorActual.subtotal, 0)
    contenedorCarrito.innerHTML += `
      <h3>TOTAL $${total}</h3>
      `
}

let botonComprar = document.getElementById("comprar")
botonComprar.addEventListener("click", () => {
  localStorage.removeItem("carrito")
  carrito = []
  renderizarCarrito(carrito)
})
