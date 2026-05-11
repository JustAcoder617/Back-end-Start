// Importa o framework
const express = require('express');
const path=require('path')
const app = express();
const port = 3000;
const morgan = require('morgan');
// Middleware para entender JSON (importante para APIs)
app.use(express.json());
app.use(express.static('client'));
app.use(morgan('dev'));
// Rota Principal (Raiz)
let vezes=Number(0);
app.get('/', (req, res) => {
    res.sendStatus(200);
    console.log("alguem entrou")
});
// Exemplo de uma rota de API que retorna um objeto
app.get('/status', (req, res) => {
    
});
app.get('/data', (req, res) => {
    const prg=req.query.dado;
    vezes+=2;
    if(prg==="1"){
        res.send({
            data: vezes
        });
    }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});