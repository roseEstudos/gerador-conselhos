const botaoGerar = document.getElementById('btn-gerar')
const textoConselho = document.getElementById('texto-atividade')
const numeroConselho = document.getElementById('numero-conselho')
const divInfoIdConselho = document.getElementById('info-atividade')
const divConselho = document.getElementById('card-atividade')
const carregando = document.getElementById('loading')
const contadorElemento = document.getElementById('contador')
const botaoCopiar = document.getElementById('btn-copiar')

let contador = 0
let ultimoConselhoGerado

const ArrayConselho = []

async function buscarConselho(){
    divConselho.style.display = 'none'
    carregando.style.display = 'block'
   try{
    const respota = await fetch('https://api.adviceslip.com/advice')
    const dados = await respota.json()
    console.log(dados);

    textoConselho.textContent = dados.slip.advice
    divInfoIdConselho.style.display ='flex'
    numeroConselho.textContent = dados.slip.id

    if(ArrayConselho.includes(dados.slip.id)){
        textoConselho.textContent = 'Conselho repetido, tente gerar outro'
    }

    ArrayConselho.push(dados.slip.id)

    divConselho.classList.add('animate__animated', 'animate__backInUp')
    contador++
    contadorElemento.textContent = contador

    ultimoConselhoGerado = dados.slip.advice

    // setTimeout
    divConselho.style.display = 'block'
    carregando.style.display = 'none'
   } catch(erro){
    console.log('Ops, ocorreu um erro :x: ', erro);
   }
}

botaoGerar.addEventListener('click', buscarConselho)


async function copiarConselho(){
    try{
        await navigator.clipboard.writeText(ultimoConselhoGerado)

        botaoCopiar.textContent = '✓ Copiado!'
        botaoCopiar.classList.add('botaoCopiarClicado')

        setTimeout(() => {
            botaoCopiar.textContent = '📋 Copiar'
            botaoCopiar.classList.remove('botaoCopiarClicado')
        }, 2000);
    } catch(erro){
        console.log('Ops! Ocorreu um erro ao copiar para o ctrl V: ', erro);
    }
}
botaoCopiar.addEventListener('click', copiarConselho)