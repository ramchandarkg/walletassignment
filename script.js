import { generateMnemonic, mnemonicToSeedSync } from "./node_modules/bip39/";
const mnemonic = generateMnemonic;
console.log("Generated Mnemonic:", mnemonic);
const seed = mnemonicToSeedSync(mnemonic);
