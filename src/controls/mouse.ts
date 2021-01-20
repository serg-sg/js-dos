import { CommandInterface } from "emulators";
import { Layers } from "../dom/layers";

export function mouse(layers: Layers,
                      ci: CommandInterface) {
    function mapXY(x: number, y: number) {
        const frameWidth = ci.width();
        const frameHeight = ci.height();
        const containerWidth = layers.width;
        const containerHeight = layers.height;

        const aspect = frameWidth / frameHeight;

        let width = containerWidth;
        let height = containerWidth / aspect;

        if (height > containerHeight) {
            height = containerHeight;
            width = containerHeight * aspect;
        }

        const top = (containerHeight - height) / 2;
        const left = (containerWidth - width) / 2;

        return {
            x: Math.max(0, Math.min(frameWidth, (x - left) * (frameWidth / width))),
            y: Math.max(0, Math.min(frameWidth, (y - top) * (frameHeight / height))),
        };
    }

    layers.setOnMouseDown((x: number, y: number, button: number) => {
        const xy = mapXY(x, y);
        ci.sendMouseMotion(xy.x, xy.y);
        ci.sendMouseButton(button, true);
    });

    layers.setOnMouseUp((x: number, y: number, button: number) => {
        ci.sendMouseButton(button, false);
    });

    layers.setOnMouseMove((x: number, y: number) => {
        const xy = mapXY(x, y);
        ci.sendMouseMotion(xy.x, xy.y);
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
