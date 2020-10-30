import { CommandInterface } from "emulators";
import { Layers } from "../dom/layers";

export function keyboard(layers: Layers, ci: CommandInterface) {
    layers.setOnKeyDown((keyCode: number) => {
        ci.sendKeyEvent(keyCode, true);
    });
    layers.setOnKeyUp((keyCode: number) => {
        ci.sendKeyEvent(keyCode, false);
    });
    layers.setOnKeyPress((keyCode: number) => {
        ci.simulateKeyPress(keyCode);
    });

    ci.events().onExit(() => {
        layers.setOnKeyDown((keyCode: number) => { /**/ });
        layers.setOnKeyUp((keyCode: number) => { /**/ });
        layers.setOnKeyPress((keyCode: number) => { /**/ });
    });
}
