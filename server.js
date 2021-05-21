const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');

const connectDB = require('./server/database/connection');

const app = express();

dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 8080

// pedidos de registro
app.use(morgan('tiny'));

// conexão mongodb
connectDB();

// analisar solicitação para analisador de corpo
app.use(bodyparser.urlencoded({ extended : true}))

// definir motor de visualização
app.set("view engine", "ejs")

//carregar ativos
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

//carregar rotas
app.use('/', require('./server/routes/router'))

app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});