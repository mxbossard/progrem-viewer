
export abstract class HtmlHelper {

    static addClasses(elt: HTMLElement, classes: string|string[]): void {
        if (typeof classes === 'string') {
            classes.split(' ').forEach(c => elt.classList.add(c));
        }
        if (Array.isArray(classes)) {
            classes.forEach(c => elt.classList.add(c));
        }
    }

    static span(classes: string|string[], content?: string|HTMLElement|HTMLElement[]): HTMLElement {
        let elt = document.createElement("span");
        if (classes) {
            HtmlHelper.addClasses(elt, classes);
        }

        if (typeof content === 'string') {
            elt.innerText = content;
        } else if (Array.isArray(content)) {
            content.forEach(c => elt.appendChild(c));
        } else if (content) {
            elt.appendChild(content);
        }
        
        return elt;
    }
}