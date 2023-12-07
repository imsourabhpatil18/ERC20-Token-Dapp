import { Link } from "react-router-dom";

import "./navbar.css";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <a>
          <Link to="/walletConnect">Home</Link>
        </a>
        <a>
          <Link to="/authorised">Authorised</Link>
        </a>
        <a>
          <Link to="/owner">Owner</Link>
        </a>
      </div>
    </>
  );
};

export default Navbar;
