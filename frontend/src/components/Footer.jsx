import React from "react";
import './css/Footer.css';

const developers = [
  { name: "Santiago Valencia Leon", github: "https://github.com/Gartner24" },
  { name: "Adrián Fernando Gaitán Londoño", github: "https://github.com/adriancho91s" },
  { name: "Arnovi Antonio Jimenez Velasquez", github: "https://github.com/Arnovii" },
  { name: "Juan David Garcia Arce", github: "https://github.com/Juandagarc" },
  { name: "Santiago Guevara Mendez", github: "https://github.com/DjSantech" },
  { name: "Jeronimo Riveros Perea", github: "https://github.com/Max1mus5" },
  { name: "Juan Pablo Sanchez Zapata", github: "https://github.com/jpsz2004" },
  { name: "Julian Andres Corral Gomez", github: "https://github.com/JulianCorralG" },
];

/**
 * Footer Component
 * Renders the footer section with developer information and legal notice.
 */
const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        {/* Developers section */}
        <div className="footer-developers">
          <p>Developers:</p>
          <ul>
            {/* Render each developer */}
            {developers.map((developer, index) => (
              <li key={index}>
                {/* Link to developer's GitHub profile */}
                <a href={developer.github} target="_blank" rel="noopener noreferrer">
                  {developer.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* Legal notice section */}
        <div className="footer-legal">
          <p>© 2023 Nike, Inc. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
