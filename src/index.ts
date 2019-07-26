import { ProgremService} from "./core/ProgremService";
import { ScreenConfig } from "./core/ScreenService";

let screenConfig = new ScreenConfig(20);

let progremMap = {
    'diagonale': './progrems/diagonale_glissante_progrem.js',
    'coeur': './progrems/coeur_progrem.js',
    'mandelbrot': './progrems/mandelbrot_set_progrem.js',
    'gradient': './progrems/gradient_progrem.js',
    'phare': './progrems/phare_chreach.js',
    'sapin': './progrems/sapin_exponentiel.js',
};

let progremSelector = document.getElementsByClassName('progrem-selector')[0] as HTMLSelectElement;
if (progremSelector) {
    //console.log('progremSelector:', progremSelector);
    for (let key in progremMap) {
        let progremOption = document.createElement('option');
        progremOption.innerHTML = key;
        progremSelector.appendChild(progremOption);
    }

    progremSelector.onchange = function(event) {
        let progremKey = event.target.value;
        console.log('Select new progrem:', progremKey);
        let progremPath = progremMap[progremKey];
        console.log('New progrem path:', progremPath);

        ProgremService.buildProgrem(progremPath, screenConfig);
    }
}

let progremPath = './progrems/diagonale_glissante_progrem.js';
//let progremPath = './progrems/phare_chreach.js';

ProgremService.buildProgrem(progremPath, screenConfig);