const bip39 = require("bip39");
const bs58 = require("bs58");
console.log(bs58.default.decode);
const ed25519_hd_key = require("ed25519-hd-key");
const mnemonic = bip39.generateMnemonic();
const nacl = require("tweetnacl"); // Updated import statement
console.log("Generated Mnemonic:", mnemonic);
const seed = bip39.mnemonicToSeedSync(mnemonic);
console.log(seed);
let accountCount = 0;

let keyPair = [];

let generateMnemonicBtn = document.querySelector(".generate-mnemonic--btn");
let generatedMnemonic = document.querySelector(".mnemonic");
let addAccount = document.querySelector(".add-account--btn");
let privateKeyDiv = document.querySelector(".private-key");
let publicKeyDiv = document.querySelector(".pulic-key");
generateMnemonicBtn.addEventListener("click", () => {
  generatedMnemonic.textContent = mnemonic;
  document.querySelector(".add-account").classList.toggle("hidden");
});

addAccount.addEventListener("click", () => {
  let path = `m/44'/501'/${accountCount}'/0'`; // This is the derivation path
  const derivedSeed = ed25519_hd_key.derivePath(path, seed.toString("hex")).key;
  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
  console.log(secret);
  const keypair = solanaWeb3.Keypair.fromSecretKey(secret); // Use Keypair from solanaWeb3
  const publicKey = keypair.publicKey.toBase58();
  console.log(publicKey);
  accountCount++;
  keyPair.push({
    privateKey: bs58.default.encode(secret),
    publicKey: publicKey,
  });
  // privateKeyDiv.textContent = secret;
  // privateKeyDiv.textContent = publicKey;
  const arr1 = keyPair
    .map((item) => {
      return `<div class="pulic-key">${item.publicKey}</div><div class="private-key">${item.privateKey}</div>`;
    })
    .join("");
  document.querySelector(".key-pair").innerHTML = arr1;
});
