var distifyPackage = require("./../index.js");

distifyPackage('./src/react.jsx', "./build", {
  isReact: true,
  // isModule: true
})
