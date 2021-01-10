import { CommandInterface } from "emulators";
import { Layers } from "../dom/layers";

export function mouse(layers: Layers,
                      ci: CommandInterface) {
    layers.setOnMouseDown((x: number, y: number, button: number) => {
        ci.sendMouseMotion(x * ci.width(), y * ci.height());
        ci.sendMouseButton(button, true);
    });

    layers.setOnMouseUp((x: number, y: number, button: number) => {
        ci.sendMouseButton(button, false);
    });

    layers.setOnMouseMove((x: number, y: number) => {
        ci.sendMouseMotion(x * ci.width(), y * ci.height());
    });

    const exitFn = () => {
        layers.setOnMouseDown((x: number, y: number, button: number) => {
        });

        layers.setOnMouseUp((x: number, y: number, button: number) => {
        });

        layers.setOnMouseMove((x: number, y: number) => {
        });
    };

    ci.events().onExit(exitFn);
    return exitFn;
}
