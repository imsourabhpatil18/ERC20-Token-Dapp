import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Authorised from "./Components/Authorised";
import Owner from "./Components/Owner";
import SourabhToken from "../contract/SourabhToken.json";

import "./App.css";
import Web3 from "web3";

import Navbar from "./Components/navbar";

function App() {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });
  const [account, setAccount] = useState(null);
  const [buttonText, setButtonText] = useState("connect Wallet");

  useEffect(() => {
    async function init() {
      // const provider = new Web3.providers.HttpProvider(
      // "https://eth-sepolia.g.alchemy.com/v2/L391508YD70GVdSZaKD2eEfbag12Jm8x"
      // );

      const web3 = new Web3(
        "https://eth-sepolia.g.alchemy.com/v2/L391508YD70GVdSZaKD2eEfbag12Jm8x"
      );
      const contractABI = SourabhToken.abi;

      const contract = new web3.eth.Contract(
        contractABI,
        "0xC74161d1426e3a4AD4C6725129955fa544AEE282"
      );

      setState({ web3: web3, contract: contract });
    }
    init();
  }, []);

  async function connectWallet() {
    const { contract } = state;
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      //when metamask is installed
      try {
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(account[0]);
        setButtonText("connected");
      } catch (error) {
        console.log(error);
      }
    } else {
      //when metamask is not installed
      console.log("Install Metamask");
    }
  }

  return (
    <Router>
      <>
        <div className="App">
          <Navbar />
          <div className="wallet-connect-container">
            <h3>Account Address :{account}</h3>

            <button onClick={connectWallet}>{buttonText}</button>
          </div>

          <h1>WELCOME</h1>

          <Routes>
            <Route
              path="/authorised"
              element={<Authorised state={state} account={account} />}
            />
            <Route
              path="/owner"
              element={<Owner state={state} account={account} />}
            />
          </Routes>
        </div>
      </>
    </Router>
  );
}

export default App;
