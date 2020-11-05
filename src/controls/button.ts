import { CommandInterface } from "emulators";
import { Layers } from "../dom/layers";
import { namedKeyCodes } from "../dom/keys";

export type ActionType = "click" | "hold";
// hold - means track press/release events separately

export interface Button {
    action: ActionType,
    mapTo: number,
    size?: number,
    symbol?: string,
    style?: ElementCSSInlineStyle;
}

const toBind = initBind();
const keyCodeToName = initKeyCodeToName();

function initBind() {
    const isTouch = !!('ontouchstart' in window);
    const isPointer = window.PointerEvent ? true : false;
    const isMSPointer = window.MSPointerEvent ? true : false;

    const starters: string[] = [];
    const enders: string[] = [];

    if (isPointer) {
        starters.push("pointerdown");
        enders.push("pointerup", "pointercancel");
    } else if (isMSPointer) {
        starters.push("MSPointerDown");
        enders.push("MSPointerUp");
    } else if (isTouch) {
        starters.push("touchstart", "mousedown");
        enders.push("touchend", "touchcancel", "mouseup");
    } else {
        starters.push("mousedown");
        enders.push("mouseup");
    }

    return {
        starters,
        enders,
    };
}

function initKeyCodeToName() {
    const keyCodeToName: {[keyCode: number]: string} = {};
    for (const next of Object.keys(namedKeyCodes)) {
        keyCodeToName[namedKeyCodes[next]] = next.substr(4, 4 + 2);
    }
    return keyCodeToName;
}

export function button(layers: Layers,
                       ci: CommandInterface,
                       buttons: Button[]) {
    for (const next of buttons) {
        const action = next.action;
        const size = next.size || 64;
        const symbol = (next.symbol || keyCodeToName[next.mapTo]).toUpperCase();
        const button = createDiv("emulator-button", symbol !== undefined ? symbol : "□");
        if (next.style) {
            for (const prop of Object.keys(next.style)) {
                (button.style as any)[prop] = (next.style as any)[prop];
            }
        }
        button.style.width = size + "px";
        button.style.height = size + "px";
        button.style.lineHeight = size + "px";
        button.style.fontSize = size / 2 + "px";
        const onStart = (e: Event) => {
            if (action === "hold") {
                layers.fireKeyDown(next.mapTo);
            } else {
                layers.fireKeyPress(next.mapTo);
            }
            e.stopPropagation();
            e.preventDefault();
        };
        const onEnd = (e: Event) => {
            if (action === "hold") {
                layers.fireKeyUp(next.mapTo);
            }
            e.stopPropagation();
            e.preventDefault();
        };
        const options = {
            capture: true,
        }
        for (const next of toBind.starters) {
            button.addEventListener(next, onStart, options);
        }
        for (const next of toBind.enders) {
            button.addEventListener(next, onEnd, options);
        }
        layers.mouseOverlay.appendChild(button);

        ci.events().onExit(() => {
            layers.mouseOverlay.removeChild(button);
        });
    }
}

function createDiv(className: string, innerHtml: string) {
    const el = document.createElement("div");
    el.className = className;
    el.innerHTML = innerHtml;
    return el;
}
