"use server";

import axios from "axios";
import * as jose from "jose";

const BackendURL = "http://localhost:8080";
const JWKPublicKey = (await axios.get(`${BackendURL}/utilities/public-key`))
    .data;
const ServerPublicKey = await jose.importJWK(JWKPublicKey, "RSA-OAEP");

export async function encrypt(data: string) {
    const encryptedData = await new jose.CompactEncrypt(
        new TextEncoder().encode(data)
    )
        .setProtectedHeader({ alg: "RSA-OAEP", enc: "A128GCM" })
        .encrypt(ServerPublicKey);
    return encryptedData;
}
