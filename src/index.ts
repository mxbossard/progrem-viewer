import { ProgremService, ProgremConfig } from "./ProgremService";
import { ScreenConfig } from "./ScreenService";

let screenConfig = new ScreenConfig(20);
let progremConfig = new ProgremConfig(17, 17, 1);

ProgremService.buildProgrem('./progrems/coeur_progrem.js', screenConfig, progremConfig);