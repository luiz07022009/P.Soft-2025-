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
        carregarAgendamentos(); // Recarrega a lista após salvar
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao realizar agendamento. Tente novamente.');
    });
});

// Função para carregar os agendamentos do arquivo JSON
async function carregarAgendamentos() {
    try {
        const response = await fetch('/data/agendamentos.json');
        const agendamentos = await response.json();
        exibirAgendamentos(agendamentos);
    } catch (error) {
        console.error('Erro ao carregar agendamentos:', error);
    }
}

// Função para exibir os agendamentos na tabela
function exibirAgendamentos(agendamentos) {
    const tbody = document.getElementById('agendamentos-tbody');
    tbody.innerHTML = '';

    if (!Array.isArray(agendamentos)) {
        console.error('Dados de agendamentos inválidos');
        return;
    }

    agendamentos.forEach(agendamento => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${agendamento.sport}</td>
            <td>${formatarData(agendamento.date)}</td>
            <td>${agendamento.time}</td>
            <td><span class="status-${agendamento.status || 'pendente'}">${agendamento.status || 'Pendente'}</span></td>
            <td>
                <button onclick="cancelarAgendamento('${agendamento.id}')" class="btn btn-danger">Cancelar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Função para formatar a data
function formatarData(data) {
    if (!data) return '';
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
}

// Função para cancelar um agendamento
async function cancelarAgendamento(id) {
    if (confirm('Tem certeza que deseja cancelar este agendamento?')) {
        try {
            const response = await fetch(`/cancelar-agendamento/${id}`, {
                method: 'POST'
            });
            if (response.ok) {
                carregarAgendamentos(); // Recarrega a lista
            }
        } catch (error) {
            console.error('Erro ao cancelar agendamento:', error);
        }
    }
}

// Adicionar listener para o formulário de agendamento
document.getElementById('booking-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const agendamento = {
        sport: formData.get('sport'),
        date: formData.get('date'),
        time: formData.get('time')
    };

    try {
        const response = await fetch('/agendar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(agendamento)
        });

        if (response.ok) {
            alert('Agendamento realizado com sucesso!');
            this.reset();
            carregarAgendamentos(); // Recarrega a lista de agendamentos
        }
    } catch (error) {
        console.error('Erro ao fazer agendamento:', error);
        alert('Erro ao fazer agendamento. Tente novamente.');
    }
});

// Carregar agendamentos quando a página carregar
document.addEventListener('DOMContentLoaded', carregarAgendamentos); 