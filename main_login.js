(() => {
    const abrirNav = document.querySelector(".menu-aberto"),
        fecharNav = document.querySelector(".menu-fechar"),
        navMenu = document.querySelector(".menu-container"),
        mediaSize = 992;
    
    abrirNav.addEventListener("click", ativarMenu);
    fecharNav.addEventListener("click", ativarMenu);
    
    function ativarMenu() {
        navMenu.classList.toggle("abrir");
    }

    navMenu.addEventListener("click", (event) => {
        if (event.target.hasAttribute("data-toggle") && window.innerWidth <= mediaSize) {
            event.preventDefault();
            const submenuRamo = event.target.parentElement;

            if (submenuRamo.classList.contains("ativo")) {
                collapseSubmenu();
            } else {
                // Fecha qualquer submenu aberto antes de abrir o novo
                const submenuAtivo = navMenu.querySelector(".submenu-ramo.ativo");
                if (submenuAtivo) {
                    collapseSubmenu(submenuAtivo);
                }
                submenuRamo.classList.add("ativo");
                const submenu = submenuRamo.querySelector(".submenu");
                submenu.style.maxHeight = submenu.scrollHeight + "px";
            }
        }
    });

    // Função para colapsar o submenu
    function collapseSubmenu(){
        navMenu.querySelector(".submenu-ramo.ativo .submenu").removeAttribute("style")
        navMenu.querySelector(".submenu-ramo.ativo").classList.remove("ativo")
    }
})();

let dataAtual = new Date(); // Define a data inicial

function formatarData(data) {
    return data.toLocaleDateString("pt-BR", { 
        weekday: 'short',  // Exibe o nome abreviado do dia (seg., ter., qua.)
        day: '2-digit',    // Exibe o dia com 2 dígitos
        month: '2-digit',  // Exibe o mês com 2 dígitos
        year: 'numeric'    // Exibe o ano completo
    });
}


//div Controle-data

function atualizarData() {
    const diaAtualElement = document.getElementById("dia-atual");
    if (diaAtualElement) {
        diaAtualElement.textContent = formatarData(dataAtual);
    }
}

document.getElementById("dia-anterior").addEventListener("click", function() {
    dataAtual.setDate(dataAtual.getDate() - 1); // Retrocede um dia
    atualizarData();
});

document.getElementById("dia-proximo").addEventListener("click", function() {
    dataAtual.setDate(dataAtual.getDate() + 1); // Avança um dia
    atualizarData();
});

// Inicializa a exibição da data ao carregar a página
atualizarData();

//Para os turnos
document.addEventListener("DOMContentLoaded", function () {
    const reservaBody = document.getElementById("reserva-body");
    const filtros = {
        manha: document.getElementById("manha"),
        tarde: document.getElementById("tarde"),
        noite: document.getElementById("noite"),
    };

    const horarios = {
        manha: [8, 9, 10, 11, 12],
        tarde: [13, 14, 15, 16, 17],
        noite: [18, 19, 20, 21, 22]
    };

    const laboratorios = ["A04", "A05", "D04", "D05", "D06", "D07"];

    // Define o turno atual com base no horário do sistema
    function definirTurnoAtual() {
        const horaAtual = new Date().getHours();
        filtros.manha.checked = horaAtual >= 7 && horaAtual < 12;
        filtros.tarde.checked = horaAtual >= 12 && horaAtual < 18;
        filtros.noite.checked = horaAtual >= 18;
    }

    // Gera a tabela de reservas sem as linhas de 5 em 5 minutos
    function gerarTabela() {
        reservaBody.innerHTML = ""; // Limpa a tabela antes de recriá-la

        let horariosSelecionados = [];
        if (filtros.manha.checked) horariosSelecionados.push(...horarios.manha);
        if (filtros.tarde.checked) horariosSelecionados.push(...horarios.tarde);
        if (filtros.noite.checked) horariosSelecionados.push(...horarios.noite);

        const horaAtual = new Date().getHours(); // Obtém o horário atual
        horariosSelecionados.forEach(hora => {
            const row = document.createElement("tr");

            // Cria célula do horário
            const horarioCell = document.createElement("td");
            horarioCell.textContent = `${hora}:00h`;
            horarioCell.classList.add("horario-principal");

            // Adiciona a classe "horario-atual" se for o horário atual
            if (hora === horaAtual) {
                horarioCell.classList.add("horario-atual");
            }

            row.appendChild(horarioCell);

            // Preenche os laboratórios na linha
            laboratorios.forEach(() => {
                const cell = document.createElement("td");
                row.appendChild(cell);
            });

            // Adiciona a linha na tabela
            reservaBody.appendChild(row);
        });
    }

    // Atualiza a tabela quando os filtros mudam
    document.querySelectorAll(".filtros input").forEach(input => {
        input.addEventListener("change", gerarTabela);
    });

    // Define os filtros de acordo com o turno atual e gera a tabela
    definirTurnoAtual();
    gerarTabela();
});

document.addEventListener("DOMContentLoaded", function() {
    // Lógica para o dropdown
    const dropdown = document.getElementById("dropdown");
    const dropdownList = document.querySelector(".dropdown__list");

    // Ao clicar no dropdown, alterna a visibilidade do menu
    dropdown.addEventListener("click", function() {
        dropdownList.classList.toggle("show-dropdown");
    });
});

/*

// Seleciona os elementos necessários
const modal = document.getElementById('modalReserva');
const btnConfirmar = document.getElementById('confirmarReserva');
const closeModal = document.querySelector('.close');
const horarioModal = document.getElementById('horario-modal');
const laboratorioModal = document.getElementById('laboratorio-modal');
const reservaBody = document.getElementById('reserva-body');

// Função para abrir o modal
function abrirModal(celula) {
    // Exibe o modal
    modal.style.display = "block";

    // Preenche os detalhes do modal com as informações
    const horario = celula.textContent.trim();
    const laboratorio = celula.getAttribute('data-laboratorio') || 'Laboratório Não Especificado';
    
    // Preenche o modal
    horarioModal.textContent = horario;
    laboratorioModal.textContent = laboratorio;

    // Armazena a célula onde o usuário está interagindo
    celula.focus();
}

// Função para fechar o modal
function fecharModal() {
    // Esconde o modal
    modal.style.display = "none";
}

// Adiciona evento de clique no botão "Confirmar"
btnConfirmar.addEventListener('click', function() {
    // Obtém a célula ativa (que foi clicada)
    const celulaAtiva = document.querySelector('.celula-ativa');
    if (celulaAtiva) {
        const horarioInicio = document.getElementById('horario-inicio').value;
        const horarioTermino = document.getElementById('horario-termino').value;

        // Atualiza o conteúdo da célula com os horários informados
        if (horarioInicio && horarioTermino) {
            celulaAtiva.textContent = `${horarioInicio} - ${horarioTermino}`;
        }
    }
    fecharModal();
});

// Adiciona evento de clique no "X" para fechar o modal
closeModal.addEventListener('click', function() {
    fecharModal();
});

// Adiciona evento de clique nas células da tabela para abrir o modal
reservaBody.addEventListener('click', function(event) {
    const elementoClicado = event.target;

    // Verifica se o clique foi em uma célula vazia (não possui texto)
    if (elementoClicado.tagName === 'TD' && elementoClicado.textContent.trim() === '') {
        // Marca a célula como ativa para edição
        const celulaAnterior = document.querySelector('.celula-ativa');
        if (celulaAnterior) {
            celulaAnterior.classList.remove('celula-ativa');
        }
        elementoClicado.classList.add('celula-ativa');

        // Abre o modal para a célula clicada
        abrirModal(elementoClicado);
    }
});
*/
