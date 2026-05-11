// Importa o framework
const express = require('express');
const path=require('path')
const app = express();
const port = 3000;
const morgan = require('morgan');
const { cache } = require('react');
// Middleware para entender JSON (importante para APIs)
// funções:

async function fecthprs(url) {
    let dado_receba= await fetch(url, {
        cache: "no-store"
    });
    let final=await dado_receba.json();
    return final;
}
app.use(express.json());
app.use(express.static('client'));
app.use(morgan('dev'));
// Rota Principal (Raiz)
let vezes=Number(0);
app.get('/', (req, res) => {
    res.sendStatus(200);
    console.log("alguem entrou");
});
// Exemplo de uma rota de API que retorna um objeto
app.get('/status', (req, res) => {
    fecthprs("")//stop
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