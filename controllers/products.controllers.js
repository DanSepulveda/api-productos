const { v4: uuidv4 } = require('uuid')

let productos = []

const agregarProducto = (request, response) => {
  try {
    // if (request.body.hola) throw new Error('No puedes enviar el atributo {hola}')

    const { nombre, precio, marca, isTouch } = request.body

    const nuevoProducto = {
      id: uuidv4(),
      nombre,
      precio,
      marca,
      isTouch
    }

    productos.push(nuevoProducto)

    response.json({
      success: true,
      response: 'Producto agregado correctamente'
    })
  } catch (error) {
    response.json({
      succcess: false,
      response: error.message
    })
  }
}

const leerProductos = (request, response) => {
  try {
    const clave = request.headers.clave

    if (clave === process.env.CLAVE_SECRETA) {
      response.json({
        success: true,
        response: productos
      })
    } else {
      throw new Error('No tienes permiso para ver este contenido')
    }
  } catch (error) {
    response.json({ success: false, error: error.message })
  }
}

const eliminarProducto = (request, response) => {
  try {
    const id = request.params.id

    if (!productos.find((element) => element.id === id)) {
      throw new Error('No existe producto con el id asociado')
    }

    productos = productos.filter((producto) => producto.id !== id)
    response.json({ success: true, response: productos })
  } catch (error) {
    response.json({ success: false, error: error.message })
  }
}

const editarProducto = (request, response) => {
  const id = request.params.id

  const { nombre, precio, marca, isTouch } = request.body

  const productoEnEdicion = {
    id,
    nombre,
    precio,
    marca,
    isTouch
  }

  productos = productos.map((producto) => {
    if (producto.id === id) {
      return productoEnEdicion
    }
    return producto
  })

  response.json({ success: true, response: productos })
}

module.exports = { agregarProducto, leerProductos, eliminarProducto, editarProducto }
