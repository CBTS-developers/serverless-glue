"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerlessHelper = void 0;
var ServerlessHelper = (function () {
    function ServerlessHelper(serverless) {
        this.serverless = serverless;
        this.resources =
            this.serverless.service.provider.compiledCloudFormationTemplate.Resources;
        this.output =
            this.serverless.service.provider.compiledCloudFormationTemplate.Outputs;
    }
    ServerlessHelper.prototype.getPluginConfig = function () {
        return this.serverless.configSchemaHandler.serverless.configurationInput
            .Glue;
    };
    ServerlessHelper.prototype.appendToTemplate = function (node, elementName, cfElement) {
        switch (node) {
            case "resources":
                this.resources[elementName] = cfElement;
                break;
            case "outputs":
                this.output[elementName] = cfElement;
                break;
        }
    };
    ServerlessHelper.prototype.log = function (message) {
        this.serverless.cli.log("[Serverless-Glue]: ".concat(message));
    };
    return ServerlessHelper;
}());
exports.ServerlessHelper = ServerlessHelper;
