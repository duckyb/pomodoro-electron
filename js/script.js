function rimuoviFigli(nodo) {
  while (nodo.childNodes.length > 0) {
    nodo.removeChild(nodo.firstChild);
  }
}

function suona() {
  switch (contaPomodori) {
    case 0:{
      console.log('case 0');
      timer = new Date(60000 * 5 + 1000);
      nodoCerchio0.classList.add('fill');
      break;
    }
    case 0.5:{
      console.log('case 0.5');
      timer = new Date(60000 * 25 + 1000);
      break;
    }
    case 1:{
      console.log('case 1');
      timer = new Date(60000 * 5 + 1000);
      nodoCerchio1.classList.add('fill');
      break;
    }
    case 1.5:{
      console.log('case 1.5');
      timer = new Date(60000 * 25 + 1000);
      break;
    }
    case 2:{
      console.log('case 2');
      timer = new Date(60000 * 5 + 1000);
      nodoCerchio2.classList.add('fill');
      break;
    }
    case 2.5:{
      console.log('case 2.5');
      timer = new Date(60000 * 25 + 1000);
      break;
    }
    case 3:{
      console.log('case 3');
      nodoCerchio3.classList.add('fill');
      timer = new Date(60000 * 30 + 1000);
      break;
    }
    default:{
      console.log('case 3.5');
      timer = new Date(60000 * 25 + 1000);
      contaPomodori = 0;
      nodoCerchio0.classList.remove('fill');
      nodoCerchio1.classList.remove('fill');
      nodoCerchio2.classList.remove('fill');
      nodoCerchio3.classList.remove('fill');
      aggiornaTimer();
      alarm.play();
      clearInterval(tick);
      tick = false;
      return;
    }
  }
  aggiornaTimer();
  contaPomodori+=.5;
  alarm.play();
  clearInterval(tick);
  tick = false;
}

function aggiornaTimer() {
  timer = new Date(timer - 1000);
  rimuoviFigli(nodoTimer);
  var secondi = String(timer.getSeconds());
  var minuti = String(timer.getMinutes());
  if (minuti.length != 1) {
    var nuovastringa = minuti;
  } else {
    var nuovastringa = '0' + minuti;
  }
  if (secondi.length == 1) {
    nuovastringa += ':0' + secondi;
  } else {
    nuovastringa += ':' + secondi;
  }
  var nuovoTestoTimer = document.createTextNode(nuovastringa);
  nodoTimer.appendChild(nuovoTestoTimer);
  if (timer.getTime() == 0) { // quando scade il tempo
    suona();
  }
}

function gestoreAvvia() {
  try {
    console.log(tick);
    if (!tick) {
      tick = setInterval(aggiornaTimer, VELOCITA);
    }
    alarm.pause();
    alarm.currentTime = 0;
  } catch (e) {
    alert('gestoreAvvia ' + e);
  }
}
function gestorePausa() {
  try {
    alarm.pause();
    alarm.currentTime = 0;
    clearInterval(tick);
    tick = false;
  } catch (e) {
    alert('gestorePausa ' + e);
  }
}

const VELOCITA = 1000;
var nodoInizia;
var nodoTimer;
var timer;
var tick;
var nodoAvvia;
var nodoPausa;
var contaPomodori;
var alarm;
var nodoCerchio0;
var nodoCerchio1;
var nodoCerchio2;
var nodoCerchio3;

function gestoreLoad() {
  try {
    nodoInizia = document.getElementById('inizia');
    nodoTimer = document.getElementById('timer');
    nodoAvvia = document.getElementById('avvia');
    nodoPausa = document.getElementById('pausa');
    nodoCerchio0 = document.getElementById('cerchio0');
    nodoCerchio1 = document.getElementById('cerchio1');
    nodoCerchio2 = document.getElementById('cerchio2');
    nodoCerchio3 = document.getElementById('cerchio3');
    nodoAvvia.onclick = gestoreAvvia;
    nodoPausa.onclick = gestorePausa;
    alarm = new Audio('audio/calm_tune.mp3');
    timer = new Date(25 * 60000 + 1000);
    contaPomodori = 0;
    aggiornaTimer(); // toglie subito un secondo
  } catch (e) {
    alert('gestoreLoad ' + e );
  }
}
window.onload = gestoreLoad;
