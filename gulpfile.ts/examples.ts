import { src, dest, series, parallel } from "gulp";
import del from "del";

import size from "gulp-size";
import browserify from "browserify";
import buffer from "vinyl-buffer";
import source from "vinyl-source-stream";

// tslint:disable-next-line:no-var-requires
const tsify = require("tsify");

function clean() {
    return del(["examples/emulators/*",
                "examples/emulators-ui/*"], { force: true });
};

function copyEmulators() {
    return src(["node_modules/emulators/dist/*"])
        .pipe(dest("examples/emulators/"));
};

function copyEmulatorsUi() {
    return src(["dist/*"])
        .pipe(dest("examples/emulators-ui/"));
};


export const examples = series(clean, parallel(copyEmulators, copyEmulatorsUi));
