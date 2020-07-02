import { Emulators, CommandInterface } from "emulators";

import { resolveBundle } from "./resolve-bundle";
import { bindCanvasToCi } from "./webgl-render";

declare var emulators: Emulators;

export async function DosCanvasUi(canvas: HTMLCanvasElement,
                                  bundleUrl: string,
                                  emulatorsImpl?: Emulators): Promise<CommandInterface> {
    const impl = emulatorsImpl || emulators;
    const cache = await impl.cache();
    const bundleData: Uint8Array = await resolveBundle(bundleUrl, cache);
    return impl.dosWorker(bundleData).then((ci) => {
        bindCanvasToCi(canvas, ci);
        return ci;
    });
}

(window as any).dosCanvasUi = DosCanvasUi;
