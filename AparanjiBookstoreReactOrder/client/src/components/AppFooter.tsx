import '../assets/css/AppFooter.css'
import '../assets/css/global.css'
import {Link} from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faDiamondTurnRight, faEnvelope, faPhone} from "@fortawesome/free-solid-svg-icons";
import {faFacebook, faInstagram, faXTwitter, faYoutube} from "@fortawesome/free-brands-svg-icons";

function AppFooter(){
return (
    // <footer className="container">
    //   <section className="links">
    //     <Link to="/">about</Link>
    //     <Link to="/">contact</Link>
    //     <Link to="/">directions</Link>
    //   </section>
    //   <section className="social-media-icons">
    //     <Link to="/" className="button">Facebook</Link>
    //     <Link to="/" className="button">Twitter</Link>
    //   </section>
    // </footer>
    <footer className="container">
        <Link to="/" className="footer-item">About</Link>
        <Link to="/" className="footer-item">Directions <FontAwesomeIcon icon={faDiamondTurnRight} /></Link>
        <section className="contact footer-item">
            <div>Contact Us</div>
            <div className="contact-icons">
                <Link className="contact-icon" to="/"><FontAwesomeIcon icon={faEnvelope} /></Link>
                <Link className="contact-icon" to="/"><FontAwesomeIcon icon={faPhone} /></Link>
            </div>

        </section>
        <section className="social-media-icons footer-item">
            <div>Social Media</div>
            <div className="social-icons">
                <Link className="social-icon" to="/"><FontAwesomeIcon icon={faFacebook} /></Link>
                <Link className="social-icon" to="/"><FontAwesomeIcon icon={faXTwitter} /></Link>
                <Link className="social-icon" to="/"><FontAwesomeIcon icon={faInstagram} /></Link>
                <Link className="social-icon" to="/"><FontAwesomeIcon icon={faYoutube} /></Link>
            </div>
        </section>
        <section className="copyright-info footer-item">
            <div>Copyright &copy; 2024 EnchantedPages</div>
        </section>
    </footer>
)
}

export default AppFooter;
