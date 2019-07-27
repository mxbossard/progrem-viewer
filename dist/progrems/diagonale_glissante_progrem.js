function hslColor(hue, saturation = '100%', lightness = '50%') {
    return 'hsl(' + hue + ', ' + saturation + ', ' + lightness + ')';
}

function initialiserProgrem(config, initContexte) {
    config.titre = "Diagonale glissante.";
    
    var taille = 16;

    initContexte.taille = taille;
    config.nombreColonnes = taille;
    config.nombreLignes = taille;
    config.nombreFrames = taille;
}

function colorerProgrem(colonne, ligne, frame, contexte) {
    var test = (ligne + frame) % contexte.taille;
    var borneGauche = (colonne - 2 + contexte.taille) % contexte.taille;
    var borneDroite = (colonne + 2) % contexte.taille;
    var color = frame * 360 / contexte.taille;
    //if (test === colonne) {
    if (test >= borneGauche && test <= borneDroite || borneDroite < borneGauche && (test <= borneDroite ||test >= borneGauche)) {
        //return 'green';
        return hslColor(color);
    }
    //return 'white';
    return hslColor(color + 180);
}