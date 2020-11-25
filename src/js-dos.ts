import { Emulators, CommandInterface } from "emulators";
import { EmulatorsUi } from "./emulators-ui";
import { Layers } from "./dom/layers";
import { Button } from "./controls/button";
import { EventMapping } from "./controls/nipple";
import { Mapper } from "./controls/keyboard";

declare const emulators: Emulators;

export type EmulatorFunction = "dosWorker" | "dosDirect" | "janus";

export interface DosOptions {
    emulatorFunction?: EmulatorFunction;
    clickToStart?: boolean;
}

export class DosInstance {
    emulatorsUi: EmulatorsUi;
    emulatorFunction: EmulatorFunction;
    layers: Layers;
    ciPromise?: Promise<CommandInterface>;

    private clickToStart: boolean;

    constructor(root: HTMLDivElement, emulatorsUi: EmulatorsUi, options: DosOptions) {
        this.emulatorsUi = emulatorsUi;
        this.emulatorFunction = options.emulatorFunction || "dosWorker";
        this.clickToStart = options.clickToStart || false;
        this.layers = this.emulatorsUi.dom.layers(root);
        this.layers.showLoadingLayer();
    }

    async run(bundleUrl: string): Promise<CommandInterface> {
        await this.stop();
        const emulatorsUi = this.emulatorsUi;
        if (this.emulatorFunction === "janus") {
            this.layers.setLoadingMessage("Connecting...");
            this.ciPromise = emulators[this.emulatorFunction](bundleUrl);
        } else {
            this.layers.setLoadingMessage("Downloading bundle...");
            const bundle = await emulatorsUi.persist.load(bundleUrl, emulators)
                .catch(() => emulatorsUi.network.resolveBundle(bundleUrl));
            this.ciPromise = emulators[this.emulatorFunction](bundle);
        }

        let ci: CommandInterface;
        try {
            this.layers.setLoadingMessage("Starting...");
            ci = await this.ciPromise;
        } catch (e) {
            this.layers.setLoadingMessage("Unexpected error occured...");
            this.layers.notyf.error({ message: "Can't start emulator look browser logs for more info"});
            console.error(e);
            throw e;
        }

        if (this.emulatorFunction === "janus") {
            emulatorsUi.graphics.video(this.layers, ci);
        } else {
            emulatorsUi.persist.save(bundleUrl, this.layers, ci, emulators);
            emulatorsUi.graphics.webGl(this.layers, ci);
            emulatorsUi.sound.audioNode(ci);
        }


        this.layers.setLoadingMessage("Waiting for config...");
        const config = await ci.config();
        const layersConfig = extractLayersConfig(config);
        const layersNames = Object.keys(layersConfig);

        const unbind = {
            keyboard: () => {/**/},
            gestures: () => {/**/},
            buttons: () => {/**/},
        };

        const changeLayer = (layerName: string) => {
            unbind.keyboard();
            unbind.gestures();
            unbind.buttons();

            unbind.keyboard = () => {/**/};
            unbind.gestures = () => {/**/};
            unbind.buttons = () => {/**/};

            const layer = layersConfig[layerName];
            if (layer === undefined) {
                return;
            }

            unbind.keyboard = emulatorsUi.controls.keyboard(this.layers, ci, layer.mapper);

            if (layer.gestures !== undefined && layer.gestures.length > 0) {
                unbind.gestures = emulatorsUi.controls.nipple(this.layers, ci, layer.gestures);
            }

            if (layer.buttons !== undefined && layer.buttons.length) {
                unbind.buttons = emulatorsUi.controls.button(this.layers, ci, layer.buttons);
            }
        }

        emulatorsUi.controls.options(this.layers, ci, layersNames, changeLayer);
        changeLayer("default");

        this.layers.setLoadingMessage("Ready");
        this.layers.hideLoadingLayer();

        if (this.clickToStart) {
            this.layers.showClickToStart();
        }

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

export type DosFactoryType = (root: HTMLDivElement, options?: DosOptions) => DosInstance;


interface LayerConfig {
    name: string,
    buttons: Button[],
    gestures: EventMapping[],
    mapper: Mapper,
};

type LayersConfig = {[index: string]: LayerConfig};

function extractLayersConfig(config: any): LayersConfig {
    if (config.layers !== undefined) {
        return config.layers;
    }

    const gestures = config.gestures;
    const buttons = config.buttons;
    const mapper = config.mapper;

    return {
        default: {
            name: "fallback",
            gestures: gestures || [],
            buttons: buttons || [],
            mapper: mapper || {},
        }
    };
}
