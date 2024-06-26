console.log(`Iniciando...`);
const express = require('express');
const cors = require('cors');
const secure = require('ssl-express-www') 
const PORT = process.env.PORT || 8080 || 5000 || 3000

const mainrouter = require('./routes/main');
const apirouter = require('./routes/api');

const app = express();
app.enable('trust proxy');
app.set("json spaces",2);
app.use(cors());
app.use(secure);
app.use(express.static("public"));

app.use('/', mainrouter);
app.use('/', apirouter);

app.listen(PORT, () => {
    console.log(`Site aberto! e rodando na porta http://localhost:${PORT}/`);
})

module.exports = app;