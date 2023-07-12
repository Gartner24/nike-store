import React from "react";
import './css/Footer.css'
const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-section">
          <h4>GIFT CARDS</h4>
        </div>
        <div className="footer-section">
          <h4>FIND A STORE</h4>
        </div>
        <div className="footer-section">
          <h4>NIKE JOURNAL</h4>
        </div>
        <div className="footer-section">
          <h4>BECOME MEMBER</h4>
        </div>
        <div className="footer-section">
          <h4>STUDENT DISCOUNT</h4>
        </div>
        <div className="footer-section">
          <h4>FEEDBACK</h4>
        </div>
        <div className="footer-section">
          <h4>PROMOTIONAL CODES</h4>
        </div>
        <div className="footer-section">
          <h4>HELP</h4>
        </div>
      </div>
        <div className="footer-legal">
          <p>Guides     |    </p>
          <p>Terms of Use    |    </p>
          <p>Terms of Sale    |     </p>
          <p>Legal Notice    |    </p>
          <p>Privacy & Cookies Policy    |    </p>
          <p>Cookie settings    |    </p>
          <p>© 2023 Nike, Inc. All rights reserved </p>
        </div>
    </footer>
  );
};

export default Footer;