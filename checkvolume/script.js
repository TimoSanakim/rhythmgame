let fps =60;

   function start() {
    setInterval(function(){
        console.log(meter.volume);
        if(meter.volume > 0.1){
            alert("werkt");
        }
      }, 1000/fps);
  }