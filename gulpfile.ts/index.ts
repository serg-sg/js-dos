import { series, parallel } from "gulp";
import { emulatorsUi } from "./emulators-ui";
import { examples } from "./examples";

import { emitTypes } from "./types";

exports.default = series(
    parallel(emulatorsUi, emitTypes),
    examples,
);


