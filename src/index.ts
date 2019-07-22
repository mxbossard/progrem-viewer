import { ProgremService, ProgremConfig } from "./core/ProgremService";
import { ScreenConfig } from "./core/ScreenService";

let screenConfig = new ScreenConfig(20);
let progremConfig = new ProgremConfig(17, 17, 1);

ProgremService.buildProgrem('./progrems/coeur_progrem.js', screenConfig, progremConfig);