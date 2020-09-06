import { CommandInterface, Emulators } from "emulators";
import { Layers } from "../dom/layers";

export function save(key: string,
                     layers: Layers,
                     ci: CommandInterface,
                     emulators: Emulators) {
    layers.setOnSave(async () => {
        const cache = await emulators.cache();
        const updated = await ci.persist();
        cache.put(key, updated.buffer);
    });
}

export async function load(key: string,
                           emulators: Emulators) {
    const cache = await emulators.cache();
    return cache.get(key).then((buffer) => new Uint8Array(buffer as ArrayBuffer));
}
