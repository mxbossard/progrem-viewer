
export abstract class HtmlHelper {

    static addClasses(elt: HTMLElement, classes: string|string[]): void {
        if (typeof classes === 'string') {
            classes.split(' ').forEach(c => elt.classList.add(c));
        }
        if (Array.isArray(classes)) {
            classes.forEach(c => elt.classList.add(c));
        }
    }

    static span(classes: string|string[], content?: string|HTMLElement|(HTMLElement|string)[]): HTMLElement {
        let elt = document.createElement("span");
        if (classes) {
            HtmlHelper.addClasses(elt, classes);
        }

        if (typeof content === 'string') {
            elt.innerText = content;
            console.log(`content: [${content}]`);
        } else if (content instanceof HTMLElement) {
            elt.appendChild(content);
        } else if (Array.isArray(content)) {
            content.forEach(c => {
                if (typeof c === 'string') {
                    elt.innerHTML += c;
                } else if (c) {
                    elt.appendChild(c);
                } else {
                    console.log('Unable to add content:', c);
                }
            })
        }
        
        return elt;
    }

    static defineCssRules(id: string, cssRules: string): void {
        let cssId = 'css-' + id;
        let styleElement = document.getElementById(cssId);
        if(!styleElement) {
            styleElement = document.createElement('style');
        }
        styleElement.id = cssId;
        /* add style rules to the style element */
        styleElement.appendChild(document.createTextNode(cssRules));
        
        /* attach the style element to the document head */
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
}