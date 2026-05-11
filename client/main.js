async function version() {
    try {
        const resposta = await fetch("http://localhost:3000/status", {
            cache: "no-store"
        });

        const dado = await resposta.text();

        const span = document.getElementById("vrs");
        
        if (span) {
            span.innerText = dado.ver; 
            console.log("Versão atual:", dado);
        }
    } catch (err) {
        console.error("Erro ao buscar a versão:", err);
    }
}

window.onload = version;