
function initialiserProgrem(config, initContexte) {
    config.titre = 'Arbre exponentiel de Noël'; 
    config.nombreColonnes = 32; 
    config.nombreLignes = 32; 
    config.nombreFrames = 60;
    
    initContexte.nombreColonnes = config.nombreColonnes; 
    initContexte.nombreLignes = config.nombreLignes; 
    initContexte.nombreFrames = config.nombreFrames;
    
    initContexte.couleursGuirlande = ['red', 'blue', 'gold', 'pink']; 
    initContexte.xMin = -1; 
    initContexte.xMax = 10; 
    initContexte.yMin = -1; 
    initContexte.yMax = 10;
    
    initContexte.basSapin = 1/2; 
    initContexte.troncSapin = Math.floor(config.nombreColonnes / 2);
}

function colorerProgrem(colonne, ligne, frame, contexte) {
    var x = (colonne) / contexte.nombreColonnes * (contexte.xMax - contexte.xMin)/2 + contexte.xMin; 
    var y = (contexte.nombreLignes - ligne) / contexte.nombreLignes * (contexte.yMax - contexte.yMin)/2 + contexte.yMin;

    var test1 = Math.exp(x) >= y; 
    var test2 = Math.exp(3 -x) >= y;
    
    if (frame % 5 < 3 && y > contexte.basSapin && (Math.abs(Math.exp(x) - y) < (1/50) || Math.abs(Math.exp(3 -x) - y) < (1/50))) { 
        return contexte.couleursGuirlande[((frame + colonne) / 2) % contexte.couleursGuirlande.length]; 
    }
    
    if (y > contexte.basSapin && test1 && test2) { 
        return 'forestgreen'; 
    }
    
    if (y <= contexte.basSapin && (colonne == contexte.troncSapin - 1 || colonne == contexte.troncSapin)) { 
        return 'brown'; 
    }
    
    return 'snow';
    
    
}