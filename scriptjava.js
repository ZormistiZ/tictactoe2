// On charge les informations utiles
const status = document.querySelector("h2")
let jeuActif = true
let joueurActif = "X"
let etatJeu = ["", "", "", "", "", "", "", "", ""]

const conditionsvictoire = [
    [0, 1, 2]
    [3, 4, 5]
    [6, 7, 8]
    [0, 3, 6]
    [1, 4, 7]
    [2, 5, 8]
    [0, 4, 8]
    [2, 4, 6]
]

// Messages
const gagne = () => Le joueur  ${joueurActif} a gagné
const egalité = () => "Egalité"
const tourJoueur = () => C'est autout du joueur ${joueurActif}

statut.innerHTML = tourJoueur()

document.querySelectorAll(".case").forEach(cell => cell. 
    addEventListener("click", gestionClicCase))
    document.querySelector("#recommencer").addEventListener
    ("click", recommencer)

   function gestionClicCase(){
        console.log(this)
        const indexCase = parseInt(this.dataset.index)
        // On récupère l'index de la case cliqué
        const  indexCase = parseInt (this.dataset.index)

    if(etatJeu[indexCase] != ""  !jeuActif) 
{
        return 

    }

    etatJeu[indexCase] = joueurActif
    this.innerHTML = joueurActif

    verifgagne()
}

function verifgagne(){
    let tourGagnant = false

    for(let conditionsvictoire of conditionsvictoire){
        let val1 = etatJeu[conditionsvictoire[0]]
        let val2 = etatJeu[conditionsvictoire[1]]
        let val3 = etatJeu[conditionsvictoire[2]]
        if(val1 == ""   val2 == "" || val3 == "")
        {
            continue
        }
        if(val1=== val2 && val3){
         break
        }
    }
    if(tourGagnant){
        statut.innerHTML = gagne()
        jeuActif = false
        return
    }
    if(!etatJeu.includes("")){
        statut.innerHTML = egalité()
        return
    }

}
joueurActif = joueurActif=== "X"? "O" : "X"
statut.innerHTML = tourJoueur()

function recommencer(){
     joueurActif = "X"
     jeuActif = true
     let etatJeu = ["", "", "", "", "", "", "", "", ""] 
     statut.innerHTML = tourJoueur()
     document.querySelectorAll(".case").forEach(cell =>innerHTML ="")
}

}