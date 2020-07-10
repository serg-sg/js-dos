import { Emulators } from "emulators";
import { Cache } from "emulators/dist/types/cache";

declare const emulators: Emulators;

export async function resolveBundle(bundleUrl: string, cacheImpl?: Cache): Promise<Uint8Array> {
    const cache = cacheImpl || (await emulators.cache());
    return cache.get(bundleUrl)
        .catch(() => {
            return new Promise<ArrayBuffer>((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open("GET", bundleUrl, true);
                xhr.overrideMimeType("text/plain; charset=x-user-defined");
                xhr.addEventListener("error", (evt) => {
                    reject(new Error("Network error, can't download " + bundleUrl));
                });
                xhr.responseType = "arraybuffer";
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            resolve(xhr.response);
                        } else {
                            reject(new Error("Network error, can't download " + bundleUrl));
                        }
                    }
                };
                xhr.send();
            });
        })
        .then((buffer) => new Uint8Array(buffer as ArrayBuffer));
}
