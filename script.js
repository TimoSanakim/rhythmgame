import {rednotes1} from './songnotes.js';
import {bluenotes1} from './songnotes.js';
import {lyrics1} from './songnotes.js'

import {rednotes2} from './songnotes.js';
import {bluenotes2} from './songnotes.js';
import {lyrics2} from './songnotes.js'

import {rednotes3} from './songnotes.js';
import {bluenotes3} from './songnotes.js';
import {lyrics3} from './songnotes.js'

import {fadeanimation} from './animations.js'


// document.getElementById("capture").addEventListener("click", captureframes);
// document.getElementById("newnote").addEventListener("click", creatediv);
// document.getElementById("newnote2").addEventListener("click", creatediv2);
document.getElementById("start").addEventListener("click", start);
document.getElementById("start2").addEventListener("click", song2);
document.getElementById("start3").addEventListener("click", song3);
document.getElementById("start").addEventListener("click", fadeanimation);


var capturedframes = [];
var notehit = [];

var rednotes = rednotes1;
var bluenotes = bluenotes1;
var lyrics = lyrics1;

let fps = 60;
let frames = 0;
let seconds = 0;
let songlenght = 0;
let capture = 0;
let delayframes = 171;
let delayedframes = 0;
let currentnoteframe = 0;
let rednoteindex = 0;
let bluenoteindex = 0;
let range = 6;
let combocount = 0;
let combo = 0;
let song = 1;



let songplaying = 0;

let notenumber = 0;
let bluenotenumber = 0;

let score = 0;
let bonus = 1;
let keyisdown = 0;

function song2(){
    song=2;
    start();
    fadeanimation();
    rednotes = rednotes2;
    bluenotes = bluenotes2;
    lyrics = lyrics2;
}

function song3(){
    song=3;
    start();
    fadeanimation();
    rednotes = rednotes3
    bluenotes = bluenotes3
    lyrics = lyrics3;
}


function combobonus(){
    if (combocount>10){
        bonus = 2;
        var elements = document.getElementsByClassName('ocean');
        for(var i = 0; i < elements.length; i++){
            elements[i].style.opacity = "1";
       }
    }
    if (combocount>20){
        bonus = 3;
        var elements = document.getElementsByClassName('wave');
        for(var i = 0; i < elements.length; i++){
            elements[i].style.animationDuration = "3s";
        }
    }
    if (combocount>30){
        bonus = 4;
        var elements = document.getElementsByClassName('wave');
        for(var i = 0; i < elements.length; i++){
            elements[i].style.animationDuration = "2s";
        }
    }
    if (combocount>50){
        bonus = 5;
        var elements = document.getElementsByClassName('wave');
        for(var i = 0; i < elements.length; i++){
            elements[i].style.animationDuration = "1s";
        }
    }
}

function start() {
    
    //speelt song af
    if (songplaying == 0 && song ==1) {
        var x = document.getElementById("song"+(song).toString());
        x.play();
        x.volume = 0.2;
    }
    if (songplaying == 0 && song ==2) {
        var x = document.getElementById("song2");
        x.play();
        x.volume = 0.2;
    }
    if (songplaying == 0 && song ==3) {
        var x = document.getElementById("song3");
        x.play();
        x.volume = 0.2;
    }

    setInterval(function() {
        combobonus();
        //rednoteindex bijhouden
    if (frames == (delayframes + rednotes[rednoteindex] + range + 1)) {
        rednoteindex++
        if (combo == 0){
            combocount = 0;
            var elements = document.getElementsByClassName('ocean');
            for(var i = 0; i < elements.length; i++){
            elements[i].style.opacity = "0";
            }
            var elements = document.getElementsByClassName('wave');
            for(var i = 0; i < elements.length; i++){
            elements[i].style.animationDuration = "4s";
            }
            document.getElementById("combo").style.opacity = "0";
        }
        combo = 0;
        bonus = 1;
    }
    if (frames == (delayframes + bluenotes[bluenoteindex] + range + 1)) {
        bluenoteindex++
        if (combo == 0){
            combocount = 0;
            document.getElementById("combo").style.opacity = "0";
        }
        combo = 0;
        bonus = 1;
}

        micvolume();

        frames++;
        delayedframes = frames + delayframes;
        seconds = frames / fps;

        //debuginfo();

        //score display
        document.getElementById("scoredisplay").innerHTML = score;
        document.getElementById("combo").innerHTML = combocount;

            if (rednotes[notenumber] == frames) {
                creatediv();
    
            }
            if (bluenotes[bluenotenumber] == frames) {
                creatediv2();
    
            }           
        



    }, 1000 / fps);
}

function micvolume() {
    //console.log(meter.volume);
    if (meter.volume > 0.05) {
        //alert("het werkt");
        //captureframes();
        hit2();
        hitbar2on();

    } else {
        hitbar2off();
    }
}

//neemt de frame nummer wanneer de knop is geklikked
function captureframes() {
    capturedframes[capture] = frames - delayframes;
    capture++
}

//displayed informatie voor debugging
function debuginfo() {
    document.getElementById("frames").innerHTML = "frames " + frames;
    document.getElementById("seconds").innerHTML = "seconds " + Math.floor(seconds);
    document.getElementById("score").innerHTML = "score " + score;
    document.getElementById("redi").innerHTML = "red i " + rednoteindex;
    document.getElementById("bluei").innerHTML = "blue i " + bluenoteindex;
    document.getElementById("notenumber").innerHTML = "notenumber " + notenumber;
    document.getElementById("bluenotenumber").innerHTML = "bluenotenumber " + bluenotenumber;
    document.getElementById("micvolume").innerHTML = "micvolume " + meter.volume;
    document.getElementById("combocount").innerHTML = "combocount " + combocount;
}


//creeert een nieuwe rednote 
function creatediv() {
    currentnoteframe = rednotes[notenumber];
    notenumber++;
    let div = document.createElement('div');
    div.className = 'rednote';
    div.id = 'rednote' + notenumber;
    document.getElementById("notecontainer").appendChild(div)

}
//creeert een nieuwe bluenote 
function creatediv2() {
    currentnoteframe = bluenotes[bluenotenumber];
    bluenotenumber++;
    let div = document.createElement('div');
    div.className = 'bluenote';
    div.id = 'bluenote' + bluenotenumber;
    
    document.getElementById("notecontainer").appendChild(div);
        document.getElementById("bluenote"+(bluenotenumber).toString()).innerHTML= lyrics[bluenotenumber-1];
}

//detecteert of de z key is ingedrukt
window.onkeydown = function(event) {
    if (event.keyCode === 90) {
        captureframes();
        hit();
        hitbaron();
    }
}

//detecteert of de z key is losgelaten
window.onkeyup = function(event) {
    if (event.keyCode === 90) {
        hitbaroff();
    }

}

function comboanimation() {
    var element = document.getElementById("combo");
            element.classList.remove("combo");
            void element.offsetWidth;
            element.classList.add("combo");
}

//checkt of de rednote geraakt is
function hit() {
    if (frames > (delayframes + rednotes[rednoteindex] - range) && frames < (delayframes + rednotes[rednoteindex] + range) && keyisdown == 0) {
        score+=bonus;
        combo = 1;
        comboanimation();       
 

        if (keyisdown == 0) {
            keyisdown = 1;
        }
        if (combo == 1){
            combocount++;
            document.getElementById("combo").style.opacity = "1";
        }
        document.getElementById("rednote" + (rednoteindex + 1).toString()).style.backgroundColor = "#1FFFAF";
    }
}
//checkt of de bluenote geraakt is
function hit2() {
        if (frames == (delayframes + bluenotes[bluenoteindex] +5)) {
            score+=bonus;
            combo = 1;
            comboanimation();
            if (combo == 1){
                combocount++;
                //  var elements = document.getElementsByClassName('combo');
                //  for(var i = 0; i < elements.length; i++){
                //      elements[i].style.backgroundColor = "white";
                // }
                document.getElementById("combo").style.opacity = "1";
            }
            document.getElementById("bluenote" + (bluenoteindex + 1).toString()).style.backgroundColor = "#1FFFAF";
        }
}

function hitbaron() {
    document.getElementById("hitbar").style.backgroundColor = "#1FFFAF";
    document.getElementById("hitbar").style.boxShadow = "0px 0px 40px 5px #1FFFAF";
}

function hitbaroff() {
    document.getElementById("hitbar").style.backgroundColor = "white";
    document.getElementById("hitbar").style.boxShadow = "none";
    keyisdown = 0;
}

function hitbar2on() {
    document.getElementById("hitbar2").style.backgroundColor = "#1FFFAF";
    document.getElementById("hitbar2").style.boxShadow = "0px 0px 40px 5px #1FFFAF";
}

function hitbar2off() {
    document.getElementById("hitbar2").style.backgroundColor = "white";
    document.getElementById("hitbar2").style.boxShadow = "none";
}