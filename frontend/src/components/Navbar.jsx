import * as React from "react";
import "./css/navbar.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import StoreIcon from "@mui/icons-material/Store";
import InfoIcon from "@mui/icons-material/Info";
import LoginIcon from "@mui/icons-material/Login";

const Navbar = () => {
  console.log();
  return (
    <div>
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
              <Link to="/about">
                <InfoIcon className="ico" />
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
    </div>
    // <div className='App'>
    // 	<header className='App-menu'>
    // 		<div className='options'>
    // 			<a href='/'><img src={logo} alt='Logo' className='logo' /></a>
    // 			<div className='options'>
    // 				<Link to='/store'>
    // 					<p className='option-1'>
    // 						<span className='material-symbols-outlined'>
    // 							store
    // 						</span>
    // 						store
    // 					</p>
    // 				</Link >
    // 				<Link to='/About'>
    // 				<p className='option-2'>
    // 					<span className='material-symbols-outlined'>
    // 						info
    // 					</span>
    // 					About
    // 				</p>
    // 				</Link>
    // 				<Link to='/login'>
    // 					<p className='option-3'>
    // 						<span className='material-symbols-outlined'>
    // 							login
    // 						</span>
    // 						Login
    // 					</p>
    // 				</Link>
    // 			</div>
    // 		</div>
    // 	</header>
    // </div>
  );
};

export default Navbar;
