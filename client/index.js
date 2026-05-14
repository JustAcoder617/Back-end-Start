const form = document.getElementById("frmp");

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede o refresh da página

    const frmdata = new FormData(form);
    const data = {
        username: frmdata.get('username'),
        psw: frmdata.get('psw')
    };

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log("Resposta do servidor:", result);

        // Lógica de verificação de resposta
        if (response.status === 200) {
            form.innerHTML = "<h1>🚀 Login realizado com sucesso!</h1>";
        } 
        else if (result.msg === "pass_wrong") {
            form.innerHTML = "<h1>❌ Senha errada!</h1>";
        } 
        else if (result.msg === "NO_USER") {
            form.innerHTML = `
                <h1>⚠️ Usuário não existe</h1>
                <p>Caso não tenha conta, clique <a href='login/index2.html'>aqui</a> para cadastrar.</p>
            `;
        } 
        else {
            form.innerHTML = "<h1>🕵️ Erro desconhecido ao enviar dados!</h1>";
        }

    } catch (err) {
        console.error("Erro na requisição:", err);
        form.innerHTML = "<h1>🔥 Erro de conexão com o servidor!</h1>";
    }
});