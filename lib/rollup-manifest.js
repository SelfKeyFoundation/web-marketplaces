const fs = require("fs");

const defaults = {
  manifestName: "entrypoint.hashmanifest.json"
};

const manifest = function(opts = {}) {
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
    },
    generateBundle(_outputOptions, bundle) {
      let map = {};
      const cssFile = Object.keys(bundle).find(key => key.endsWith('.css'));
      if (cssFile) {
        map['css'] = bundle[cssFile].fileName;
      }
      return Promise.all(inputs.map(id => this.resolve(id))).then(
        resolvedInputs => {
          for (const key of Object.keys(bundle)) {
            const idx = resolvedInputs.findIndex(input => input.id in (bundle[key].modules || {}));
            if (idx !== -1) {
              map[inputs[idx]] = bundle[key].fileName;
            }
          }
          fs.writeFileSync(opts.manifestName, JSON.stringify(map, null, "  "));
        }
      );
    }
  };
}

export { manifest };
export default manifest;