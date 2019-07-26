
function rgbColor(r, g, b) {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function initialiserProgrem(config, initContexte) {
    config.titre = "Tour-tan ar C'hreac'h"; 
    config.nombreColonnes = 21; 
    config.nombreLignes = 15; 
    config.nombreFrames = 85;

    initContexte.nombreColonnes = config.nombreColonnes; 
    initContexte.nombreLignes = config.nombreLignes; 
    initContexte.nombreFrames = config.nombreFrames;
}

function colorerProgrem(colonne, ligne, frame, contexte) {
    coloneOffset = Math.round(colonne - contexte.nombreColonnes/2); 
    ligneOffset = Math.round(-ligne + contexte.nombreLignes/2); 
    frameMid = Math.round(contexte.nombreFrames/2); 
    rayWidth = 5; 
    raySpred = 12; 
    lightTreshold = 100;

    // Sol 
    if (ligne - contexte.nombreLignes*2/3 >= Math.log(colonne/21 * 7 + 2)) return 'black';
    aRayIndex = frameMid - frame + raySpred - rayWidth/2; 
    bRayIndex = frameMid - frame - raySpred + rayWidth/2;
    
    aLightPower = (frameMid - Math.abs(aRayIndex)) / frameMid * 255; 
    bLightPower = (frameMid - Math.abs(bRayIndex)) / frameMid * 255;
    
    aRayTest1 = coloneOffset <= (aRayIndex + rayWidth/2) * ligneOffset/8; 
    aRayTest2 = coloneOffset >= (aRayIndex - rayWidth/2) * ligneOffset/8;
    
    bRayTest1 = coloneOffset <= (bRayIndex + rayWidth/2) * ligneOffset/8; 
    bRayTest2 = coloneOffset >= (bRayIndex - rayWidth/2) * ligneOffset/8;
    
    // Chevauchement des rayons 
    if (aRayTest1 && aRayTest2 && bRayTest1 && bRayTest2) { 
        if (aLightPower < bLightPower) { 
            aLightPower = 0; 
        } else { 
            bLightPower = 0; 
        } 
    }
    
    // Rayon A 
    if (aLightPower > lightTreshold && aRayTest1 && aRayTest2) { 
        blueColor = Math.max(Math.round(150 - aLightPower / 20), 112); 
        redColor = Math.max(Math.min(aLightPower - 40, 230), 25); 
        greenColor = Math.max(Math.min(aLightPower + 0, 230), 25); 
        return rgbColor(redColor, greenColor, blueColor); 
    }
    
    // Rayon B 
    if (bLightPower > lightTreshold && bRayTest1 && bRayTest2) { 
        blueColor = Math.max(Math.round(150 - bLightPower / 20), 112); 
        redColor = Math.max(Math.min(bLightPower - 40, 230), 25); 
        greenColor = Math.max(Math.min(bLightPower + 0, 230), 25); 
        return rgbColor(redColor, greenColor, blueColor); 
    }
    
    // Tour 
    if (colonne == Math.floor(contexte.nombreColonnes/2) && ligne > Math.floor(contexte.nombreLignes/2)) {
        return 'black';
    }
    
    return 'MidnightBlue';
}