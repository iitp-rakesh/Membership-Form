import {
  FaEnvelope,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhone,
  FaWhatsapp,
  FaYoutube
} from "react-icons/fa";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col">
            <img src="/logo-01.png" alt="Logo" className="footer-logo" />
            <div className="social-links">
              <a href="https://www.instagram.com/navprayas.np/" target="_blank" rel="noreferrer">
                <FaInstagram />
              </a>
              <a href="https://www.youtube.com/@Navprayas2k00" target="_blank" rel="noreferrer">
                <FaYoutube />
              </a>
              <a href="https://in.linkedin.com/company/navprayas" target="_blank" rel="noreferrer">
                <FaLinkedinIn />
              </a>
              <a href="https://whatsapp.com/channel/0029VbAgY9H9xVJX2uTCRz1v" target="_blank" rel="noreferrer">
                <FaWhatsapp />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Contact Us</h4>
            <div className="contact">
              <div className="phone">
                <FaPhone />
                <span>&nbsp;&nbsp;+91 9153223740</span>
              </div>
              <div className="email">
                <FaEnvelope />
                <span>&nbsp;&nbsp;navprayas.np2000@gmail.com</span>
              </div>
              <div className="location">
                <FaMapMarkerAlt />
                <span>
                  &nbsp;&nbsp;Navprayas, Main Office, House No. GE0090733, Ground Floor, Manpur Patwatoli, PO + PS
                  Buniyadganj, Gaya-823003, Bihar, India
                </span>
              </div>
            </div>
          </div>

          <div className="footer-col">
            <h4>Key References</h4>
            <ul>
              <li>
                <a href="#privacy">Privacy Policies</a>
              </li>
              <li>
                <a href="https://certi-verify.navprayas.in/" target="_blank" rel="noreferrer">
                  Verify Certificate
                </a>
              </li>
              <li>
                <a href="#terms">Terms and Conditions</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Important Links</h4>
            <ul>
              <li>
                <a href="#results">Results</a>
              </li>
              <li>
                <a href="#suggestions">Suggestions</a>
              </li>
              <li>
                <a href="#faqs">FAQs</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="copyright">
        <p>Copyright &copy;2025 by Navprayas. All Rights Reserved</p>
      </div>
    </div>
  );
}

export default Footer;
