import Navbar from "../components/navbar";
import Us from "../assets/2wheretowin.png";
import "../App.css";
import ig from "../assets/instagramlogo.svg";

function contactUs() {
  return (
    <div className="contactUsPage">
      <Navbar variant="back" />
      <div className="contactFormat">
        <div className="Text">
          <div className="social">
            <h1>Email</h1>
            <p>WhereTUWin@gmail.com</p>
          </div>
          <div className="social">
            <div className="inlinething">
              <img src={ig} style={{ width: "28px" }}></img>
              <h1>Instagram</h1>
            </div>
            <p>WhereTUWin</p>
          </div>
        </div>
        <img src={Us} className="picUs"></img>
      </div>
    </div>
  );
}

export default contactUs;
