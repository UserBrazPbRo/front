document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    const cpfInput = document.getElementById('cpf');
    const emailInput = document.getElementById('email');
    const termosInput = document.getElementById('termos');

    // Formatação automática do CPF (se existir e for preenchido)
    if (cpfInput) {
        cpfInput.addEventListener('input', function() {
            this.value = formatarCPF(this.value);
        });
    }

    // Validação do formulário
    if (form) {
        form.addEventListener('submit', function(event) {
            let formValido = true;

            // Valida CPF apenas se foi preenchido
            if (cpfInput.value.trim() !== '' && !validarCPF(cpfInput.value)) {
                document.getElementById('cpfError').textContent = 'CPF inválido';
                cpfInput.classList.add('invalido');
                formValido = false;
            } else {
                document.getElementById('cpfError').textContent = '';
                cpfInput.classList.remove('invalido');
            }

            // Valida e-mail apenas se foi preenchido
            if (emailInput.value.trim() !== '' && !validarEmail(emailInput.value)) {
                document.getElementById('emailError').textContent = 'E-mail inválido';
                emailInput.classList.add('invalido');
                formValido = false;
            } else {
                document.getElementById('emailError').textContent = '';
                emailInput.classList.remove('invalido');
            }

            // Valida termos (mantém obrigatório)
            if (!termosInput.checked) {
                document.getElementById('termosError').textContent = 'Você deve aceitar os termos';
                termosInput.classList.add('invalido');
                formValido = false;
            }

            if (!formValido) {
                event.preventDefault();
            }
        });
    }

    // Função para formatar CPF (mantida igual)
    function formatarCPF(cpf) {
        cpf = cpf.replace(/\D/g, '');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        return cpf;
    }

    // Função para validar CPF (mantida igual)
    function validarCPF(cpf) {
        cpf = cpf.replace(/\D/g, '');
        
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
            return false;
        }
        
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let resto = (soma * 10) % 11;
        resto = (resto === 10 || resto === 11) ? 0 : resto;
        
        if (resto !== parseInt(cpf.charAt(9))) {
            return false;
        }
        
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        resto = (resto === 10 || resto === 11) ? 0 : resto;
        
        return resto === parseInt(cpf.charAt(10));
    }

    // Função para validar e-mail (mantida igual)
    function validarEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});