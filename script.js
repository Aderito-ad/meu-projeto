document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Coletando os valores dos campos do formulário
    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const endereco = document.getElementById('endereco').value.trim();
    const email = document.getElementById('email').value.trim();

    // Verificando se todos os campos obrigatórios foram preenchidos
    if (!nome || !telefone || !endereco || !email) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Validar telefone (apenas números)
    if (!/^\d+$/.test(telefone)) {
        alert('O telefone deve conter apenas números.');
        return;
    }

    // Criando o objeto com os dados do formulário
    const formData = {
        nome: nome,
        telefone: telefone,
        endereco: endereco,
        email: email
    };

    console.log('Dados do formulário:', formData);

    // Definindo a URL do backend
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const backendURL = isLocal ? 'http://localhost:5500/cadastrar' : 'https://soterio55.vercel.app/cadastrar';

    console.log('URL do backend:', backendURL);

    // Enviando os dados para o servidor
    fetch(backendURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        console.log('Resposta do servidor:', response);
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Dados recebidos:', data);
        document.getElementById('resultado').innerText = `Cadastro realizado com sucesso! Senha: ${data.senha}`;
        document.getElementById('resultado').style.color = 'green';
    })
    .catch(error => {
        console.error('Erro:', error);
        document.getElementById('resultado').innerText = 'Erro ao cadastrar. Verifique o console para mais detalhes.';
        document.getElementById('resultado').style.color = 'red';
    });
});