const { ethers } = require("ethers");
// const ERC20_ABI = require("./Erc20.json");

const INFURA_ID = "";
const provider = new ethers.providers.JsonRpcProvider(
  "https://goerli.infura.io/v3/07844f3846764830b55e143f3d6f324d"
);

const account1 = "0x5D8CCC0e151Cb27CFc75124D5472df32583c8EC4"; // Your account address 1
const account2 = "0x5D1f57272f36f27f7B4656f07833Ebdc7C9B4cd1"; // Your account address 2

const privateKey1 =
  "ae6eb5a105b3557eada011913816e359cf9f792ab8645e557d4a8415f8330f03";
const wallet = new ethers.Wallet(privateKey1, provider);

const ERC20_ABI = [
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint amount) returns (bool)",
];
// otras funciones

// const ERC20ABI = [
//     "function name() view returns (string)",
//     "function symbol() view returns (string)",
//     "function totalSupply() view returns (uint256)",
//     "function balanceOf(address) view returns (uint)",
//   ];

const address = "0x319d484fA709D449dc60a5C916a1d229E589aB59";
const contract = new ethers.Contract(address, ERC20_ABI, provider);

const main = async () => {
  const balance = await contract.balanceOf(account1);

  console.log(`\nReading from ${address}\n`);
  console.log(`Balance of sender: ${balance}\n`);

  //   const name = await contract.name();
  //   const symbol = await contract.symbol();
  //   const totalSupply = await contract.totalSupply();
  //   const senderBalanceBefore = await provider.getBalance(account1);
  const contractWithWallet = contract.connect(wallet);

  const tx = await contractWithWallet.transfer(account2, "5000000000000");
  await tx.wait();

  console.log(tx);

  const balanceOfSender = await contract.balanceOf(account1);
  const balanceOfReciever = await contract.balanceOf(account2);

  console.log(`\nBalance of sender: ${balanceOfSender}`);
  console.log(`Balance of reciever: ${balanceOfReciever}\n`);
};

main();
