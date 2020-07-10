import { CommandInterface } from "emulators";
import { Layers } from "../dom/layers";

export function keyboard(layers: Layers, ci: CommandInterface) {
    layers.setOnKeyDown((keyCode: number) => {
        ci.sendKeyEvent(keyCode, true);
    });
    layers.setOnKeyUp((keyCode: number) => {
        ci.sendKeyEvent(keyCode, false);
    });

    ci.events().onExit(() => {
        layers.setOnKeyDown((keyCode: number) => { /**/ });
        layers.setOnKeyUp((keyCode: number) => { /**/ });
    });
}
