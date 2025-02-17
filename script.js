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

    // Validar email
    if (!validateEmail(email)) {
        alert('Por favor, insira um email válido.');
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
    const backendURL = isLocal ? 'http://localhost:5500/cadastrar' : 'https://sorteio55.vercel.app/cadastrar';

    console.log('URL do backend:', backendURL);

    // Desabilitar o botão de envio durante a requisição
    const submitButton = document.querySelector('#cadastroForm button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerText = 'Enviando...';

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
        document.getElementById('resultado').innerText = 'Erro ao cadastrar. Por favor, tente novamente mais tarde.';
        document.getElementById('resultado').style.color = 'red';
    })
    .finally(() => {
        // Reabilitar o botão de envio após a requisição
        submitButton.disabled = false;
        submitButton.innerText = 'Cadastrar';
    });
});

// Função para validar email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}