// Importa o framework
const express = require('express');
const path=require('path')
const app = express();
const port = 3000;
const morgan = require('morgan');
const pah=require('path');
app.use(express.static('client'));
// Middleware para entender JSON (importante para APIs)
// funções:
async function getRawText(url) {
    let response = await fetch(url, { cache: "no-store" });
    return await response.text();
}

app.get('/status', async (req, res) => {
    try {
        const url = "https://raw.githubusercontent.com/JustAcoder617/Back-end-Start/main/version.txt";
        
        let versao = await getRawText(url);
        
        res.json({
            online: true,
            ver: versao.trim(), 
        });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar versão" });
    }
});
app.get('/data', (req, res) => {
    res.json({
        data: "404: we dont have this feature now."
    });
    res.sendStatus(404);
});
app.get('/', (req, res)=> {
    res.sendStatus(200);
});
// Inicia o servidor
app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});