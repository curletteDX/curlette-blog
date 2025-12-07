import type { CLIConfiguration } from "@uniformdev/cli";

const config: CLIConfiguration = {
  serialization: {
    format: "yaml",
    mode: "mirror",
    directory: "./uniform-data",
    entitiesConfig: {
      aggregate: {},
      asset: {
        mode: "create",
      },
      category: {
        mode: "create",
      },
      component: {},
      componentPattern: {
        publish: true,
        mode: "create",
      },
      composition: {
        publish: true,
        mode: "create",
      },
      compositionPattern: {
        publish: true,
        mode: "create",
      },
      contentType: {},
      dataType: {
        mode: "create",
      },
      enrichment: {},
      entry: {
        publish: true,
        mode: "create",
      },
      entryPattern: {
        publish: true,
        mode: "create",
      },
      locale: {
        mode: "create",
      },          
      previewUrl: { 
        mode: "create",
      },
      previewViewport: {
        mode: "create",
      },      
      projectMapDefinition: {
        mode: "create",
      },
      projectMapNode: {
        mode: "create",
      },
      prompt: {},
      quirk: {
        mode: "create",
      },
      redirect: {},
      signal: {},
      test: {},
      workflow: {},      
    },
  },
};

module.exports = config;