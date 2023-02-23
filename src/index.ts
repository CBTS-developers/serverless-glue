import { ServerlessService } from "./services/serverless.service";
import { GlueSchema } from "./schemas/glue.schema";

class GluePlugin {
  serverless: any;
  options: any;
  hooks: any;

  constructor(serverless: any, options: any) {
    this.serverless = serverless;
    this.options = options;

    this.configGlueSchema();

    this.hooks = {
      "aws:package:finalize:mergeCustomProviderResources":
        this.deploy.bind(this),
      "after:deploy:finalize":
        this.uploadScripts.bind(this)
    };
  }

  async deploy() {
    const service = new ServerlessService(this.serverless);
    await service.main();
  }

  async uploadScripts() {
    const service = new ServerlessService(this.serverless);
    await service.uploadScripts();
  }

  configGlueSchema() {
    if (this.serverless.configSchemaHandler) {
      this.serverless.configSchemaHandler.defineTopLevelProperty(
        "Glue",
        GlueSchema
      );
    }
  }
}

module.exports = GluePlugin;
