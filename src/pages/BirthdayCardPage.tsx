import { useState, useEffect, ChangeEvent } from "react";
import "./BirthdayCardPage.scss";
import { getPhotoOfTheDayData } from "../api/nasaApi";

const BirthdayCardPage = () => {
  const [photoOfTheDayTitle, setPhotoOfTheDayTitle] = useState<string>();
  const [photoOfTheDayUrl, setPhotoOfTheDayUrl] = useState<string>();
  console.log(photoOfTheDayUrl);
  useEffect(() => {
    getPhotoOfTheDayData()
      .then((data) => {
        setPhotoOfTheDayTitle(data.title);
        setPhotoOfTheDayUrl(data.url);
      })
      .catch(() => {
        setPhotoOfTheDayUrl("./assets/birthday-card-default.jpg");
        setPhotoOfTheDayTitle("Mars Rover");
      });
  }, []);

  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [sender, setSender] = useState("");

  function handleRecipientChange(event: ChangeEvent<HTMLInputElement>) {
    setRecipient(event.target.value);
  }
  function handleMessageChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setMessage(event.target.value);
  }
  function handleSenderChange(event: ChangeEvent<HTMLInputElement>) {
    setSender(event.target.value);
  }

  function handlePrint() {
    window.print();
  }

  return (
    <>
      <h1 className="BirthdayCardHeader">
        Create a personalised birthday card!
      </h1>
      <div className="BirthdayCardPage" id="BirthdayCardPage">
        <div className="BirthdayCardPage__image">
          <h5>NASA - Astronomy Picture of the Day:</h5>
          <img
            className="BirthdayCardPage__stamp"
            src="./assets/birthday-card-stamp.png"
            alt="NASA Postage Stamp"
          />
          {photoOfTheDayUrl && (
            <figure>
              <img
                className="BirthdayCardPage__photo"
                alt={photoOfTheDayTitle}
                src={photoOfTheDayUrl}
              />
              <figcaption>"{photoOfTheDayTitle}"</figcaption>
            </figure>
          )}
        </div>
        <hr className="BirthdayCardPage__hr" />
        <div className="BirthdayCardPage__BirthdayMessage">
          <div className="BirthdayCardPage__formcontrol BirthdayCardPage__formcontrol--recipient">
            <label htmlFor="recipient">To:</label>
            <input
              name="recipient"
              id="recipient"
              type="text"
              className="text-input"
              placeholder="Mark"
              onChange={handleRecipientChange}
              value={recipient}
            ></input>
          </div>
          <div className="BirthdayCardPage__formcontrol BirthdayCardPage__formcontrol--message">
            <label htmlFor="message">Message:</label>
            <textarea
              name="message"
              id="message"
              rows={5}
              cols={40}
              placeholder="Write your message here..."
              onChange={handleMessageChange}
              value={message}
            ></textarea>
          </div>
          <div className="BirthdayCardPage__formcontrol BirthdayCardPage__formcontrol--sender">
            <label htmlFor="sender">From:</label>
            <input
              name="sender"
              id="sender"
              type="text"
              className="text-input"
              placeholder="Elon xxx"
              onChange={handleSenderChange}
              value={sender}
            ></input>
          </div>
        </div>
      </div>
      <p className="Screenshot">
        Take a screenshot and send it to your friend!
      </p>
      <div className="Download-wrapper">
        <button className="Download-button" onClick={handlePrint}>
          Download Birthday Card!
        </button>
      </div>
    </>
  );
};

export default BirthdayCardPage;
