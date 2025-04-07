
document.querySelectorAll("table tr").forEach(tr => {
    const tds = tr.querySelectorAll("td");

    tds.forEach((td, index) => {
      // Ignora a primeira coluna (Horário)
      if (index === 0) return;

      // Evita adicionar se já tiver link
      if (td.querySelector("a")) return;

      // Cria o link com o símbolo "+"
      const link = document.createElement("a");
      link.href = "reservar.html";
      link.textContent = "+";
      link.style.cssText = `
        text-decoration: none;
        color: black;
        font-size: 10x;
        opacity: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      `;

      td.style.position = "relative";
      td.appendChild(link);
    });
  });


  function atualizarSemana(baseDate) {
    let diaSemana = baseDate.getDay();
    const novaData = new Date(baseDate);

    // Se for sábado (6) ou domingo (0), pula para a próxima segunda
    if (diaSemana === 6) {
      novaData.setDate(novaData.getDate() + 2);
      diaSemana = 1;
    } else if (diaSemana === 0) {
      novaData.setDate(novaData.getDate() + 1);
      diaSemana = 1;
    }

    const inicioSemana = new Date(novaData);
    inicioSemana.setDate(novaData.getDate() - (diaSemana - 1)); // segunda

    const fimSemana = new Date(inicioSemana);
    fimSemana.setDate(inicioSemana.getDate() + 4); // sexta

    const opcoes = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const texto = `Semana: ${inicioSemana.toLocaleDateString('pt-BR', opcoes)} a ${fimSemana.toLocaleDateString('pt-BR', opcoes)}`;

    document.getElementById('info-semana').textContent = texto;

    return inicioSemana;
  }

  // Variável global com a data base
  let dataBase = new Date();
  dataBase = atualizarSemana(dataBase); // mostra a semana correta ao iniciar

  // Botão anterior
  document.getElementById('semana-anterior').addEventListener('click', () => {
    dataBase.setDate(dataBase.getDate() - 7);
    atualizarSemana(dataBase);
  });

  // Botão próximo
  document.getElementById('semana-proximo').addEventListener('click', () => {
    dataBase.setDate(dataBase.getDate() + 7);
    atualizarSemana(dataBase);
  });
