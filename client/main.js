async function checar_back_barrinha() {
    const progress = document.getElementById('prg');

    try {
        const datasv = await fetch("http://localhost:3000/data?dado=1", {
            cache: "no-store"
        });
        
        const resposta = await datasv.json(); 
        
        // Se o seu back retornar algo tipo { valor: "60" }
        // Você precisa acessar a propriedade, ex: resposta.valor
        const valorBruto = typeof resposta === 'object' ? resposta.data : resposta;

        const final = parseInt(valorBruto, 10);

        if (!isNaN(final)) {
           progress.value = final;
        } else {
            console.error("O retorno não é um número válido!");
        }
    } catch (error) {
        console.error("Erro de conexão/fetch:", error);
    }
}
const button=document.getElementById("oi");
addEventListener("click", checar_back_barrinha);