
function initialiserProgrem(config, initContexte) {
    config.titre = "Le coeur d'Eugène Beutel.";
    
    // Définition de l'encadrement des coordonnées cartesiennes
    const X_MIN = -1.3;
    const X_MAX = 1.3;
    const Y_MIN = -1.15;
    const Y_MAX = 1.4;

    // Calcul de la resolution des coordonnées cartesiennes
    initContexte.amplitudeX = (X_MAX - X_MIN) / config.nombreColonnes;
    initContexte.amplitudeY = - (Y_MAX - Y_MIN) / config.nombreLignes;

    // Calcul du décallage des coordonnées cartesiennes
    initContexte.decallageX = X_MIN + config.nombreColonnes % 2 * initContexte.amplitudeX / 2;
    initContexte.decallageY = Y_MAX + config.nombreLignes % 2 * initContexte.amplitudeY / 2;
}

function colorerProgrem(colonne, ligne, frame, contexte) {
    // Calcul des coordonnées cartesiennes (x, y) du pixel
    var x = colonne * contexte.amplitudeX + contexte.decallageX;
    //console.log(x);
    var y = ligne * contexte.amplitudeY + contexte.decallageY;
    
    var equationEugeneGauche = Math.pow((Math.pow(x, 2) + Math.pow(y, 2) -1), 3);
    var equationEugeneDroite = Math.pow(x, 2) * Math.pow(y, 3)
    var equationEugeneDiff = equationEugeneGauche - equationEugeneDroite;
    
    //var couleur;
    if ( equationEugeneDiff < 0 ) {
        return 'rgb(255, 102, 153)'; // Couleur rose #FF6699
    } else {
        return 'rgb(135, 206, 235)'; // Couleur bleu ciel
        //couleur = 'rgb(135, 206, 250)'; // Couleur lightskyblue
    }

    //return couleur;
}