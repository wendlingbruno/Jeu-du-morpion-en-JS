let joueurUnEnCours = true; /* servira de booléan pour déterminer qui joue */
let joueur2 = "Au tour du joueur O";
let joueur1 = "Au tour du joueur X";
let j1 = {symbole : "X", score : 0, }
let joueurEnCours = j1
joueurEnCours.score = 2
console.log(j1)
let scoreJ1 = 0;
let scoreJ2 = 0;
$("#quiJoue").text(joueur1);
$("#scores").text("Joueur 1 : "+scoreJ1+" Joueur 2 : "+scoreJ2);
let finDePartie = false; // savoir quand afficher un texte de fin de partie sans le répéter
let symboleActuel = "X";
let nbTours = 0;


function switchJoueurs(){
    if(joueurUnEnCours){
        $("#quiJoue").text(joueur2);
        joueurUnEnCours = false;
        symboleActuel = "O";
        nbTours++;
    }else{
        $("#quiJoue").text(joueur1);
        joueurUnEnCours = true;
        symboleActuel = "X";
        nbTours++;
    }

}

function victoire(){
    
    let diag1 = "";
    let diag2 = "";

    for (let x=1;x <= 3; x++){
        let lignes = "";
        let colonnes = "";
        
        for (let y=1;y <= 3; y++){
            lignes += $("#"+x+"-"+y).text();
            colonnes += $("#"+y+"-"+x).text();

            if (x==y){
                diag1 += $("#"+x+"-"+y).text();
            }

            if (x+y==4){
                diag2 += $("#"+x+"-"+y).text();
            }
           
        }
        if (lignes === symboleActuel.repeat(3)){
            console.log("victoire ligne");
            finDePartie = true;
        }
        if (colonnes === symboleActuel.repeat(3)){
            console.log("victoire colonne");
            finDePartie = true;
        }
         
        
    }
    console.log(diag1)  
    if (diag1 === symboleActuel.repeat(3)){
        console.log("victoire diag1");
        finDePartie = true;
    }
    if (diag2 === symboleActuel.repeat(3)){
        console.log("victoire diag2");
        finDePartie = true;
    }    

    console.log(nbTours);
    if (finDePartie){
        if (joueurUnEnCours){
            $("#quiJoue").text("Le joueur X a gagné");
            scoreJ1 = scoreJ1 + 1;
        }else{
            $("#quiJoue").text("Le joueur O a gagné");
            scoreJ2 = scoreJ2 + 1;
        }
        $("#scores").text("Joueur 1 : "+scoreJ1+" Joueur 2 : "+scoreJ2);
        return true;
    }else if(nbTours == 8){ // pour le match nul
        finDePartie = true;
        $("#quiJoue").text("Match nul");
        return true;
    }
    return false;
}


$("td").click(function(){
    if (!finDePartie){
        if (!$(this).hasClass("caseRempli")){ // cette classe sert à vérifier si il y a quelque chose dans la case en question
            if (joueurUnEnCours){
                //$(this).append("<i class='fas fa-times fa-4x'></i>");
                $(this).text(symboleActuel);
                $(this).addClass("caseRempli");
                $(this).addClass("caseRempliX");
            }else{
               // $(this).append("<i class='far fa-circle fa-4x'></i>");
                $(this).text(symboleActuel);
                $(this).addClass("caseRempli");
                $(this).addClass("caseRempliO");
            }
            if (victoire() == false){
                    switchJoueurs(); 
                }else{
                    $("#boutonJeu").toggleClass("invisible");
                } 
            }
        }
})

$("#boutonJeu").click(function(){ // reset
    finDePartie = false;
    switchJoueurs();
    $("td").removeClass(); // retire toutes les classes de cette manière
    $("td").empty(); // on enlève le texte
    $("#boutonJeu").toggleClass("invisible");
    nbTours = 0;
})