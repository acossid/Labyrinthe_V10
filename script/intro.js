function intro(){
    var son1 = document.getElementById("mus1");
    son1.play();
    document.getElementById("intro").style.display="block";
    var showText = function (target, message, index, interval) {    
        if (index < message.length) { 
            $(target).append(message[index++]); 
            setTimeout(function () { showText(target, message, index, interval); }, interval); 
        } 
    }

    $(function (){ 
      document.getElementById("play").style.display="none";
      showText("#msg", "VOUS VOUS REVEILLEZ AU BEAU MILIEU DE LA NUIT. AUTOUR DE VOUS: DES MURS. IL FAUT SORTIR. VITE. ET VOUS N'AVEZ PLUS BEAUCOUP DE BATTERIE ...", 0, 50);
    });
    }


    


