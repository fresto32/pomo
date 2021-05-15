"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfiguration = void 0;
const fs_1 = require("fs");
const setup_action_1 = require("../actions/setup.action");
function getConfiguration() {
    try {
        return JSON.parse(fs_1.readFileSync(setup_action_1.CONFIGURATION_FILEPATH).toString());
    }
    catch (_a) {
        return setup_action_1.DEFAULT_CONFIGURATION;
    }
}
exports.getConfiguration = getConfiguration;
