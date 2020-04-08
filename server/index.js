const express = require('express')
const massive = require('massive')
const productsCtrl = require('./controllers/products_controller')

require('dotenv').config()
const app = express()

app.use(express.json())

const{SERVER_PORT, CONNECTION_STRING} = process.env

app.get('/api/products', productsCtrl.getAll)
app.get('/api/products/:id', productsCtrl.getOne)
app.post('/api/products', productsCtrl.create)
app.put('/api/products/:id', productsCtrl.update)
app.delete('/api/products/:id', productsCtrl.delete)

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false

    },
}).then(dbInstance => {
    console.log('DB Connected')
    app.set('db', dbInstance)
})
.catch(err => console.log(err))

app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}`)

})