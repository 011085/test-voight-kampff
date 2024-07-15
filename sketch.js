//variables en uso de escena
let capture;
let img;
let eye;
let slider;
let fuente;

//arreglo para la clase
let lista = [];

//sound
let ruidito;
let r;
//maquina de estados
let Escena = 0;

function preload() {
  img = loadImage("img/fondofx.gif");
  eye = loadImage("img/eye.gif");
  fuente = loadFont("font/courier.ttf");
}

function setup() {
  createCanvas(450, 450);

  
  //recorre la clase
  for (let i = 0; i < 250; i++) {
    lista[i] = new Luvia();
  }

  //sonido hiss
  ruidito = new p5.Noise('pink');
  ruidito.amp(0);
  ruidito.start();

  //cámara
  capture = createCapture(VIDEO);
  capture.hide();

  //botones
  let button = createButton(">");
  button.position(300, height / 2 + 140);
  button.mousePressed(avanza);

  let button1 = createButton("<");
  button1.position(125, height / 2 + 140);
  button1.mousePressed(retrocede);

  //slider
  slider = createSlider(0, 0.01, 0, 0.01);
  slider.position(200, 350);
  slider.size(50);
}

function draw() {
  
//variable de amplitud de noise y control slider
  r = slider.value();
  ruidito.amp(r);
  
  //maquina de estados
  //escena 0

  if (Escena == 0) {
    background(0);
    noStroke();
    tint(0, 255, 0);
    fill(0, 255, 0);
    textFont(fuente);
    textAlign(CENTER);
    textSize(30);
    text("Welcome to", 225, 125);
    text("the Test Voight-Kampff", 225, 175);

    image(eye, width / 2 - 80, height / 2 - 30, 150, 150);
  }

  //escena 1
  else if (Escena == 1) {
    background(img);
    tint(0, 255, 0, 15);
    textSize(10);
    image(capture, width / 2 - 110, height / 2 - 110, 220, 220);
    noFill();
    // stroke(0, 255, 0);
    rect(width / 2 - 50, height / 2 - 50, 100, 120);
    fill(0, 255, 0);
    textSize(20);
    textAlign(CENTER);
    text("Acerca tu cara a la cámara", 225, 60);
    text("vamos a comenzar", 225, 80);
    textSize(12);
    text("Estas preguntas están diseñadas", 225, 410);
    text("para medir las respuestas emocionales", 225, 425);
    text("y así determinar si son humanos.", 225, 440);
  }

  //escena 2
  else if (Escena == 2) {
    background(img);
    image(capture, width / 2 - 110, height / 2 - 110, 220, 220);
    noFill();
    rect(width / 2 - 50, height / 2 - 50, 100, 120);
    fill(0, 255, 0);
    textAlign(CENTER);
    textSize(16);
    text("¿Tienes sueños que te parecen reales?", 225, 60);
  }

  //escena 3
  else if (Escena == 3) {
    background(img);
    image(capture, width / 2 - 110, height / 2 - 110, 220, 220);
    noFill();
    rect(width / 2 - 50, height / 2 - 50, 100, 120);
    fill(0, 255, 0);
    textSize(16);
    textAlign(CENTER);
    text("Estás en un jardín observando a una mariposa.", 225, 40);
    text("La mariposa se posa sobre tu mano.", 225, 60);
    text("¿Qué sientes en ese momento?", 225, 80);
  }

  //escena 4
  else if (Escena == 4) {
    background(img);
    image(capture, width / 2 - 110, height / 2 - 110, 220, 220);
    noFill();
    rect(width / 2 - 50, height / 2 - 50, 100, 120);
    fill(0, 255, 0);
    textSize(13);
    textAlign(CENTER);
    text("Caminas por una calle y ves a alguien pidiendo limosna.", 225, 40);
    text("Tiene una cicatriz en la cara y te mira fijamente.", 225, 60);
    text("¿Qué piensas sobre esa persona?", 225, 80);
  }

  //escena 5
  else if (Escena == 5) {
    background(img);
    image(capture, width / 2 - 110, height / 2 - 110, 220, 220);
    noFill();
    rect(width / 2 - 50, height / 2 - 50, 100, 120);
    fill(0, 255, 0);
    textSize(14);
    textAlign(CENTER);
    text("Estás en un ascensor lleno de gente.", 225, 40);
    text("De pronto, el ascensor se detiene abruptamente", 225, 60);
    text("y las luces se apagan. ¿Cómo reaccionas?", 225, 80);
  }

  //escena 6 ---usa la clase
  else if (Escena == 6) {
    background(img);
    for (let i = 0; i < 100; i++) {
      lista[i].mover();
      lista[i].mostrar();
    }
  }
}

//funciones de avanzar y retroceder

function avanza() {
  if (mouseIsPressed) {
    Escena++;
  }

  if (Escena > 6) {
    background(0);
    fill(0, 255, 0);
    noStroke();
    textSize(30);
    text("thanks for your time", 225, 200);
    textSize(20);
    text("you are human", 225, 225);
    text("Number = 00012929309", 225, 250);
  }

  print("Estado de la escena = " + Escena);
}

function retrocede() {
  if (mouseIsPressed) {
    Escena--;
  }
  print("Estado de la escena = " + Escena);
}

//Luvia para la ante-última escena

class Luvia {
  constructor() {
    this.xpos = random(width);
    this.ypos = random(-height);
    this.colo = 255;
    this.velo = 0;
    this.acelera = random(0.01, 0.06);
  }

  mostrar() {
    
    noFill();
    stroke(0, this.colo, 0, 50);
    strokeWeight(3);
    point(this.xpos, this.ypos);
  }

  mover() {
    this.velo += this.acelera;
    this.ypos += this.velo;

    if (this.ypos > height) {
      this.ypos = 0;
      this.acelera = 0;
      this.xpos = random(width);
    }
  }
}
