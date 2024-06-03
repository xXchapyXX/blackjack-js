import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import _ from "underscore";

//prueba de git-github

let mazo        = [];
let ptsJugador  = 0
let ptsPC       = 0
let puntosJug   = document.querySelector('#puntosJug')
let puntosPC    = document.querySelector('#puntosPC')
const btnPedir  = document.querySelector('#btnPedir');
const divCartasJugador = document.querySelector ('#cartas-jugador');
const divCartasPC = document.querySelector ('#cartas-pc')
const btnPlantarse =document.querySelector ('#btnPlantarse')

const creaMazo=()=>{
    const simbolos = ['H','D','S','C']
    const especiales = ['J','K','Q','A']
    for(let simbolo of simbolos){
        for(let n=2; n<=10; n++){
            mazo.push(n+simbolo)
        }
    }
    for(let simbolo of simbolos){
        for(let especial of especiales){
            mazo.push(especial+simbolo)
        }
    }
    mazo=_.shuffle(mazo)
}

const pedirCarta = () => {
    let carta = mazo.pop ();
    if(mazo.length===0){
        throw 'NO HAY MAS CARTAS DISPONIBLES'
    }
    return carta;
}

//Extraer el valor de la carta

const valorCarta=(carta)=>{
    const espValor = {
        J:10,
        Q:10,
        K:10,
        A:11,
    }
    let valor = carta.substring(0,carta.length-1)
    if(isNaN(valor)){
      let puntos = Number(espValor[valor]);
      return puntos;
    }
    else{
      let puntos = Number(valor);
      return puntos;
    }
    
}
const turnoPC=(puntosMinimos)=>{
    do{
        const carta= pedirCarta();
        ptsPC=ptsPC + valorCarta (carta);
        const imgcarta = document.createElement ('img');
        imgcarta.classList.add('carta');
        imgcarta.src=`assets/cartas/${carta}.png`;
        divCartasPC.append(imgcarta);
        puntosPC.innerText=ptsPC
    }while(ptsPC<puntosMinimos && (puntosMinimos<=21))
    setTimeout(()=>{
        if (ptsPC===puntosMinimos){
            alert('EMPATE')
        }
        else if (puntosMinimos>21){
            alert('PC GANA')
        }
        else if (ptsPC > 21){
            alert('JUGADOR GANA')
        }
        else{
            alert('COMPUTADORA GANA')
        }
    }, 500);
};

//-----------EVENTOS-----------
creaMazo()
btnPedir.addEventListener('click',()=>{  
    const carta = pedirCarta();   
    ptsJugador= ptsJugador + valorCarta(carta) //suma los puntos del jugador con el valor de la carta
    puntosJug.innerText=ptsJugador; 
    const imgcarta = document.createElement ('img'); //crea un elemento de carta 
    imgcarta.src=`assets/cartas/${carta}.png`;
    imgcarta.classList.add('carta');
    divCartasJugador.append(imgcarta);
    if (ptsJugador>21){
        turnoPC(ptsJugador);
        btnPedir.disabled=true;
        btnPlantarse.disabled=true;
    }
    else if (ptsJugador===21){
        turnoPC(ptsJugador);
        btnPedir.disabled=true;
        btnPlantarse.disabled=true;
    }
    
}) 
btnPlantarse.addEventListener('click',()=> {
    btnPlantarse.disabled=true
    btnPedir.disabled=true
    turnoPC(ptsJugador)
} )

btnNuevo.addEventListener('click', ()=>{
    location.reload()
})








