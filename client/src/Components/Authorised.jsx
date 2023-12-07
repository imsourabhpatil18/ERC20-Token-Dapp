const Authorised = ({ state, account }) => {
  async function tokenMint(event) {
    event.preventDefault();
    const { contract } = state;

    const addressFrom = document.querySelector("#mintTokenAddress").value;
    const amount = document.querySelector("#mintTokenAmount").value;

    try {
      await contract.methods
        .mintToken(addressFrom, amount)
        .send({ from: account, gas: 1000000 });
      alert("token minted");
    } catch (error) {
      alert(error);
    }
  }

  async function tokenBurn(event) {
    event.preventDefault();
    const { contract } = state;

    const addressFrom = document.querySelector("#burnTokenAddress").value;
    const amount = document.querySelector("#burnTokenValue").value;

    try {
      await contract.methods
        .burnToken(addressFrom, amount)
        .send({ from: account, gas: 1000000 });
      alert("token burned");
    } catch (error) {
      alert(error);
    }
  }

  async function addTokenHolder(event) {
    event.preventDefault();
    const { contract } = state;

    const holderAddress = document.querySelector("#addHolders").value;

    try {
      await contract.methods
        .addHolders(holderAddress)
        .send({ from: account, gas: 4000000 });
      alert("token holder added");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <div>
        <form onSubmit={tokenMint}>
          <label className="label1" htmlFor="mintTokenAddress">
            <span className="font">address:</span>
          </label>
          <input type="text" id="mintTokenAddress"></input>
          <label className="label1" htmlFor="mintTokenAmount">
            <span className="font">Amount:</span>
          </label>
          <input type="text" id="mintTokenAmount"></input>

          <button className="button" type="submit">
            Mint
          </button>
        </form>

        <form onSubmit={tokenBurn}>
          <label className="label1" htmlFor="burnTokenAddress">
            <span className="font">address:</span>
          </label>
          <input type="text" id="burnTokenAddress"></input>
          <label className="label1" htmlFor="burnTokenValue">
            <span className="font">Amount:</span>
          </label>
          <input type="text" id="burnTokenValue"></input>
          <button className="button" type="submit">
            Burn
          </button>
        </form>

        <form>
          <label className="label1" htmlFor="voteProposal">
            <span className="font">Id:</span>
          </label>
          <input type="text" id="voteProposal"></input>
          <button className="button" type="submit">
            Vote
          </button>
        </form>
      </div>
    </>
  );
};

export default Authorised;
