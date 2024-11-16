import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "../backend/schema.graphql",
  config: {
    namingConvention: {
      enumValues: "keep",
    },
    scalars: {
      DateTime: "Date",
    },
  },
  documents: "src/**/*.graphql",
  generates: {
    "src/core/graphql/generated.tsx": {
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
    },
  },
};

export default config;
