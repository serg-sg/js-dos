import { CommandInterface } from "emulators";
import { Layers } from "../dom/layers";
import { pointer, getPointerState } from "../controls/pointer";

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


    function onMouseDown(x: number, y: number, button: number) {
        const xy = mapXY(x, y);
        ci.sendMouseMotion(xy.x, xy.y);
        ci.sendMouseButton(button, true);
    };

    function onMouseUp(x: number, y: number, button: number) {
        ci.sendMouseButton(button, false);
    };

    function onMouseMove(x: number, y: number) {
        const xy = mapXY(x, y);
        ci.sendMouseMotion(xy.x, xy.y);
    };

    const el = layers.mouseOverlay;


    function preventDefaultIfNeeded(e: Event) {
        // not needed yet
    };

    const onStart = (e: Event) => {
        const state = getPointerState(e, el);
        onMouseDown(state.x, state.y, state.button);
        e.stopPropagation();
        preventDefaultIfNeeded(e);
    };

    const onChange = (e: Event) => {
        const state = getPointerState(e, el);
        onMouseMove(state.x, state.y);
        e.stopPropagation();
        preventDefaultIfNeeded(e);
    };

    const onEnd = (e: Event) => {
        const state = getPointerState(e, el);
        onMouseUp(state.x, state.y, state.button);
        e.stopPropagation();
        preventDefaultIfNeeded(e);
    };

    const onPrevent = (e: Event) => {
        e.stopPropagation();
        preventDefaultIfNeeded(e);
    };
    const options = {
        capture: false,
    }

    for (const next of pointer.starters) {
        el.addEventListener(next, onStart, options);
    }
    for (const next of pointer.changers) {
        el.addEventListener(next, onChange, options);
    }
    for (const next of pointer.enders) {
        el.addEventListener(next, onEnd, options);
    }
    for (const next of pointer.prevents) {
        el.addEventListener(next, onPrevent, options);
    }


    const exitFn = () => {
        for (const next of pointer.starters) {
            el.removeEventListener(next, onStart, options);
        }
        for (const next of pointer.changers) {
            el.removeEventListener(next, onChange, options);
        }
        for (const next of pointer.enders) {
            el.removeEventListener(next, onEnd, options);
        }
        for (const next of pointer.prevents) {
            el.removeEventListener(next, onPrevent, options);
        }
    };

    ci.events().onExit(exitFn);
    return exitFn;
}
