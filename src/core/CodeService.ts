import { ProgremFactory } from "./Types";
import { BasicEsprimaProgremFactory } from "../esprima/BasicEsprimaProgrem";

export namespace CodeService {

    export const progremFactory: ProgremFactory<any> = new BasicEsprimaProgremFactory();

    export function loadProgrem(fileUrl: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const client = new XMLHttpRequest();
            client.open('GET', fileUrl);
            client.onload = () => {
                let code = client.responseText;

                console.log('CodeService: Progrem loaded successfully.', code);
                resolve(code);
            };
            client.onerror = () => reject(client.statusText);
            client.send();
        });
    }

}