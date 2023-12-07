const Owner = ({ state, account }) => {
  async function addAuthorisation(event) {
    event.preventDefault();
    const { contract } = state;

    const address = document.querySelector("#addAuthorised").value;

    try {
      await contract.methods
        .addAuthorised(address)
        .send({ from: account, gas: 1000000 });
      alert("authoried succesfully");
    } catch (error) {
      alert(error);
    }
  }

  async function removeAuthorisation(event) {
    event.preventDefault();
    const { contract } = state;

    const address = document.querySelector("#removeAuthorised").value;

    try {
      await contract.methods
        .removeAuthorised(address)
        .send({ from: account, gas: 1000000 });
      alert("removed succesfully");
    } catch (error) {
      alert(error);
    }
  }

  async function proposalCreation(event) {
    event.preventDefault();
    const { contract } = state;

    const Description = document.querySelector("#createProposal").value;

    try {
      await contract.methods
        .createProposal(Description)
        .send({ from: account, gas: 1000000 });
      alert("proposal created");
    } catch (error) {
      alert(error);
    }
  }

  async function proposalExecution(event) {
    event.preventDefault();
    const { contract } = state;

    const proposalId = document.querySelector("#executeProposal").value;

    try {
      await contract.methods
        .executeProposal(proposalId)
        .send({ from: account, gas: 1000000 });
      alert("proposal executed");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <div>
        <form onSubmit={addAuthorisation}>
          <label className="label1" htmlFor="addAuthorised">
            <span className="font">address:</span>
          </label>
          <input type="text" id="addAuthorised"></input>
          <button className="button" type="submit">
            Authorise
          </button>
        </form>

        <form onSubmit={removeAuthorisation}>
          <label className="label1" htmlFor="removeAuthorised">
            <span className="font">address:</span>
          </label>
          <input type="text" id="removeAuthorised"></input>
          <button className="button" type="submit">
            Remove Authorisation
          </button>
        </form>

        <form onSubmit={proposalCreation}>
          <label className="label1" htmlFor="createProposal">
            <span className="font">Description:</span>
          </label>
          <input type="text" id="createProposal"></input>
          <button className="button" type="submit">
            Create Proposal
          </button>
        </form>

        <form onSubmit={proposalExecution}>
          <label className="label1" htmlFor="executeProposal">
            <span className="font">Id:</span>
          </label>
          <input type="text" id="executeProposal"></input>
          <button className="button" type="submit">
            Execute
          </button>
        </form>
      </div>
    </>
  );
};

export default Owner;
