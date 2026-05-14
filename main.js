// Importa o framework
const express = require('express');
const path=require('path')
const app = express();
const port = 5001;
const morgan = require('morgan');
app.use(express.static('client'));
const { QuickDB } = require("quick.db");
app.use(express.urlencoded({ extended: true }));
const db = new QuickDB();
(async () => {
    try {
        // Opcional: apenas para testar se a DB está funcional
        await db.init(); 
        console.log("📦 Banco de dados carregado com sucesso!");
    } catch (err) {
        console.error("❌ Falha ao iniciar DB:", err);
    }
})();
app.use(express.json());
app.use(morgan('dev'));
// Middleware para entender JSON (importante para APIs)
// funções:
(async () =>{
    await db.init();
})
async function getRawText(url) {
    let response = await fetch(url, { cache: "no-store" });
    return await response.text();
}

app.get('/status', async (req, res) => {
    try {
        const url = "https://raw.githubusercontent.com/JustAcoder617/Back-end-Start/main/version.txt";
        
        let versao = await getRawText(url);
        
        res.json({
            "online": true,
            "ver": versao.trim(), 
        });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar versão" });
    }
});
app.post('/login', async (req, res) => {
    const user=req.body.user;
    const password=req.body.senha;
    try{
        const real=await db.get(`users.${user}.psw`);
        if(real===undefined){
            return res.status(404).json({
                "msg": 'NO_USER'
            });
        }else if(real!=password){
            return res.status(403).json({
                "msg": "pass_wrong"
            });
        }
        return res.status(200).json({
            'msg': 'USR_OK'
        });
    } catch(error){
        return res.status(500).json({
            "msg": `ERR: ${error}`
        });
    }
});
app.post('/create', async (req, res) => {
    const username=req.body.username;
    const password=req.body.psw;
    try{
        await db.set(`users.${username}`, {"name": username, "psw": password})
        return res.status(201).json({
            "msg": "CREATED"
        });
    }
    catch(error){
        return res.status(500).json({
            "msg": `ERR: ${error}`
        });
    }
});
app.get('/', (req, res)=> {
    return res.sendStatus(200);
});
// Inicia o servidor
const server = app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});
