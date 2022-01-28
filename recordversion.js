// document.getElementById("capture").addEventListener("click", captureframes);
// document.getElementById("newnote").addEventListener("click", creatediv);
// document.getElementById("newnote2").addEventListener("click", creatediv2);
document.getElementById("start").addEventListener("click", start);
document.getElementById("start").addEventListener("click", fadeanimation);

var rednotes =[];
var bluenotes =[];

var capturedframes = [];
var capturedframes2 = [];
var notehit = [];

let fps = 60;
let frames = 0;
let seconds = 0;
let songlenght = 0;
let capture = 0;
let capture2 = 0;
let delayframes = 171;
let delayedframes = 0;
let currentnoteframe = 0;
let rednoteindex = 0;
let bluenoteindex = 0;
let range = 10;
let combocount = 0;
let combo = 0;


let songplaying = 0;

let notenumber = 0;
let bluenotenumber = 0;

let score = 0;
let keyisdown = 0;

function fadeanimation(){
    var elements = document.getElementsByClassName('input');
     for(var i = 0; i < elements.length; i++){
         elements[i].style.animationPlayState = "running";
    }
}

function start() {
    //speelt song af
    if (songplaying == 0) {
        var x = document.getElementById("song");
        x.play();
        x.volume = 0.2;
    }

    setInterval(function() {
        //rednoteindex bijhouden
        if (frames == (delayframes + rednotes[rednoteindex] + range + 1)) {
            rednoteindex++
            if (combo == 0){
                combocount = 0;
                document.getElementById("combo").style.opacity = "0";
            }
            combo = 0;
            

        }
        if (frames == (delayframes + bluenotes[bluenoteindex] + range + 1)) {
            bluenoteindex++
            if (combo == 0){
                combocount = 0;
                document.getElementById("combo").style.opacity = "0";
            }
            combo = 0;
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
    // if (meter.volume > 0.05) {
    //     //alert("het werkt");
    //     //captureframes();
    //     hit2();
    //     hitbar2on();

    // } else {
    //     hitbar2off();
    // }
}

//neemt de frame nummer wanneer de knop is geklikked
function captureframes() {
    capturedframes[capture] = frames - delayframes;
    capture++
}
function captureframes2() {
    capturedframes2[capture2] = frames - delayframes;
    capture2++
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
    document.getElementById("bluenote1").innerHTML="pink";
    document.getElementById("bluenote2").innerHTML="sick";
    document.getElementById("bluenote3").innerHTML="rich";
}

//detecteert of de z key is ingedrukt
window.onkeydown = function(event) {
    if (event.keyCode === 90) {
        captureframes();
        hit();
        hitbaron();
    }

    if (event.keyCode === 88) {
        captureframes2();
        hit2();
        hitbar2on();
    }
}

//detecteert of de z key is losgelaten
window.onkeyup = function(event) {
    if (event.keyCode === 90) {
        hitbaroff();
    }

    if (event.keyCode === 88) {
        hitbar2off();
    }
}







//checkt of de rednote geraakt is
function hit() {
    if (frames > (delayframes + rednotes[rednoteindex] - range) && frames < (delayframes + rednotes[rednoteindex] + range) && keyisdown == 0) {
        score++;
        combo = 1;
        if (keyisdown == 0) {
            keyisdown = 1;
        }
        if (combo == 1){
            combocount++;
            //  var elements = document.getElementsByClassName('combo');
            //  for(var i = 0; i < elements.length; i++){
            //      elements[i].style.backgroundColor = "white";
            // }
            document.getElementById("combo").style.opacity = "1";
        }
    

        document.getElementById("rednote" + (rednoteindex + 1).toString()).style.backgroundColor = "#1FFFAF";
    }
}
//checkt of de bluenote geraakt is
function hit2() {
    if (frames == (delayframes + bluenotes[bluenoteindex])) {
        score++;
        combo = 1;
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