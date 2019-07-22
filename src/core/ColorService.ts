import { ColorProvider, ColorProviderFactory } from "./Types";
import { create as md5Create } from 'js-md5';

export class BasicColorProviderFactory implements ColorProviderFactory {
    build(key?: string): ColorProvider {
        return new BasicColorProvider();
    }
}

export class BasicColorProvider implements ColorProvider {

    private colorMap: Map<string, number> = new Map();

    public hslColor(hue: number): string {
        return 'hsl(' + hue + ', 100%, 80%)';
    }

    public hashStringToColor(key: string, colorCount: number, shift: number = 2) {
        var hue = this.colorMap.get(key);
        if (hue) return this.hslColor(hue);

        var hash = md5Create().update(key).toString();
        
        hue = ( parseInt(hash.substring(shift + 0, shift + 1), 16) + 16 * parseInt(hash.substring(shift + 1, shift + 2), 16) + 256 * parseInt(hash.substring(shift + 2, shift + 3), 16) );
        hue = Math.floor(hue % colorCount) * 360 / colorCount;
        hue = hue % 360;

        // Color deduplication
        while (!this.colorMap.get(key)) {
            let duplicateColor = false;
            for (let c of this.colorMap.values()) {
                if (Math.abs(c - hue) < Math.floor(180 / colorCount)) {
                    duplicateColor = true;
                    hue += Math.floor(270 / colorCount);
                    hue = hue % 360;
                    break;
                }
            }
            if (!duplicateColor) {
                this.colorMap.set(key, hue);
            }
        }
        
        //var pastel = 'hsl(' + hue + ', 100%, 87.5%)';
        return this.hslColor(hue);
    }
}

export namespace ColorService {

    export const colorProvideractory: ColorProviderFactory = new BasicColorProviderFactory();

}
