function rgbColor(r, g, b) {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function complex(reel, imaginaire) {
    return {r: reel, i: imaginaire};
}

function sommeComplexes(a, b) {
    return complex(a.r + b.r, a.i + b.i);
}

function multiplieComplexes(a, b) {
    return complex(a.r * b.r - a.i * b.i, a.r * b.i + a.i * b.r);
}

function complexeModule(a) {
    return Math.sqrt(a.r * a.r + a.i * a.i);
}

function mandelbrot(c) {
    z = complex(0, 0);
    n = 0
    while (complexeModule(z) <= 2 && n < 63) {
        z = sommeComplexes(c, multiplieComplexes(z, z));
        n += 1;
    }
    return n;
}

function initialiserProgrem(config, initContexte) {
    config.titre = 'Mandelbrot set';
    config.nombreColonnes = 80;
    config.nombreLignes = 40;
    config.nombreFrames = 99;
    initContexte.increment = 0.1;
    initContexte.xStart = -3.27;
    initContexte.yStart = -1.38;
    initContexte.xRange = 4;
    initContexte.yRange = 2;
}

function colorerProgrem(colonne, ligne, frame, contexte) {
    zoom = 10 / (5 * frame * frame + 1);
    xRange = contexte.xRange * zoom;
    yRange = contexte.yRange * zoom;
    xStart = contexte.xStart + contexte.xRange * (1 - zoom) / 2;
    yStart = contexte.yStart + contexte.yRange * (1 - zoom) / 2;
    increment = contexte.increment * zoom;

    r = xStart + colonne * increment;
    i = yStart + ligne * increment;
    z = complex(r, i);
    m = complexeModule(z);
    profondeur = mandelbrot(z);
    color = rgbColor(profondeur * 4, (3 * frame) % 255, (3 * colonne) % 255);
    return color;
}