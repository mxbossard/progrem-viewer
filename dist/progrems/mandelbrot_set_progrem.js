function rgbColor(r, g, b) {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function hslColor(hue, saturation = '100%', lightness = '50%') {
    return 'hsl(' + hue + ', ' + saturation + ', ' + lightness + ')';
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

function mandelbrot(c, profondeurMax) {
    z = complex(0, 0);
    n = 0
    while (complexeModule(z) <= 2 && n < profondeurMax) {
        z = sommeComplexes(c, multiplieComplexes(z, z));
        n += 1;
    }
    return n;
}

function initialiserProgrem(config, initContexte) {
    config.titre = 'Mandelbrot set';
    config.nombreColonnes = 80;
    config.nombreLignes = 40;
    
    initContexte.increment = 0.1;
    initContexte.xStart = -3.158;
    initContexte.yStart = -1.281;
    initContexte.xRange = 4;
    initContexte.yRange = 2;
    initContexte.nombreFrames = 50;
    config.nombreFrames = initContexte.nombreFrames;
}

function initialiserProgrem2(config, initContexte) {
    config.titre = 'Mandelbrot set';
    config.nombreColonnes = 80;
    config.nombreLignes = 40;

    initContexte.increment = 0.1;
    initContexte.xRange = 4;
    initContexte.yRange = 2;
    initContexte.xStart = -initContexte.xRange/2 - 0.743643887037158704752191506114774;
    initContexte.yStart = -initContexte.yRange/2 + 0.131825904205311970493132056385139;
    initContexte.nombreFrames = 50;
    config.nombreFrames = initContexte.nombreFrames;
}

function initialiserProgrem3(config, initContexte) {
    config.titre = 'Mandelbrot set';
    config.nombreColonnes = 60;
    config.nombreLignes = 30;
    
    initContexte.xRange = 2;
    initContexte.yRange = 1;
    initContexte.xIncrement = initContexte.xRange / config.nombreColonnes;
    initContexte.yIncrement = initContexte.yRange / config.nombreLignes;
    initContexte.xStart = -2.40116;
    initContexte.yStart = -0.5;
    initContexte.nombreFrames = 42;
    config.nombreFrames = initContexte.nombreFrames;
}

function colorerProgrem(colonne, ligne, frame, contexte) {
    frame = contexte.nombreFrames / 2 - Math.abs(frame - contexte.nombreFrames / 2);
    zoom = 5 / (1 * Math.exp(frame/2) + 1);
    xStart = contexte.xStart + contexte.xRange * (1 - zoom) / 2;
    yStart = contexte.yStart + contexte.yRange * (1 - zoom) / 2;
    xIncrement = contexte.xIncrement * zoom;
    yIncrement = contexte.yIncrement * zoom;

    r = xStart + colonne * xIncrement;
    i = yStart + ligne * yIncrement;
    z = complex(r, i);
    m = complexeModule(z);

    hslColorMax = 140;
    profondeurMax = hslColorMax * 2;

    profondeur = mandelbrot(z, profondeurMax);
    if (profondeur === profondeurMax) return 'black';
    return hslColor(hslColorMax - profondeur * hslColorMax / profondeurMax, '90%', '35%');
}