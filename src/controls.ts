import { CommandInterface } from "emulators";
import { DomLayers } from "./dom";

export function bindControls(layers: DomLayers, ci: CommandInterface) {
    layers.setOnKeyDown((keyCode: number) => {
        ci.sendKeyEvent(keyCode, true);
    });
    layers.setOnKeyUp((keyCode: number) => {
        ci.sendKeyEvent(keyCode, false);
    });
}
