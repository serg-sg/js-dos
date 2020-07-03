import { domToKeyCode } from "./keys";

var elementResizeDetector = require("element-resize-detector");
const resizeDetector = elementResizeDetector({
});

export class DomLayers {
    root: HTMLDivElement;
    loading: HTMLDivElement;
    canvas: HTMLCanvasElement;
    width: number;
    height: number;

    private onResize: (width: number, height: number) => void;
    private onKeyDown: (keyCode: number) => void;
    private onKeyUp: (keyCode: number) => void;


    constructor(root: HTMLDivElement) {
        this.root = root;
        this.root.classList.add("emulator-root");

        this.canvas = document.createElement("canvas");
        this.canvas.className = "emulator-canvas";

        this.loading = createLoadingLayer();

        this.root.appendChild(this.canvas);
        this.root.appendChild(this.loading);

        this.width = root.offsetWidth;
        this.height = root.offsetHeight;

        this.onResize = () => {};
        this.onKeyDown = () => {};
        this.onKeyUp = () => {};

        resizeDetector.listenTo(this.root, (el: HTMLElement) => {
            if (el !== root) {
                return;
            }

            this.width = el.offsetWidth;
            this.height = el.offsetHeight;
            this.onResize(this.width, this.height);
        });

        window.addEventListener("keydown", (e) => {
            const keyCode = domToKeyCode(e.keyCode);
            this.onKeyDown(keyCode);
        }, true);

        window.addEventListener("keyup", (e) => {
            const keyCode = domToKeyCode(e.keyCode);
            this.onKeyUp(keyCode);
        }, true);
    }

    setOnResize(handler: (width: number, height: number) => void) {
        this.onResize = handler;
    }

    setOnKeyDown(handler: (keyCode: number) => void) {
        this.onKeyDown = handler;
    }

    setOnKeyUp(handler: (keyCode: number) => void) {
        this.onKeyUp = handler;
    }

    hideLoadingLayer() {
        this.loading.style.visibility = "hidden";
    }

    showLoadingLayer() {
        this.loading.style.visibility = "visible";
    }
}

function createDiv(className: string, innerHtml: string) {
    const el = document.createElement("div");
    el.className = className;
    el.innerHTML = innerHtml;
    return el;
}

function createLoadingLayer() {
    return createDiv("emulator-loading", `
<div class='emulator-loading-inner'>
<pre class='emulator-loading-pre-1'>
        _                __
       (_)____      ____/ /___  _____ _________  ____ ___
      / / ___/_____/ __  / __ \\/ ___// ___/ __ \\/ __ \`__ \\
     / (__  )_____/ /_/ / /_/ (__  )/ /__/ /_/ / / / / / /
  __/ /____/      \\__,_/\\____/____(_)___/\\____/_/ /_/ /_/
 /___/
</pre>
<pre class='emulator-loading-pre-2'>
</pre>
</div>
`);
}
