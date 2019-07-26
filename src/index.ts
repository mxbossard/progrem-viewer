import { ProgremService} from "./core/ProgremService";
import { ScreenConfig } from "./core/ScreenService";

let screenConfig = new ScreenConfig(20);

ProgremService.buildProgrem('./progrems/mandelbrot_set_progrem.js', screenConfig);