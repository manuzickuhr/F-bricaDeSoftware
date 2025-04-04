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
    // Seleciona os elementos da página
    const loginBtn = document.getElementById("login-btn");  // Botão para abrir a modal
    const loginModal = document.getElementById("login-modal");  // Modal
    const closeModal = document.getElementById("close-modal");  // Botão para fechar a modal
    
    // Abre a modal quando o botão de login for clicado
    loginBtn.addEventListener("click", function(event) {
        event.preventDefault();  // Previne a ação padrão do link
        loginModal.style.display = "flex";  // Mostra a modal
    });

    // Fecha a modal quando o botão de fechar for clicado
    closeModal.addEventListener("click", function() {
        loginModal.style.display = "none";  // Esconde a modal
    });

    // Fecha a modal se o usuário clicar fora dela (na área escura)
    window.addEventListener("click", function(event) {
        if (event.target === loginModal) {
            loginModal.style.display = "none";  // Esconde a modal se clicado fora dela
        }
    });
});
