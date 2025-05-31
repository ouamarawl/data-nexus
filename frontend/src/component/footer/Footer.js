import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

function Footer() {
  const socialLinks = [
    {
      href: "https://www.instagram.com/nexusshop.dz?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      icon: faInstagram,
      label: "Instagram",
    },
    {
      href: "https://www.facebook.com/share/166YdKEXhq/",
      icon: faFacebook,
      label: "Facebook",
    },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            Nexus Shop is your trusted online store for the latest tech trends.
          </p>
        </div>

        <div className="footer-section">
          <h3>Find us on:</h3>
          <div className="social-links">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
              >
                <FontAwesomeIcon
                  icon={link.icon}
                  size="2x"
                  style={{ margin: "0 10px", color: "#23221D" }}
                />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>
            Email: <a href="mailto:nexusshop.dz@gmail.com">nexusshop.dz@gmail.com</a>
          </p>
          <p>Phone: +213 549 255 042</p>
        </div>

        <div className="footer-section">
          <h3>Transport Services</h3>
          <p>We offer fast and reliable delivery across Algeria.</p>
        </div>

        <div className="footer-section">
          <h3>Payment Method</h3>
          <p>Cash on delivery available for all orders.</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Nexus Shop. All rights reserved.</p>
        <p>Developed by Ouamara Wail & Amine Haicheur</p>
        <p>email: ouamara.wail8@gmail.com & mohamedamine123076@gmail.com</p>
        <p>GitHub: mohamedamine019 & ouamarawl</p>
      </div>
    </footer>
  );
}

export default Footer;
