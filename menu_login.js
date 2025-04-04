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
    function collapseSubmenu() {
        const ativo = navMenu.querySelector(".submenu-ramo.ativo");
        if (ativo) {
            ativo.querySelector(".submenu").removeAttribute("style");
            ativo.classList.remove("ativo");
        }
    }
})();

// Lógica do dropdown do perfil
document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.getElementById("dropdown");
    const dropdownList = document.querySelector(".dropdown__list");

    if (dropdown && dropdownList) {
        dropdown.addEventListener("click", function () {
            dropdownList.classList.toggle("show-dropdown");
        });
    }
});
