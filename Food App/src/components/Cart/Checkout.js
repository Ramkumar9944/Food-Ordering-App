import "./Checkout.css";
import { useState } from "react";
import delivery from "../../assets/delivery.png";

const Checkout = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredStreet, setEnteredStreet] = useState("");
  const [enteredPostal, setEnteredPostal] = useState("");
  const [enteredCity, setEnteredCity] = useState("");
  const [isNameValid, setNameValid] = useState(true);
  const [isStreetValid, setStreetValid] = useState(true);
  const [isPostalValid, setPostalValid] = useState(true);
  const [isCityValid, setCityValid] = useState(true);

  const NameHandler = (event) => {
    let name = event.target.value;
    if (name.trim().length < 1 || name.trim().length > 10) {
      setNameValid(false);
    } else {
      setEnteredName(event.target.value);
      setNameValid(true);
    }
  };
  const StreetHandler = (event) => {
    let street = event.target.value;
    if (street.trim().length < 1 || street.trim().length > 64) {
      setStreetValid(false);
    } else {
      setEnteredStreet(event.target.value);
      setStreetValid(true);
    }
  };
  const PostalHandler = (event) => {
    let postal = event.target.value;
    if (postal.trim().length < 1 || postal.trim().length > 7) {
      setPostalValid(false);
    } else {
      setEnteredPostal(event.target.value);
      setPostalValid(true);
    }
  };
  const CityHandler = (event) => {
    let city = event.target.value;
    if (city.trim().length < 1 || city.trim().length > 25) {
      setCityValid(false);
    } else {
      setEnteredCity(event.target.value);
      setCityValid(true);
    }
  };
  const confirmHandler = (event) => {
    event.preventDefault();
    if (
      enteredName.trim().length === 0 ||
      enteredStreet.trim().length === 0 ||
      enteredPostal.trim().length === 0 ||
      enteredCity.trim().length === 0
    ) {
      setNameValid(false);
      setStreetValid(false);
      setPostalValid(false);
      setCityValid(false);
    } else {
      props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        postal: enteredPostal,
        city: enteredCity,
      });
      setEnteredName("");
      setEnteredStreet("");
      setEnteredPostal("");
      setEnteredCity("");
    }
  };
  return (
    <form className="checkout-form" onSubmit={confirmHandler}>
      <div className="control">
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={NameHandler}
          defaultValue={enteredName}
        />
        {!isNameValid && (
          <p style={{ color: "red" }}>Provide Valid Name (1 to 10 chars)</p>
        )}
      </div>
      <div className="control">
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={StreetHandler}
          defaultValue={enteredStreet}
        />
        {!isStreetValid && (
          <p style={{ color: "red" }}>Provide Valid Street (1 to 64 chars)</p>
        )}
      </div>
      <div className="control">
        <label htmlFor="postal">Postal Code</label>
        <input
          type="number"
          id="postal"
          onChange={PostalHandler}
          defaultValue={enteredPostal}
        />
        {!isPostalValid && (
          <p style={{ color: "red" }}>Provide Valid Postal Code</p>
        )}
      </div>
      <div className="control">
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={CityHandler}
          defaultValue={enteredCity}
        />
        {!isCityValid && (
          <p style={{ color: "red" }}>
            Provide Valid City Name (1 to 25 chars)
          </p>
        )}
      </div>
      <img className="delivery" src={delivery} alt="delivery" />
      <div className="actions">
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className="submit">Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
