import { Emulators } from "emulators";
import { Cache } from "emulators/dist/types/cache";

declare const emulators: Emulators;

export async function resolveBundle(url: string,
                                    options?: {
                                        cache?: Cache | null,
                                        onprogress?: (progress: number) => void
                                    }): Promise<Uint8Array> {
    const cache = options?.cache;
    const onprogress = options?.onprogress;

    try {
        if (cache === null) {
            throw new Error("no-cache");
        }
        const cacheImpl = cache || await emulators.cache();
        const buffer = await cacheImpl.get(url) as ArrayBuffer;
        if (onprogress !== undefined) {
            onprogress(100);
        }
        return new Uint8Array(buffer)
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
                        if (onprogress !== undefined) {
                            onprogress(100);
                        }
                        resolve(new Uint8Array(request.response));
                    } else {
                        reject(new Error("Network error, can't download " + url));
                    }
                }
            };
            if (onprogress !== undefined) {
                request.onprogress = (event) => {
                    if (event.total && event.total > 0) {
                        const porgress = Math.round(event.loaded * 10000 / event.total) / 100;
                        onprogress(porgress);
                    }
                }
            }
            request.send();
        });
    }
}
