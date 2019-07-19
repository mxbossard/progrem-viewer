
export abstract class HtmlHelper {

    static addClasses(elt: HTMLElement, classes: string|string[]): void {
        if (typeof classes === 'string') {
            classes.split(' ').forEach(c => elt.classList.add(c));
        }
        if (Array.isArray(classes)) {
            classes.forEach(c => elt.classList.add(c));
        }
    }

    static span(content: string|HTMLElement, classes: string|string[]): HTMLElement {
        let elt = document.createElement("span");
        HtmlHelper.addClasses(elt, classes);
        
        if (typeof content === 'string') {
            elt.innerText = content;
        } else {
            elt.appendChild(content);
        }
        
        return elt;
    }
}