import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
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
    "src/libs/graphql/generated.tsx": {
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
    },
  },
  overwrite: true,
  schema: "../backend/schema.graphql",
};

export default config;
