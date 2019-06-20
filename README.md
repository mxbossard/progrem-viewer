# progrem-viewer

Demo du viewer de la branche master ici : https://raw.githack.com/mxbossard/progrem-viewer/master/dist/index.html

## Modules / Composants

### ProgremScheduler
Responsable de l'enchainement des etats du Progrem.
reset(): ProgremState
current(): ProgremState
next(): ProgremState

### ProgremCode
Responsable de la lecture du code et de son execution.
iterator(ProgremState): CodeIterator

### ProgremGrid
Responsable de l'affichage de la grille du Progrem.
clear(): void

### ProgremInspector
Responsable de l'affichage de l'inspecteur du code du Progrem.
clear(): void

## Reflexions

### HtmlTree
Objectif : peindre l'HTML et controler l'ajout et le retrait de classes CSS à partir de BaseNode.
paintInto(HTMLElement): void
styleClasses(): string[]
addStyleClasses(BaseNode, string[]): void
resetStyle(): void

### HtmlTreeFactory
Responsable de la construction d'arbre HTML pour l'affichage.
build(ProgremCode): HtmlTree

### CssBuilder
Responsable de la construction de la feuille de style. Ceci est fortement lié au HtmlTree, car c'est lui qui affecte les classes CSS qui devront être décorées par le CssBuilder.
build(HtmlTree): string

### ColorSupplier
Responsable du choix des couleurs.
background(String): String
text(String): String