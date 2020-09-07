import { Emulators, CommandInterface } from "emulators";
import { EmulatorsUi } from "./emulators-ui";
import { Layers } from "./dom/layers";

declare const emulators: Emulators;

export class DosInstance {
    emulatorsUi: EmulatorsUi;
    layers: Layers;
    ciPromise?: Promise<CommandInterface>;

    constructor(root: HTMLDivElement, emulatorsUi: EmulatorsUi) {
        this.emulatorsUi = emulatorsUi;
        this.layers = this.emulatorsUi.dom.layers(root);
        this.layers.showLoadingLayer();
    }

    async run(bundleUrl: string): Promise<CommandInterface> {
        await this.stop();
        const emulatorsUi = this.emulatorsUi;
        const bundle = await emulatorsUi.persist.load(bundleUrl, emulators)
            .catch(() => emulatorsUi.network.resolveBundle(bundleUrl));

        this.ciPromise = emulators.dosWorker(bundle);

        const ci = await this.ciPromise;
        const config = await ci.config();

        emulatorsUi.persist.save(bundleUrl, this.layers, ci, emulators);
        emulatorsUi.graphics.webGl(this.layers, ci);
        emulatorsUi.sound.audioNode(ci);
        emulatorsUi.controls.keyboard(this.layers, ci);

        const gestures = (config as any).gestures;
        if (gestures && gestures.length) {
            emulatorsUi.controls.nippleArrows(this.layers, ci, gestures);
        }

        this.layers.hideLoadingLayer();
        return ci;
    }

    async stop(): Promise<void> {
        this.layers.showLoadingLayer();

        if (this.ciPromise === undefined) {
            return;
        }

        const ci = await this.ciPromise;
        delete this.ciPromise;
        await ci.exit();

        return;
    }
}

export type DosFactoryType = (root: HTMLDivElement) => DosInstance;
