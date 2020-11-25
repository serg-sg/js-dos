import { CommandInterface } from "emulators";
import { Layers } from "../dom/layers";
import { createButton, ButtonSize, toBind } from "./button";

export function options(layers: Layers,
                        ci: CommandInterface,
                        layersNames: string[],
                        onLayerChange: (layer: string) => void) {
    const scale = 1;
    const size = ButtonSize * scale;
    const ident = size / 4;

    let visible = false;

    const children: HTMLElement[] = [
        createSelectForLayers(layersNames, onLayerChange),
        createButton("keyboard", {
            onClick: () => {},
        }, 1.0),
        createButton("save", {
            onClick: () => { layers.save(); }
        }, 1.0),
        createButton("fullscreen", {
            onClick: () => { layers.toggleFullscreen(); },
        }, 1.0),
        createButton("options", {
            onClick: () => {
                visible = !visible;
                const visibility = visible ? "visible" : "hidden";
                for (const next of children) {
                    if (next == options) {
                        continue;
                    }

                    next.style.visibility = visibility;
                }
            }
        }, 1.0)
    ];
    const options = children[children.length - 1];
    const fullscreen = children[children.length - 2];

    layers.setOnFullscreen((fullscreenEnabled) => {
        if (fullscreenEnabled) {
            if (!fullscreen.classList.contains("emulator-control-exit-fullscreen-icon")) {
                fullscreen.classList.add("emulator-control-exit-fullscreen-icon");
            }
        } else {
            fullscreen.classList.remove("emulator-control-exit-fullscreen-icon");
        }
    });

    const container = createDiv("emulator-options");
    for (const next of children) {
        next.style.marginRight = ident + "px";
        if (next !== options) {
            next.style.visibility = "hidden";
        }
        container.appendChild(next);
    }

    container.style.position = "absolute";
    container.style.right = "0";
    container.style.top = ident + "px";

    layers.mouseOverlay.appendChild(container);
    ci.events().onExit(() => {
        layers.mouseOverlay.removeChild(container);
        layers.setOnFullscreen(() => {/**/});
    });
}

function createSelectForLayers(layers: string[], onChange: (layer: string) => void) {
    if (layers.length <= 1) {
        return document.createElement("div");
    }

    const select = document.createElement("select");
    select.classList.add("emulator-control-select");


    for (const next of layers) {
        const option = document.createElement("option");
        option.value = next;
        option.innerHTML = next;
        select.appendChild(option);
    }

    select.onchange = (e: any) => {
        const layer = e.target.value;
        onChange(layer);
    };

    const onStop = (e: Event) => {
        e.stopPropagation();
    };
    const onPrevent = (e: Event) => {
        e.stopPropagation();
        e.preventDefault();
    };
    const options = {
        capture: true,
    };
    for (const next of toBind.starters) {
        select.addEventListener(next, onStop, options);
    }
    for (const next of toBind.enders) {
        select.addEventListener(next, onStop, options);
    }
    for (const next of toBind.prevents) {
        select.addEventListener(next, onPrevent, options);
    }

    return select;
}

function createDiv(className: string, innerHtml?: string) {
    const el = document.createElement("div");
    el.className = className;
    if (innerHtml !== undefined) {
        el.innerHTML = innerHtml;
    }
    return el;
}
