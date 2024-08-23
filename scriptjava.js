// Sélectionne le premier élément du DOM ayant la classe 'game--status' et l'assigne à la variable statusDisplay
// Cet élément est utilisé pour afficher les messages de statut du jeu (ex : tour du joueur, victoire, égalité)
const statusDisplay = document.querySelector('.game--status');

// Initialise les variables pour suivre l'état du jeu

// gameActive est un booléen indiquant si le jeu est en cours (true) ou terminé (false)
let gameActive = true;

// currentPlayer représente le joueur actuel, "X" ou "O". "X" commence le jeu.
let currentPlayer = "X";

// gameState est un tableau représentant l'état actuel du plateau de jeu. 
// Chaque index correspond à une cellule du plateau (0 à 8). Initialisé avec des chaînes vides.
let gameState = ["", "", "", "", "", "", "", "", ""];

// scoreX et scoreY sont des variables qui stockent le score des joueurs "X" et "O" respectivement. Initialisés à 0.
var scoreX = 0;  // Score du joueur X
var scoreY = 0;  // Score du joueur O

// Sélectionne les éléments HTML destinés à afficher les scores des joueurs
const scorex = document.getElementById("scorex"); // Élément pour afficher le score de "X"
const scorey = document.getElementById("scorey"); // Élément pour afficher le score de "O"

// Initialise les scores affichés dans le HTML en utilisant les valeurs initiales de scoreX et scoreY
scorex.innerHTML = scoreX;
scorey.innerHTML = scoreY;

// Définition de fonctions pour générer des messages dynamiques en fonction de l'état du jeu

// Fonction qui retourne un message indiquant que le joueur actuel a gagné
const winningMessage = () => `Joueur ${currentPlayer} a gagné!`;

// Fonction qui retourne un message indiquant que le jeu s'est terminé par une égalité
const drawMessage = () => `Le jeu s'est terminé par une égalité!`;

// Fonction qui retourne un message indiquant de quel joueur c'est le tour de jouer
const currentPlayerTurn = () => `C'est au tour de '${currentPlayer}' de jouer`;

// Initialise le message de statut affiché dans le HTML en indiquant quel joueur doit jouer en premier
statusDisplay.innerHTML = currentPlayerTurn();

// Définition des conditions de victoire possibles dans le jeu de Tic-Tac-Toe
// Chaque sous-tableau représente une combinaison d'indices du tableau gameState qui constituerait une victoire
const winningConditions = [
    [0, 1, 2], // Ligne du haut
    [3, 4, 5], // Ligne du milieu
    [6, 7, 8], // Ligne du bas
    [0, 3, 6], // Colonne de gauche
    [1, 4, 7], // Colonne du milieu
    [2, 5, 8], // Colonne de droite
    [0, 4, 8], // Diagonale principale
    [2, 4, 6]  // Diagonale secondaire
];

// Fonction qui gère la mise à jour de l'état du jeu lorsqu'une cellule est jouée
// Elle met à jour le tableau gameState et l'affichage de la cellule cliquée
function handleCellPlayed(clickedCell, clickedCellIndex) {
    // Met à jour le tableau gameState avec le symbole du joueur actuel à l'index cliqué
    gameState[clickedCellIndex] = currentPlayer;

    // Met à jour l'affichage de la cellule cliquée avec le symbole du joueur actuel
    clickedCell.innerHTML = currentPlayer;
}

// Fonction qui change le joueur actuel après un tour valide
// Elle inverse la valeur de currentPlayer entre "X" et "O" et met à jour le message de statut
function handlePlayerChange() {
    // Change le joueur actuel : si c'est "X", passe à "O", sinon passe à "X"
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    // Met à jour le message de statut pour indiquer de quel joueur c'est le tour
    statusDisplay.innerHTML = currentPlayerTurn();
}

// Fonction qui vérifie le résultat du jeu après chaque coup joué
// Elle détermine si un joueur a gagné, si le jeu est terminé par une égalité, ou si le jeu continue
function handleResultValidation() {
    let roundWon = false; // Variable pour indiquer si une condition de victoire est remplie

    // Parcourt toutes les conditions de victoire possibles
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i]; // Récupère la condition de victoire actuelle
        let a = gameState[winCondition[0]]; // Valeur de la première cellule de la condition
        let b = gameState[winCondition[1]]; // Valeur de la deuxième cellule de la condition
        let c = gameState[winCondition[2]]; // Valeur de la troisième cellule de la condition

        // Vérifie si l'une des cellules de la condition est vide
        // Si c'est le cas, la condition ne peut pas être remplie et on passe à la suivante
        if (a === '' || b === '' || c === '') {
            continue;
        }

        // Vérifie si les trois cellules ont le même symbole (indiquant une victoire)
        if (a === b && b === c) {
            roundWon = true; // Indique qu'une condition de victoire a été remplie
            break; // Sort de la boucle car une victoire a été trouvée
        }
    }

    // Si une condition de victoire a été remplie
    if (roundWon) {
        // Met à jour le message de statut pour indiquer le joueur gagnant
        statusDisplay.innerHTML = winningMessage();

        // Met à jour le score du joueur gagnant
        if (currentPlayer == "X") {
            scoreX += 1; // Incrémente le score de "X"
            scorex.innerHTML = scoreX; // Met à jour l'affichage du score de "X"
        } else {
            scoreY += 1; // Incrémente le score de "O"
            scorey.innerHTML = scoreY; // Met à jour l'affichage du score de "O"
        }

        gameActive = false; // Indique que le jeu est terminé
        return; // Sort de la fonction car le jeu est terminé
    }

    // Vérifie si le plateau est entièrement rempli sans qu'aucun joueur n'ait gagné (égalité)
    let roundDraw = !gameState.includes(""); // true si aucune cellule n'est vide

    if (roundDraw) {
        // Met à jour le message de statut pour indiquer une égalité
        statusDisplay.innerHTML = drawMessage();

        gameActive = false; // Indique que le jeu est terminé
        return; // Sort de la fonction car le jeu est terminé
    }

    // Si le jeu n'est pas terminé (pas de victoire ni d'égalité), change le joueur actuel
    handlePlayerChange();
}

// Fonction qui gère le clic sur une cellule du plateau de jeu
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target; // Récupère l'élément HTML de la cellule cliquée
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index')); // Récupère l'index de la cellule cliquée à partir de l'attribut 'data-cell-index'

    // Vérifie si la cellule est déjà occupée ou si le jeu est terminé
    // Si la cellule est déjà occupée (gameState[clickedCellIndex] n'est pas vide) ou si le jeu n'est plus actif, ne fait rien
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return; // Quitte la fonction sans rien faire
    }

    // Met à jour l'état du jeu et l'affichage de la cellule cliquée
    handleCellPlayed(clickedCell, clickedCellIndex);

    // Vérifie le résultat du jeu après le coup joué
    handleResultValidation();
}

// Fonction qui réinitialise le jeu à son état initial, permettant de commencer une nouvelle partie
function handleRestartGame() {
    gameActive = true; // Indique que le jeu est actif
    currentPlayer = "X"; // Réinitialise le joueur actuel à "X"
    gameState = ["", "", "", "", "", "", "", "", ""]; // Réinitialise l'état du plateau de jeu à des cellules vides

    // Met à jour le message de statut pour indiquer que c'est au tour de "X" de jouer
    statusDisplay.innerHTML = currentPlayerTurn();

    // Réinitialise le contenu de toutes les cellules dans le HTML en les vidant
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

// Ajoute un écouteur d'événement de clic à chaque cellule du plateau de jeu
// Lorsque l'utilisateur clique sur une cellule, la fonction handleCellClick est appelée
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));

// Ajoute un écouteur d'événement de clic au bouton de redémarrage du jeu
// Lorsque l'utilisateur clique sur ce bouton, la fonction handleRestartGame est appelée
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
