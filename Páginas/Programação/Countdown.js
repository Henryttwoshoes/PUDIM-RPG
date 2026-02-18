// Variável de controle para quando o episódio está com dia marcado ou não.
const marcado = true


const Days = document.getElementById('days')
const Hours = document.getElementById('hours')
const Minutes = document.getElementById('minutes')
const Seconds = document.getElementById('seconds')
const mensagem = document.getElementById('mensagem')

const targetDate = new Date('Februray 22 2026 16:00:00').getTime() /* cria um objeto de data para o dia 15 de Agosto

    "new" cria um novo objeto, nesse caso da classe "Date"
*/
if (marcado){
function timer (){
    const currentDate = new Date().getTime()/* pega o timestamp atual em milissegundos */
    const distance = targetDate - currentDate

    const days = Math.floor(distance / 1000 / 60 / 60 / 24)
    const hours = Math.floor(distance / 1000 / 60 / 60) % 24
    /* Para achar o restante em horas, é preciso pegar o resto da divisão por 24 */
    const minutes = Math.floor(distance / 1000 / 60) % 60
    const seconds = Math.floor(distance / 1000) % 60

    Days.innerHTML = days
    Hours.innerHTML = hours
    Minutes.innerHTML = minutes
    Seconds.innerHTML = seconds

    if(distance < 0){
        Days.innerHTML = "0"
        Hours.innerHTML = "0"
        Minutes.innerHTML = "0"
        Seconds.innerHTML = "0"
        mensagem.innerHTML = "O EPISÓDIO VAI COMEÇAR!"
}
}
setInterval(timer, 100)
} else {
    mensagem.innerHTML = "A BUSCA PELO CRISTAL PERDIDO RETORNA EM JANEIRO DE 2026!"
    Days.innerHTML = "--"
    Hours.innerHTML = "--"
    Minutes.innerHTML = "--"
    Seconds.innerHTML = "--"
}