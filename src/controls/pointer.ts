export const pointer = initBind();

function initBind() {
    const isTouch = !!('ontouchstart' in window);
    const isPointer = window.PointerEvent ? true : false;
    const isMSPointer = window.MSPointerEvent ? true : false;

    const starters: string[] = [];
    const changers: string[] = [];
    const enders: string[] = [];
    const prevents: string[] = [];

    if (isPointer) {
        starters.push("pointerdown");
        enders.push("pointerup", "pointercancel");
        changers.push("pointermove");
        prevents.push("touchstart", "touchmove", "touchend");
    } else if (isMSPointer) {
        starters.push("MSPointerDown");
        changers.push("MSPointerMove");
        enders.push("MSPointerUp");
    } else if (isTouch) {
        starters.push("touchstart", "mousedown");
        changers.push("touchmove");
        enders.push("touchend", "touchcancel", "mouseup");
    } else {
        starters.push("mousedown");
        changers.push("mousemove");
        enders.push("mouseup");
    }

    return {
        starters,
        changers,
        enders,
        prevents
    };
}

export interface PointerState {
    x: number,
    y: number,
    button: number,
}

export function getPointerState(e: Event, el: HTMLElement): PointerState {
    if (e.type.match(/^touch/)) {
        const evt = e as TouchEvent;
        const rect = el.getBoundingClientRect();
        return {
            x: evt.targetTouches[0].clientX - rect.x,
            y: evt.targetTouches[0].clientY - rect.y,
            button: 0,
        };
    } else if (e.type.match(/^pointer/)) {
        const evt = e as PointerEvent;
        return {
            x: evt.offsetX,
            y: evt.offsetY,
            button: 0,
        }
    } else {
        const evt = e as MouseEvent;
        return {
            x: evt.offsetX,
            y: evt.offsetY,
            button: 0,
        }
    }
}
