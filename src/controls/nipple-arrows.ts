// tslint:disable-next-line
const nipplejs = require("nipplejs");

import { KBD_left, KBD_right, KBD_up, KBD_down, KBD_f1 } from "../dom/keys";

import { CommandInterface } from "emulators";
import { Layers } from "../dom/layers";

export type Event =
    "dir:up" | "dir:down" | "dir:left" | "dir:right" |
    "plain:up" | "plain:down" | "plain:left" | "plain:right" |
    "tap";

export interface EventMapping {
    joystickId: 0 | 1,
    event: Event,
    mapTo: number;
}

export const defaultMapping: EventMapping[] = [
    { joystickId: 0, event: "dir:up", mapTo: KBD_up },
    { joystickId: 0, event: "dir:down", mapTo: KBD_down },
    { joystickId: 0, event: "dir:left", mapTo: KBD_left },
    { joystickId: 0, event: "dir:right", mapTo: KBD_right },
];

export function nippleArrows(layers: Layers,
                             ci: CommandInterface,
                             optionalMapping?: EventMapping[]) {
    const mapping = optionalMapping || defaultMapping;

    const manager = nipplejs.create({
        zone: layers.mouseOverlay,
        multitouch: true,
        maxNumberOfNipples: 2,
    });

    let pressed = -1;

    const press = (keyCode: number) => {
        ci.sendKeyEvent(keyCode, true);
        pressed = keyCode;
    }

    const release = () => {
        if (pressed !== -1) {
            ci.sendKeyEvent(pressed, false);
            pressed = -1;
        }
    }

    const tapJoysticks: {[index: number]: number} = {};
    const usedTimes: {[index: number]: number} = {
    };
    for (const next of mapping) {
        if (next.event === "tap") {
            tapJoysticks[next.joystickId] = next.mapTo;
        } else {
            manager.on(next.event, () => {
                usedTimes[next.joystickId] = Date.now();
                release();
                press(next.mapTo);
            });
        }
    }

    const startTimes: {[index: number]: number} = {
    };
    manager.on("start", () => {
        const id = manager.ids.length - 1;
        startTimes[id] = Date.now();
    });

    manager.on("end", () => {
        const id = manager.ids.length - 1;
        const delay = Date.now() - startTimes[id];
        if (tapJoysticks[id] && delay < 500 && usedTimes[id] < startTimes[id]) {
            ci.simulateKeyPress(tapJoysticks[id]);
        }
    });

    ci.events().onExit(() => {
        manager.destroy();
    });
}

