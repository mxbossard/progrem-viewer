import { ProgremService, ProgremConfig } from "./ProgremService";

let progremConfig = new ProgremConfig(17, 17, 1);

ProgremService.buildProgrem('./coeur_progrem.js', progremConfig);