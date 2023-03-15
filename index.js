const apiServ = require("./presentation/apiPres")
const port = 3001;

function main() {
    apiServ.start(port);
}

main();
