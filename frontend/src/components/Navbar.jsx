import * as React from "react";
import "./css/navbar.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import StoreIcon from "@mui/icons-material/Store";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import useStore from "../store/useStore";

function UserNavbar() {
  const isAuthenticated = useStore(state => state.isAuthenticated);

  return (
    <header className="App-menu">
      <Link to="/">
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <nav>
        <ul className="options">
          <li>
            <Link to="/store">
              <StoreIcon className="ico" />
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <PersonIcon className="ico" />
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <ShoppingCartIcon className="ico" />
            </Link>
          </li>
          <li>
            <Link to="/" onClick={logout}>
              <LogoutIcon className="ico" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

const AdminNavbar = () => {
  const isAuthenticated = useStore(state => state.isAuthenticated);

  return (
    <header className="App-menu">
      <Link to="/">
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <nav>
        <ul className="options">
          <li>
            <Link to="/">
              <HomeIcon className="ico" />
            </Link>
          </li>
          <li>
            <Link to="/store">
              <StoreIcon className="ico" />
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard">
              <PersonIcon className="ico" />
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <ShoppingCartIcon className="ico" />
            </Link>
          </li>
          <li>
            <Link to="/" onClick={logout}>
              <LogoutIcon className="ico" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

const UnregisteredNavbar = () => {
  return (
    <header className="App-menu">
      <Link to="/">
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <nav>
        <ul className="options">
          <li>
            <Link to="/">
              <HomeIcon className="ico" />
            </Link>
          </li>
          <li>
            <Link to="/about">
              <InfoIcon className="ico" />
            </Link>
          </li>
          <li>
            <Link to="/store">
              <StoreIcon className="ico" />
            </Link>
          </li>
          <li>
            <Link to="/login">
              <LoginIcon className="ico" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

const Navbar = () => {
  const isAuthenticated = useStore(state => state.isAuthenticated);
  const isAdmin = useStore(state => state.isAdmin);

  if (isAuthenticated && isAdmin) {
    return <AdminNavbar />;
  } else if (isAuthenticated) {
    return <UserNavbar />;
  } else {
    return <UnregisteredNavbar />;
  }
}

export default Navbar;
