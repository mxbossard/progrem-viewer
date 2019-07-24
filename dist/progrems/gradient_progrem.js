function rgbColor(r, g, b) {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function initialiserProgrem(config, initContexte) {
    config.nombreFrames = 32;
}

function colorerProgrem(colonne, ligne, frame, contexte) {
    config.titre = 'Dégradé de couleur';
    redColor = Math.abs(frame * 16 % 510 - 254);
    color = rgbColor(redColor, colonne * 255 / 17, ligne * 255 / 17);
    return color;
}