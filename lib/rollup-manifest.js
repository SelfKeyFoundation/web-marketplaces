const fs = require("fs");

const defaults = {
  manifestName: "entrypoint.hashmanifest.json"
};

const rollupManifest = function(opts = {}) {
  opts = Object.assign({}, defaults, opts);
  let inputs;
  return {
    name: "entrypoint-hashmanifest",
    options({ input }) {
      inputs = input;
      if (typeof inputs === "string") {
        inputs = [inputs];
      }
      if (typeof inputs === "object") {
        inputs = Object.values(inputs);
      }
      if (opts.stylesheet) {
        inputs.push(opts.stylesheet);
      }
    },
    generateBundle(_outputOptions, bundle) {
      let map = {};
      return Promise.all(inputs.map(id => this.resolve(id)))
        .then(resolvedInputs => {

          for (const key of Object.keys(bundle)) {
            if (bundle[key].type === 'asset') {
              map[key] = key;
            }
            else {
              const idx = resolvedInputs.findIndex(input => input.id in (bundle[key].modules || {}));
              if (idx !== -1) {
                map[inputs[idx]] = bundle[key].fileName;
              }
            }
          }

          fs.writeFileSync(opts.manifestName, JSON.stringify(map, null, "  "));
        }
      );
    }
  };
}

export { rollupManifest };