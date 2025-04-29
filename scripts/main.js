document.addEventListener('DOMContentLoaded', () => {
    // Formulário de agendamento
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const sport = document.getElementById('sport').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;

            // Aqui você adicionaria a lógica para enviar os dados para o backend
            console.log('Agendamento:', { sport, date, time });
            
            alert('Agendamento realizado com sucesso!');
            bookingForm.reset();
        });
    }

    // Validação de data
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // Validação de horário
    const timeInput = document.getElementById('time');
    if (timeInput) {
        timeInput.addEventListener('change', (e) => {
            const selectedTime = e.target.value;
            const [hours] = selectedTime.split(':');
            
            // Assumindo horário de funcionamento das 6h às 22h
            if (hours < 6 || hours >= 22) {
                alert('Por favor, selecione um horário entre 6:00 e 22:00');
                e.target.value = '';
            }
        });
    }

    // Navegação suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}); 