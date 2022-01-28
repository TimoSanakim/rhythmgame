export function fadeanimation(){
    var elements = document.getElementsByClassName('input');
     for(var i = 0; i < elements.length; i++){
         elements[i].style.animationPlayState = "running";
    }
    var elements2 = document.getElementsByClassName('button');
    for(var i = 0; i < elements2.length; i++){
        elements2[i].style.animationPlayState = "running";
   }
}