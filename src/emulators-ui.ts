import { Emulators, CommandInterface } from "emulators";

import { DomLayers } from "./dom";
import { resolveBundle } from "./resolve-bundle";
import { bindWebGlRenderer } from "./webgl-render";
import { Cache } from "emulators/dist/types/cache";

declare var emulators: Emulators;

export class Emulator {
    layers: DomLayers;

    constructor(root: HTMLDivElement) {
        this.layers = new DomLayers(root);
    }

    async runBundle(bundleUrl: string,
                    emulatorImpl: (bundle: Uint8Array) => Promise<CommandInterface>,
                    cacheImpl?: Promise<Cache>): Promise<CommandInterface> {
        const cache = await (cacheImpl || emulators.cache());
        const bundleData: Uint8Array = await resolveBundle(bundleUrl, cache);
        return emulatorImpl.apply(emulators, [bundleData]).then((ci) => {
            this.layers.hideLoadingLayer();
            bindWebGlRenderer(this.layers, ci);
            return ci;
        });
    }

}

export function CreateEmulator(root: HTMLDivElement) {
    return new Emulator(root);
}

(window as any).createEmulator = CreateEmulator;
