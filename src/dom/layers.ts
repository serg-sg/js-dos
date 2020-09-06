import { domToKeyCode } from "./keys";

// tslint:disable-next-line:no-var-requires
const elementResizeDetector = require("element-resize-detector");
const resizeDetector = elementResizeDetector({
});

export function layers(root: HTMLDivElement) {
    return new Layers(root);
}

export class Layers {
    root: HTMLDivElement;
    loading: HTMLDivElement;
    canvas: HTMLCanvasElement;
    mouseOverlay: HTMLDivElement;
    controls: HTMLDivElement;
    width: number;
    height: number;

    private onResize: (width: number, height: number) => void;
    private onKeyDown: (keyCode: number) => void;
    private onKeyUp: (keyCode: number) => void;
    private onSave: () => void;

    private controlsOpened = false;


    constructor(root: HTMLDivElement) {
        this.root = root;
        this.root.classList.add("emulator-root");

        this.canvas = document.createElement("canvas");
        this.canvas.className = "emulator-canvas";

        this.loading = createLoadingLayer();
        this.controls = createControlsLayer();
        this.mouseOverlay = createMouseOverlayLayer();

        this.root.appendChild(this.canvas);
        this.root.appendChild(this.mouseOverlay);
        this.root.appendChild(this.controls);
        this.root.appendChild(this.loading);

        this.width = root.offsetWidth;
        this.height = root.offsetHeight;

        this.onResize = () => { /**/ };
        this.onKeyDown = () => { /**/ };
        this.onKeyUp = () => { /**/ };
        this.onSave = () => { /**/ };

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
        });

        window.addEventListener("keyup", (e) => {
            const keyCode = domToKeyCode(e.keyCode);
            this.onKeyUp(keyCode);
        });

        const controlToggle = (this.controls.querySelector(".emulator-control-toggle") as HTMLDivElement);
        const sendButton = (this.controls.querySelector(".emulator-control-send-icon") as HTMLDivElement);
        const sendInput = (this.controls.querySelector(".emulator-control-input-input") as HTMLInputElement);
        const saveButton = (this.controls.querySelector(".emulator-control-save-icon") as HTMLInputElement);
        const fullscreenButton = (this.controls.querySelector(".emulator-control-fullscreen-icon") as HTMLInputElement);

        controlToggle.onclick = () => {
            this.controlsOpened = !this.controlsOpened;

            if (this.controlsOpened) {
                controlToggle.innerHTML = "&#9650;";
                this.controls.style.marginTop = "0px";
            } else {
                controlToggle.innerHTML = "&#9660;";
                this.controls.style.marginTop = "-40px";
            }
        };

        sendInput.addEventListener("keydown", (e) => e.stopPropagation());
        sendInput.addEventListener("keyup", (e) => e.stopPropagation());

        sendButton.onclick = () => {
            const intervalMs = 16;
            const toSend = sendInput.value.toUpperCase();
            for (let i = 0; i < toSend.length; ++i) {
                const charCode = toSend.charCodeAt(i);
                const keyCode = domToKeyCode(charCode);
                setTimeout(() => this.onKeyDown(keyCode), intervalMs * (2 * i));
                setTimeout(() => this.onKeyUp(keyCode), intervalMs * (2 * i + 1));
            }
            sendInput.value = "";
        };

        saveButton.onclick = () => {
            this.onSave();
        };

        fullscreenButton.onclick = () => {
            if (fullscreenButton.classList.contains("emulator-enabled")) {
                fullscreenButton.classList.remove("emulator-enabled");
                if (this.root.classList.contains("emulator-fullscreen-workaround")) {
                    this.root.classList.remove("emulator-fullscreen-workaround");
                } else if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if ((document as any).webkitExitFullscreen) {
                    (document as any).webkitExitFullscreen();
                } else if ((document as any).webkitExitFullscreen) {
                    (document as any).mozCancelFullScreen();
                } else if ((document as any).msExitFullscreen) {
                    (document as any).msExitFullscreen();
                }
            } else {
                fullscreenButton.classList.add("emulator-enabled");
                const element = this.root as any;
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                } else if (element.webkitEnterFullscreen) {
                    element.webkitEnterFullscreen();
                } else {
                    this.root.classList.add("emulator-fullscreen-workaround");
                }
            }
        };

        this.root.onfullscreenchange = () => {
            if (document.fullscreenElement !== this.root) {
                fullscreenButton.classList.remove("emulator-enabled");
            }
        }
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

    setOnSave(handler: () => void) {
        this.onSave = handler;
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

function createControlsLayer() {
    return createDiv("emulator-controls", `
<div class='emulator-control-pane'>
  <div class='emulator-control-input'>
    <div class='emulator-control-input-icon'></div>
    <div class='emulator-control-input-wrapper'>
      <input class='emulator-control-input-input' type="text">
    </div>
    <div class='emulator-control-send-icon'></div>
  </div>
  <div class='emulator-control-save-icon'></div>
  <div class='emulator-control-fullscreen-icon'></div>
</div>

<div class='emulator-control-toggle'>
&#9660;
</div>
</div>
`);
}

function createMouseOverlayLayer() {
    return createDiv("emulator-mouse-overlay", "");
}
