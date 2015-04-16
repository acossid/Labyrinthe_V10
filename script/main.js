var son2 = document.getElementById("mus2");
son2.play();

var nbNiveau = 7; // Choisir nombre de niveau 
var niveau = 0; // Niveau actuel (au début niveau 0)


nouveauNiveau(niveau); // Fonction qui lance notre jeu


// -----------------------------------------//
//CHRONOMETRE
var seconde = 0;    
temps = setInterval('ajoutseconde()',1000);  
function ajoutseconde() 
{
    seconde=seconde+1;
    return seconde; 
}

// -----------------------------------------//

function nouveauNiveau (niveau)
{
    musiquePorte();
    if (niveau==nbNiveau) // J'arrete le jeu quand j'ai atteint le niveau défini
    {
        finGagne(seconde); 
    }
    else
    {
        document.getElementById("level").innerHTML = "NIVEAU "+(niveau+1); // Affiche niveau
        var cle = 0; // 0 = pas la clé, 1 = la clé
        var piles = 8; // Batterie initiale
        var zoom = 1; // Taille de la lampe initiale
        for(var i=0;i<piles;i++){
            document.getElementById(i+"b").style.visibility="visible"; // Affiche les piles
        }
        var nivSuivant = 0; // 0 = ni clé, ni sortie, 1 = clé , 2 = sortie, 3= clé et sortie
        var precedentPorte = 0;
        var compteurDeplacement = 0; //Deplacement du perso
        if (niveau  <4) // Afin de limiter la taille qui grandit du tableau
        {
            var n = niveau*6+13; // Taille du tableau
        }
        else
        {
            var n = 31; // Taille du tableau
        }
        var posPersoX; // Position du personage en x
        var posPersoY; // Position du personage en y

        var tab = LabyrintheAleatoire(n);
        tab = ObjetsAleatoires(n, tab, niveau);
        // Récupere le tableau de variable correspondant au labyrinthe aléatoire et aux objets 

        divLaby = document.getElementById("labyrinthe"); //Recupere la div html ou est le labyrinthe
        img = document.createElement("img"); // Créé <img>
        img.setAttribute("id", "img"); // Met un ID a img
        img.setAttribute("src", "./style/images/lumiere8.png"); // Src de la lumiere
        divLaby.appendChild(img); // Met le tableau dans la div html divLaby
        var marginL = parseInt(-784-niveau*36); // Place de la lumiere selon le niveau
        var marginT = parseInt(-1050-niveau*61.5); // Place de la lumiere selon le niveau
        img.style.marginTop= marginT + "px"; // Place de la lumiere selon le niveau
        img.style.marginLeft= marginL + "px"; // Place de la lumiere selon le niveau
        if (niveau>3) // Si niveau supérieur à 3, labyrinthe ne grandit plus donc place ne change plus
        {
            img.style.marginTop= "-1234.5px";
            img.style.marginLeft="-892px";
        }
        for (var i=0; i<n; i++)
        {
            for(var j=0;j<n;j++)
            {
                if (tab[i][j]==5) 
                {
                    posPersoX = i;
                    posPersoY = j;
                    // Récupère la première position du personage 
                }
            }
        }
        
        document.addEventListener("keydown", function(touche)  //detecte les touches clavier et déplace le personnage
        { 
            if (touche.keyCode == 40) // DOWN
            {
                if (posPersoX != -1 && posPersoY != -1) // Afin que le personage des niveaux différents ne réapparaissent pas car variables locales
                {
                    if (tab[posPersoX+1][posPersoY]!=1)
                    {
                        var son6 = document.getElementById("musPas"); // Lance le son du pas
                        son6.play();
                        var marginT = parseInt(img.style.marginTop); // Deplace la lumiere en meme tant que le personage
                        marginT = marginT+12;
                        img.style.marginTop = marginT +"px";
                        piles = reductionLum(piles); // Reduction de la lumiere avec le nombre de déplacement
                    }
                    if (tab[posPersoX+1][posPersoY]==2) // Si je passe sur la clé
                    {
                        nivSuivant = nivSuivant+1; // Je dis que je suis passée sur la clé
                        musiqueCle();
                    }
                    if (tab[posPersoX+1][posPersoY]==3) // Si je passe sur une pile
                    {
                        piles = augmentationPiles(piles);
                    }
                    down();
                    if (nivSuivant == 3) // Si j'ai la clé et je suis sur la porte
                    {
                       prochainNiveau() ;
                    }
                }
            }
            
            else if (touche.keyCode == 38) // UP _ Same que Down mais coordonnées différentes
            {
                if (posPersoX != -1 && posPersoY != -1)
                {
                    if (tab[posPersoX-1][posPersoY]!=1)
                    {
                        var son6 = document.getElementById("musPas");
                        son6.play();
                        var marginT = parseInt(img.style.marginTop);
                        marginT = marginT-12;
                        img.style.marginTop = marginT +"px";
                        piles = reductionLum(piles);
                    }
                    if (tab[posPersoX-1][posPersoY]==2)
                    {
                        nivSuivant = nivSuivant+1;
                        musiqueCle();
                    }
                    if (tab[posPersoX-1][posPersoY]==3)
                    {
                        piles = augmentationPiles(piles);
                    }
                    up ();
                    if (nivSuivant == 3)
                    {
                        prochainNiveau();
                    }
                }
            }
            
            else if (touche.keyCode == 39) // RIGHT _ Same que Up mais coordonnées différentes
              {
                  if (posPersoX != -1 && posPersoY != -1)
                {
                    if (tab[posPersoX][posPersoY+1]!=1)
                    {
                        var son6 = document.getElementById("musPas");
                        son6.play();
                        var marginL = parseInt(img.style.marginLeft);
                        marginL = marginL+12;
                        img.style.marginLeft = marginL +"px";
                        piles = reductionLum(piles);
                    }
                    if (tab[posPersoX][posPersoY+1]==2)
                    {
                        nivSuivant = nivSuivant+1;
                        musiqueCle();
                    }
                    if (tab[posPersoX][posPersoY+1]==3)
                    {
                        piles = augmentationPiles(piles);
                    }
                    right();
                    if (nivSuivant == 3)
                    {
                        prochainNiveau();
                    }
                }
            }
            
            else if (touche.keyCode == 37) // LEFT _ Same que Up mais coordonnées différentes
            {
                if (posPersoX != -1 && posPersoY != -1)
                {
                    if (tab[posPersoX][posPersoY-1]!=1)
                    {
                        var son6 = document.getElementById("musPas");
                        son6.play();
                        var marginL = parseInt(img.style.marginLeft);
                        marginL = marginL-12;
                        img.style.marginLeft = marginL +"px";
                        piles = reductionLum(piles);
                    }
                    if (tab[posPersoX][posPersoY-1]==2)
                    {
                        nivSuivant = nivSuivant+1;
                        musiqueCle();
                    }
                    if (tab[posPersoX][posPersoY-1]==3)
                    {
                        piles = augmentationPiles(piles);
                    }
                    left();
                    if (nivSuivant == 3)
                    {
                        prochainNiveau();
                    }
                }
            }
        }, false); 
    }
    
    
    function prochainNiveau() // Initialisation de certaines choses avant de passer au prochain niveau
    {
        tab[posPersoX][posPersoY]=0; // Je remet la case en tant que chemin (evite erreurs avec niveaux suivants)
        actualisationClasses(tab,posPersoX,posPersoY); 
        nivSuivant = 0; // Variable qui determine si je peux passer au niveau suivant
        piles=0;
        niveau = niveau+1; // J'augmente de niveau
        posPersoX = 1; // (evite erreurs avec niveaux suivants)
        posPersoY = -1; // (evite erreurs avec niveaux suivants)
        nouveauNiveau(niveau); // Je relance le jeu avec un autre niveau
    }
    
    
    function down ()
    {
        if (tab[posPersoX+1][posPersoY]==4) // La case ou je me rend est la porte
        {
            if (nivSuivant != 0) // Si j'ai déjà la clé
                {
                    nivSuivant = nivSuivant+2; // J'enregistre le fait qu'on soit passé sur la porte
                }
                else // Sinon j'ai pas la clé
                {
                precedentPorte = 1; // Je dis que je viens de passer sur la porte
                posPersoX = posPersoX+1; // Je remplace la position sur X de mon personnage par la suivante
                tab[posPersoX][posPersoY]=5; // Je met à ma nouvelle case la valeur 5
                tab[posPersoX-1][posPersoY]=0; // Et je met à l'ancienne la valeur 0 (= chemin)
                actualisationClasses(tab,posPersoX,posPersoY); // Je met à jour mes classes en fonction des nouvelles valeurs
                actualisationClasses(tab,posPersoX-1,posPersoY);
            }
        }
        else if(tab[posPersoX+1][posPersoY] != 1 && tab[posPersoX+1][posPersoY] != 4) // Sinon autre que mur ou porte
        {
            posPersoX = posPersoX+1;
            tab[posPersoX][posPersoY]=5;
            if (precedentPorte == 1) // Si je venais tout juste de passer sur la porte
            {
                tab[posPersoX-1][posPersoY]=4; // Je remet la case d'ou je viens comme étant la porte
            }
            else
            {
                tab[posPersoX-1][posPersoY]=0; // Je remet la case d'ou je viens comme etant un chemin 
            }
            actualisationClasses(tab,posPersoX,posPersoY);
            actualisationClasses(tab,posPersoX-1,posPersoY);
            precedentPorte = 0; // Je remet à 0 la variable qui m'indique si je viens de passer sur la porte
        }
    }
    
    function up ()
    {
        if (tab[posPersoX-1][posPersoY]==4)
        {
            if (nivSuivant != 0)
            {
                nivSuivant = nivSuivant+2;
            }
            else
            {
                precedentPorte = 1; 
                posPersoX = posPersoX-1;
                tab[posPersoX][posPersoY]=5;
                tab[posPersoX+1][posPersoY]=0;
                actualisationClasses(tab,posPersoX,posPersoY);
                actualisationClasses(tab,posPersoX+1,posPersoY);
            }
        }
        else if(tab[posPersoX-1][posPersoY] != 1 && tab[posPersoX-1][posPersoY] != 4)
        {
            posPersoX = posPersoX-1;
            tab[posPersoX][posPersoY]=5;
            if (precedentPorte == 1)
            {
                tab[posPersoX+1][posPersoY]=4;
            }
            else
            {
                tab[posPersoX+1][posPersoY]=0;
            }
            actualisationClasses(tab,posPersoX,posPersoY);
            actualisationClasses(tab,posPersoX+1,posPersoY);
            precedentPorte = 0;
        }
    }
    
    function right ()
    {
        if (tab[posPersoX][posPersoY+1]==4)
        {
            if (nivSuivant != 0)
            {
                nivSuivant = nivSuivant+2;
            }
            else
            {
                precedentPorte = 1; 
                posPersoY = posPersoY+1;
                tab[posPersoX][posPersoY]=5;
                tab[posPersoX][posPersoY-1]=0;
                actualisationClasses(tab,posPersoX,posPersoY);
                actualisationClasses(tab,posPersoX,posPersoY-1);
            }
        }
        else if(tab[posPersoX][posPersoY+1] != 1 && tab[posPersoX][posPersoY+1] != 4)
        {
            posPersoY = posPersoY+1;
            tab[posPersoX][posPersoY]=5;
            if (precedentPorte == 1)
            {
                tab[posPersoX][posPersoY-1]=4;
            }
            else
            {
                tab[posPersoX][posPersoY-1]=0;
            }
            actualisationClasses(tab,posPersoX,posPersoY);
            actualisationClasses(tab,posPersoX,posPersoY-1);
            precedentPorte = 0;
        }
    }
    
    function left()
    {
        if (tab[posPersoX][posPersoY-1]==4)
        {
            if (nivSuivant != 0)
            {
                nivSuivant = nivSuivant+2;
            }
            else
            {
                precedentPorte = 1; 
                posPersoY = posPersoY-1;
                tab[posPersoX][posPersoY]=5;
                tab[posPersoX][posPersoY+1]=0;
                actualisationClasses(tab,posPersoX,posPersoY);
                actualisationClasses(tab,posPersoX,posPersoY+1);
            }
        }
        else if(tab[posPersoX][posPersoY-1] != 1 && tab[posPersoX][posPersoY-1] != 4)
        {
            posPersoY = posPersoY-1;
            tab[posPersoX][posPersoY]=5;
            if (precedentPorte == 1)
            {
                tab[posPersoX][posPersoY+1]=4;
            }
            else
            {
                tab[posPersoX][posPersoY+1]=0;
            }
            actualisationClasses(tab,posPersoX,posPersoY);
            actualisationClasses(tab,posPersoX,posPersoY+1);
            precedentPorte = 0;
        }
    }
    
    
    function musiqueCle() // Son quand on prend la clé
    {
        var son3 = document.getElementById("musCle");
        son3.play();
    }
    
    function musiquePorte() // Son quand on passe la porte
    {
        var son4 = document.getElementById("musPorte");
        son4.play();   
    }
  
    function musiqueBatterie() // Son quand on prend des batteries
    {
        var son5 = document.getElementById("musBatterie");
        son5.play();   
    }
    
    function musiquePas() // Son quand on marche
    {
        var son6 = document.getElementById("musPas");
        son6.play();   
    }
    
    
    function augmentationPiles(piles) // Quand on prend une batterie
    {
        musiqueBatterie(); // Son de la batterie
        if(piles+2 > 8)
        {
            piles = 8; // Je remet ma batterie à plein
        }
        else if(piles+2 <= 8)
        {
            piles = piles+2; // J'ajoute 2 piles
        }
        for(var i=0;i<piles;i++)
        {
            document.getElementById(i+"b").style.visibility="visible"; // Je met à jour graphiquement
        }
        var img = document.getElementById("img");
        img.setAttribute("src", "style/images/lumiere"+piles+".png"); // Je met à jour la lumiere
        return piles;
    }
    
    
      function reductionLum (piles)
    {
        compteurDeplacement = compteurDeplacement+1; // Je compte les pas
        if ( ( niveau<3 && compteurDeplacement%(5*(niveau+1))==0)   || (niveau>=3 && compteurDeplacement%(55-(niveau*5))==0)) // Diminution de la batterie en fonction du nombre de pas et du niveau
        {
            piles = piles-1; // Je perd une pile
            for(var i=piles; i<8; i++)
            {
                document.getElementById(i+"b").style.visibility="hidden"; // Met à jour graphiquement la perte de pile
            }
            if (piles <=0) // Si j'ai plus de piles
            {
                finPerdu();
            }
            var img = document.getElementById("img");
            img.setAttribute("src", "style/images/lumiere"+piles+".png"); // Met à jour la lumiere graphiquement
        }
        return piles
    }
      
}


// -----------------------------------------//

function finGagne(seconde)
{
    var son7 = document.getElementById("musEnd"); // Son de victoire
    son7.play();
    clearInterval(temps); // Arret du chronometre
    var divLaby =  document.getElementById("labyrinthe");
    divLaby.innerHTML=""; // Vide le labyrinthe
    divLaby.style.backgroundColor="#0a0a0a"
    divLaby.innerHTML="<div>Vous avez gagné</div></br><p>Vous avez mis "+ seconde +" secondes pour sortir du labyrinthe</p>" ; // Affiche le texte
    button = document.createElement("button"); // Cree bouton de replay
    button.setAttribute("onclick", "window.location.reload()");
    button.setAttribute("id", "butReplay");
    button.innerHTML=" REJOUER "
    divLaby.appendChild(button);
}

// -----------------------------------------//

function finPerdu()
{
    var son5 = document.getElementById("musDead"); // Musique de fin 
    son5.play();
    clearInterval(temps);
    var divLaby = document.getElementById("labyrinthe");
    divLaby.innerHTML=""; // Vide la labyrinthe
    divLaby.style.backgroundColor="#0a0a0a"
    divLaby.innerHTML="<div>GAME OVER</div></br><p>Vous n'êtes pas parvenu à sortir du labyrinthe</p>"; // Affiche le texte
    button = document.createElement("button"); // Cree un bouton de replay
    button.setAttribute("onclick", "window.location.reload()");
    button.setAttribute("id", "butReplay");
    button.innerHTML=" REJOUER "
    divLaby.appendChild(button);
}


// -----------------------------------------//

function LabyrintheAleatoire (n) // 
{
    var tabLaby = new Array(n); // Tableau enregistre le labyrinthe
    var divLaby = document.getElementById("labyrinthe"); // Recupere emplacement html pour le laby
    divLaby.innerHTML=""; // Je vide la div
    var pasfin = true; // Variable stocke la fin ou pas du la creation du tableau

    for (var i=0; i<n; i++)
    {
        tabLaby[i]=new Array(n); // 2eme dimension du tableau
    }
    iniTab(tabLaby); // Initialise le contenu du tableau

    while ( pasfin ) // Casse des murs tant que le labyrinthe n'est pas fini d'etre fait//
    { // Tant que "pasfin" vaut true, verification de fin de construction
        var x = (Math.round(Math.random()*100)%(n-2))+1; // Choisis un case aléatoirement
        var y = (Math.round(Math.random()*100)%(n-2))+1; // Choisis un case aléatoirement
        if (tabLaby[x][y]==1) // Si c'est un mur
        {
            if (tabLaby[x-1][y]!=1 || tabLaby[x][y-1]!=1 || tabLaby[x+1][y]!=1 || tabLaby[x][y+1]!=1) // Si il n'est pas entouré par 4 autres murs
            {
                if (x%2==0 && y%2==1) // Si il va se joindre avec des cases horizontalement
                {
                    if (tabLaby[x-1][y]!=tabLaby[x+1][y]) // Si les zones à joindre sont differentes (id different)
                    {
                        tabLaby[x][y]=tabLaby[x-1][y]; // Transforme notre case en "pasmur" et on met l'id de la zone du dessous

                        var zoneAChanger = tabLaby[x+1][y]; // Enregistre dans valeur de la zone à changer par l'identifiant de dessus pour reunir les 2 zones en 1 seule

                        for(var i=1; i<n; i++)
                        {
                            for(var j=1;j<n;j++)
                            {
                                if (tabLaby[i][j]==zoneAChanger) // Si valeur de la case correspond à la zone à changer
                                {
                                    tabLaby[i][j]=tabLaby[x-1][y]; // Je remplace cette case par le numéro de la zone à laquelle elle se joint
                                }
                            }
                        }
                    }
                }
                if (y%2==0 && x%2==1) // Si il va se joindre avec des cases verticalement
                {
                    if (tabLaby[x][y-1]!=tabLaby[x][y+1]) // Si les zones à joindre sont differentes (id different)
                    {
                        tabLaby[x][y]=tabLaby[x][y-1]; // Transforme notre case en "pasmur" et on met l'id de la zone du dessous

                        var zoneAChanger = tabLaby[x][y+1]; // Enregistre dans valeur de la zone à changer par l'identifiant d'à coté pour reunir les 2 zones en 1 seule

                        for(var i=1; i<n; i++)
                        {
                            for(var j=1;j<n;j++)
                            {
                                if (tabLaby[i][j]==zoneAChanger) // Si valeur de la case correspond à la zone à changer
                                {
                                    tabLaby[i][j]=tabLaby[x][y-1]; // Je remplace cette case par le numéro de la zone à laquelle elle se joint
                                }
                            }
                        }
                    }
                } 
            }
        }
        pasfin = verifFin(tabLaby, n); // Je reverifie la fin de la construction et enregistre dans "pasfin"
    }
    affichage(tabLaby, n);   // Quand j'ai fini de crée mon labyrinthe avec les variables, je l'affiche graphiquement en html

    // Retransfere la numéro de la grande zone en 0 car plus simple pour gérer après
    for(var i=1; i<n; i++)
    {
        for(var j=1;j<n;j++)
        {
            if (tabLaby[i][j]!=1) // Si valeur de la case n'est pas un mur
            {
                tabLaby[i][j]=0; // Je les mets tous à 0
            }
        }
    }
    return tabLaby;
    
    
    // ----------------------------FONCTIONS POUR LABYRINTHE ALEATOIRE---------------------------------------//

    function iniTab(tabLaby) // Initialise le tableau initial de la réalisation du labyrinthe
    {
        var compteur = 2; // Compteur pour les "id" des zones 
        for (var i=0; i<n; i++)
        {
            for(var j=0; j<n; j++)
            {
                tabLaby[i][j]=1; // Tout est au départ mis à 1 = mur
            }
        }
        for(var i=1; i<n-1; i=i+ 2)
        {
            for(var j=1;j<n-1;j=j+ 2)
            {
                tabLaby[i][j] = compteur; // 1 cases sur deux et lignes impairs, mis en "pas mur" avec des id commencant à deux
                compteur++; // Id des zones "pas mur" augmentent de 1 à chaque fois
            }
        }
        return tabLaby;
    }

    function verifFin(tabLaby, n) // verifie que la creation du labyrinthe est finie ou pas
    {
        var compteurLaby = 0; 
        for (var i=0; i<n; i++)
        {
            for(var j=0; j<n; j++)
            {
                if(tabLaby[i][j]==1 || tabLaby[i][j]==tabLaby[1][1]) // Pour chaque case, si elle est un mur, ou est dans la meme zone que la case 1_1
                {
                    compteurLaby = compteurLaby+1; // J'ajoute 1 un compteur

                }
            }
        }
        if (compteurLaby != n*n) // Si le compteur n'a pas compté toute les cellules du tableau
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    function affichage(tableau, n)   /* Fonction qui affiche la tableau graphiquement */
    {
        tab = document.createElement("table"); // Créé <table>
        tab.setAttribute("id", "tab"); // Met un ID au table
        divLaby.appendChild(tab); // Met le tableau dans la div html divLaby
        for (var i=0; i<n ; i++)
        {
            tr = document.createElement("tr"); // Crée n lignes
            tab.appendChild(tr); // Les lignes sont dans le tableau
            tr.setAttribute("class", "tr"); // Je met une class "tr" aux lignes
            for (var j=0; j<n; j++)
            {
                td = document.createElement("td"); // Dans chaque lignes je met les cellules
                tr.appendChild(td); // Les cellules sont dans les lignes
                td.setAttribute("id", i+"_"+j); // Chaque cellule à un ID avec les coordonnées de sa case
                if (tableau[i][j]==1) // Si la case est un mur
                {
                    td.setAttribute("class", "mur"); // Je met à la cellule la classe "mur"
                }
                else // Si la case n'est pas un mur
                {
                    td.setAttribute("class", "pasmur"); // Je met à la cellule la classe "pasmur"
                }
            }
        }
    }   

}

// -----------------------------------------//

function ObjetsAleatoires (n, tab, niveau) // Place aléatoirement les objets dans le labyrinthe
{
    // 0 = pas mur,  1 = mur,  2 = à la clé, 3 = piles lampes, 4 = sortie, 5 = perso
    for (var i = 2; i<6; i++)
    {
        if (i==5)
        {
            x=1;
            y=1;
            tab[x][y]=i; // Position du personage par défaut toujours en 1, 1 
            actualisationClasses(tab, x,y);  
        }
        
        else if (i==3)
        {
            if (niveau==0 ||niveau ==1) // En fonction du niveau, nombre de recharges batteries dans le jeu
            {
                var k = 1; // k = nombre de recharges batteries dans le jeu
            }
            else if (niveau==3)
            {
                var k=3;
            }
            else
            {
                var k = 2;
            }
            for (var j = 0; j < k; j++) // Je met k batteries dans le jeu
            {
                do 
                {
                    var x = (Math.round(Math.random()*100)%(n-2))+1;
                    var y = (Math.round(Math.random()*100)%(n-2))+1;
                }
                while (tab[x][y]!=0)
                tab[x][y]=i;
                actualisationClasses(tab, x,y);  
            }
        }
        else // Si pas perso ou batterie, je met clé et porte au pif dans le labyrinthe
        {
            do 
            {
                var x = (Math.round(Math.random()*100)%(n-2))+1;
                var y = (Math.round(Math.random()*100)%(n-2))+1;
            }
            while (tab[x][y]!=0)
            tab[x][y]=i;
            actualisationClasses(tab, x,y);  
        }  
    }
    return tab;
}

// -----------------------------------------//

function actualisationClasses(tab, x, y) // actualise les classes selon le contenu de la cellule
{
    var element = document.getElementById(x+"_"+y);
    if ( tab[x][y]==2)
    {
        element.setAttribute("class", "cle");
    }
    else if ( tab[x][y]==3)
    {
        element.setAttribute("class", "piles");
    }
    else if ( tab[x][y]==4)
    {
        element.setAttribute("class", "sortie");
    }
    else if ( tab[x][y]==5)
    {
        element.setAttribute("class", "perso");
    }
    else if ( tab[x][y]==1)
    {
        element.setAttribute("class", "mur");
    }
    else if ( tab[x][y]==0)
    {
        element.setAttribute("class", "pasmur");
    }
}


// -----------------------------------------//

