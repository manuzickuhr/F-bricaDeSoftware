
const $ = q => document.querySelector(q)


const reserva =(inicio, duracao_min, dia, lab) => {return {inicio: inicio, duracao: duracao_min, dia: dia, lab: lab }}
const tempo = (horas, minutos) => horas + minutos/60

const reservas = [
   reserva(tempo(9,00), 1*60, "seg", "A04")
  ,reserva(tempo(8,00), 60, "seg", "D05")
  ,reserva(tempo(9,30), 90, "seg", "D05")
  ,reserva(tempo(9,30), 90, "ter", "D05")
  ,reserva(tempo(11,30), 30, "qui", "D06")
]

function inserir_reserva(reserva) {
  
  const inicio = 8
  const fim = 12

  const dia = reserva.dia
  const lab = reserva.lab
  const container = $(`.reserva-container .${dia} .${lab}`)


  const minute_measure = container.offsetHeight / ((fim-inicio) * 60)
  const offset = (reserva.inicio - inicio)*60
  const size = reserva.duracao
  console.log(container.offsetHeight)
  const html = `
    <div class="reserva" style="grid-row: ${offset + 1 + 1} / span ${size};">
    </div
  `

    container.innerHTML += html


}

for (let rev of reservas) {
  inserir_reserva(rev)
}
