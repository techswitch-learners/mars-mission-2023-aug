import "./Area51Page.scss";
import { useState, useEffect } from "react";
import image from "../assets/image-area-51-no-access.png";
import { Link } from "react-router-dom";

const checkSecurityCookie = () => {
  const cookieName = "security-clearance";
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${encodeURIComponent(cookieName)}=`)) {
      const [, cookieValue] = cookie.split("=");
      const cookieVal = decodeURIComponent(cookieValue);
      return cookieVal === "super-secret-cleared";
    }
  }
  return false;
};

function Area51Page() {
  const [securityCleared, setSecurityCleared] = useState<boolean>();

  useEffect(() => {
    const cookieVal = checkSecurityCookie();
    setSecurityCleared(cookieVal);
  }, []);

  return securityCleared ? (
    <div className="Area51__cleared">
      <h1>Area 51.</h1>
      <h2 className="Area51__classification">TOP SECRET</h2>
      <p>
        You have now been cleared to find out the most secret discoveries from
        our Mars mission.
      </p>
      <p>
        On May 1, 2009, the Spirit rover got stuck on its travels over the Mars
        surface. One of the last images the rover transmitted back to Earth was
        a "selfie" image which shows our most conclusive evidence of Martian
        life.
      </p>
      <p>
        We believe that the rover has been completely scrapped for parts now
      </p>
      <img
        src="https://paul7dxb.github.io/hosted-assets/mars/martian-selfie.jpeg"
        className="Area51__cleared__image"
      />
      <h2 className="Area51__classification">TOP SECRET</h2>
    </div>
  ) : (
    <div className="Area51__forbidden">
      <h1>You shouldn't be here</h1>
      <img
        src={image}
        className="Area51__forbidden__image"
        alt="men in black"
      />
      <Link className="Area51__forbidden__Link" to="/">
        Take me Home
      </Link>
    </div>
  );
}

export default Area51Page;
