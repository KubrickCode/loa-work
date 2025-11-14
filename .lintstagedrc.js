module.exports = {
  "src/backend/**/*.ts": () => "just lint backend",
  "src/frontend/**/*.{ts,tsx}": () => "just lint frontend",
  "src/go/**/*.go": () => "just lint go",
  "**/*.{json,yml,yaml,md}": () => "just lint config",
  justfile: () => "just lint justfile",
};
