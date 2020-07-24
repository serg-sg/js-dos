const nipplejs = require("nipplejs");

import { KBD_left, KBD_right, KBD_up, KBD_down } from "../dom/keys";

import { CommandInterface } from "emulators";
import { Layers } from "../dom/layers";

export function nippleArrows(layers: Layers, ci: CommandInterface) {
    const manager = nipplejs.create({
        zone: layers.mouseOverlay,
    });

    let pressed = -1;

    const press = (keyCode: number) => {
        ci.sendKeyEvent(keyCode, true);
        pressed = keyCode;
    }

    const release = () => {
        if (pressed != -1) {
            ci.sendKeyEvent(pressed, false);
            pressed = -1;
        }
    }

    manager.on("dir:left", () => {
        release();
        press(KBD_left);
    });

    manager.on("dir:right", () => {
        release();
        press(KBD_right);
    });

    manager.on("dir:up", () => {
        release();
        press(KBD_up);
    });

    manager.on("dir:down", () => {
        release();
        press(KBD_down);
    });

    ci.events().onExit(() => {
        manager.destroy();
    });
}

