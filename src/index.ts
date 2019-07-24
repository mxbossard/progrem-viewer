import { ProgremService} from "./core/ProgremService";
import { ScreenConfig } from "./core/ScreenService";

let screenConfig = new ScreenConfig(20);

ProgremService.buildProgrem('./progrems/coeur_progrem.js', screenConfig);