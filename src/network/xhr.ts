import { Emulators } from "emulators";
import { Cache } from "emulators/dist/types/cache";

declare const emulators: Emulators;

export async function resolveBundle(url: string, cacheImpl?: Cache): Promise<Uint8Array> {
    const cache = cacheImpl || (await emulators.cache());
    try {
        return await cache.get(url).then((buffer) => new Uint8Array(buffer as ArrayBuffer));
    } catch {
        return new Promise<Uint8Array>((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open("GET", url, true);
            request.overrideMimeType("text/plain; charset=x-user-defined");
            request.addEventListener("error", (evt) => {
                reject(new Error("Network error, can't download " + url));
            });
            request.addEventListener("abort", () => {
                reject(new Error("Request canceled for url " + url));
            }, false);
            request.responseType = "arraybuffer";
            request.onreadystatechange = () => {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        resolve(new Uint8Array(request.response));
                    } else {
                        reject(new Error("Network error, can't download " + url));
                    }
                }
            };
            request.send();
        });
    }
}
