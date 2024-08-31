const bip39 = require("bip39");
const bs58 = require("bs58");
const ed25519_hd_key = require("ed25519-hd-key");
const mnemonic = bip39.generateMnemonic();
const nacl = require("tweetnacl"); // Updated import statement
console.log("Generated Mnemonic:", mnemonic);
const seed = bip39.mnemonicToSeedSync(mnemonic);
console.log(seed);
let accountCount = 0;

let keyPair = [];

window.createComponent = function (keyValuePair) {
  const accountdetails = document.createElement("div");
  accountdetails.setAttribute("class", "accountdetails");
  const accName = document.createElement("div");
  accName.setAttribute("class", "text--color");
  accName.innerHTML = keyValuePair.accountName;
  const wallet = document.createElement("div");
  wallet.setAttribute("class", "wallet");
  const crptologo = document.createElement("img");
  crptologo.setAttribute("class", "cryptologo");
  crptologo.setAttribute("src", "logo.png");
  const keys = document.createElement("div");
  keys.setAttribute("class", "keys");
  const publickey = document.createElement("div");
  publickey.setAttribute("class", "publickey");
  const publickeyVal = document.createElement("div");
  publickeyVal.setAttribute("class", "text--color publickey--value");
  publickeyVal.innerHTML = keyValuePair.publicKey;
  const copylogo = document.createElement("img");
  copylogo.setAttribute("class", "copy");
  copylogo.setAttribute(
    "src",
    "file_copy_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png"
  );
  publickey.appendChild(publickeyVal);
  publickey.appendChild(copylogo);
  keys.appendChild(publickey);
  wallet.appendChild(crptologo);
  wallet.appendChild(keys);
  accountdetails.appendChild(accName);
  accountdetails.appendChild(wallet);
  return accountdetails;
};

window.render = function () {
  document.querySelector(".accountswrapper").innerHTML = "";
  const values = localStorage.getItem("keyPair");
  const keys = JSON.parse(values);
  console.log(keys);
  for (let i = 0; i < keys.length; i++) {
    const accountdetails = createComponent(keys[i]);
    const accountswrapper = document.querySelector(".accountswrapper");
    accountswrapper.appendChild(accountdetails);
  }
};

window.createMnemonic = function () {
  const mnemonic = bip39.generateMnemonic();
  sessionStorage.setItem("mnemonic", mnemonic);
  createKeys(mnemonic);
  renderMnemonics(mnemonic);
};

function createKeys(mnemonic) {
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  let path = `m/44'/501'/${accountCount}'/0'`; // This is the derivation path
  const derivedSeed = ed25519_hd_key.derivePath(path, seed.toString("hex")).key;
  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
  console.log(secret);
  const keypair = solanaWeb3.Keypair.fromSecretKey(secret); // Use Keypair from solanaWeb3
  const publicKey = keypair.publicKey.toBase58();
  accountCount++;
  keyPair.push({
    accountName: `Account ${accountCount}`,
    privateKey: bs58.default.encode(secret),
    publicKey: publicKey,
  });
  localStorage.setItem("keyPair", JSON.stringify(keyPair));
}

function createMnemonicComponent(word) {
  const worddiv = document.createElement("div");
  worddiv.setAttribute("class", "mnemonic--phrase");
  worddiv.innerHTML = word;
  return worddiv;
}

function renderMnemonics(mnemonic) {
  let count = 1;
  const ScrectPhrase = document.querySelector(".ScrectPhrase");
  ScrectPhrase.innerHTML = mnemonic;
  const root = document.querySelector(".root");
  const mnemonicdiv = document.querySelector(".mnemonic");
  root.classList.toggle("hide");
  document.querySelector(".mnemonicwrapper").classList.toggle("hide");
  mnemonicdiv.innerHTML = "";
  const mnemonicArr = mnemonic.split(" ");
  console.log(mnemonicArr);
  for (let i = 1; i <= mnemonicArr.length; i++) {
    const word = createMnemonicComponent(`${i}. ${mnemonicArr[i - 1]}`);
    mnemonicdiv.appendChild(word);
  }
}

window.copyToClipBoard = function () {
  const ScrectPhrase = document.querySelector(".ScrectPhrase");
  console.log("called");
  console.log();
  navigator.clipboard.writeText(ScrectPhrase.innerHTML);
  const copyToClipBoard = document.querySelector(".copyToClipBoard");
  copyToClipBoard.classList.toggle("hide");
  const copied = document.querySelector(".copied");
  copied.classList.toggle("hide");
  setTimeout(() => {
    copied.classList.toggle("hide");
    copyToClipBoard.classList.toggle("hide");
  }, 5000);
};
