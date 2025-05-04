import axios from "axios";
import * as jose from "jose";

const BackendURL = "http://localhost:8080";
// const ServerPublicKey = await jose.importSPKI(await axios.get(`${BackendURL}/public-key`), "ES256");
const ServerPublicKey = "";
export { ServerPublicKey, BackendURL };
