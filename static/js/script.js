// Pega o formulário
const form = document.getElementById("booking-form");

// Lógica para o formulário
form.addEventListener("submit", function(event) {
    // Previne o comportamento padrão do formulário
    event.preventDefault();
    
    // Coleta os dados do formulário
    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    // envia os dados pro flask
    fetch('/save_data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),  // Envia os dados como JSON
    })
    .then(response => response.json())
    .then(data => {
        console.log('Sucesso:', data);
        alert('Agendamento realizado com sucesso!');
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao realizar agendamento. Tente novamente.');
    });
}); 