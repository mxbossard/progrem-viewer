import { ProgremService, ProgremConfig } from "./ProgremService";

let progremConfig = new ProgremConfig(17, 17, 1);

var progremScope = {};

ProgremService.buildProgrem('./coeur_progrem.js', progremConfig);