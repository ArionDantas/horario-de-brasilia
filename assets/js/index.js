function meuEscopo() {
    const horario = document.querySelector('.horario');
    const data = document.querySelector('.data')
    const img = document.querySelector('.img-horario');

    function criaData() {
        const data = new Date();
        return data.toLocaleDateString('pt-BR', {
            dateStyle: "long"
        });
    };

    function iniciaRelogio() {
        setInterval(async function () {
            const data = await pegarHora();
            horario.innerHTML = data;
            verificarHora(data);
        }, 1000);
    };

    function iniciaData() {
        setInterval(() => {
            data.innerHTML = criaData();
        }, 1000);
    };

    function verificarHora(hora) {

        let horaConvertida = Number(hora.slice(0, 2));

        if (horaConvertida >= 6 && horaConvertida < 18) {
            img.classList.remove('img-noite');
            img.classList.add('img-dia');
        }
        else {
            img.classList.remove('img-dia');
            img.classList.add('img-noite');
        };
    };

    async function pegarHora() {
        try {
            const response = await fetch('http://worldtimeapi.org/api/timezone/America/Sao_Paulo');
            const data = await response.json();
            const hora = data.datetime.slice(11, 19);
            return hora;
        } catch (error) {
            console.error('Erro ao consumir API:', error);
        }
    }

    iniciaRelogio();
    iniciaData();

}

meuEscopo();