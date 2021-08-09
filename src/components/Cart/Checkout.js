import useInput from '../../hooks/use-input';
import classes from './Checkout.module.css';

const checkIsNotEmpty = value => value.trim() !== '';
const checkIs16 = value => value.trim().length === 16;

const Checkout = props => {
  const {
    value: enteredName,
    isValid: isNameValid,
    hasError: nameHasError,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    clearInput: clearNameInput,
  } = useInput(checkIsNotEmpty);

  const {
    value: enteredStreet,
    isValid: isStreetValid,
    hasError: streetHasError,
    inputChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    clearInput: clearStreetInput,
  } = useInput(checkIsNotEmpty);

  const {
    value: enteredCity,
    isValid: isCityValid,
    hasError: cityHasError,
    inputChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    clearInput: clearCityInput,
  } = useInput(checkIsNotEmpty);

  const {
    value: enteredCreditCard,
    isValid: isCardValid,
    hasError: cardHasError,
    inputChangeHandler: cardChangeHandler,
    inputBlurHandler: cardBlurHandler,
    clearInput: clearCardInput,
  } = useInput(checkIs16);

  const isFormValid =
    isNameValid &&
    isStreetValid &&
    isCityValid &&
    isCardValid;

  const confirmOrderHandler = ev => {
    ev.preventDefault();
    if (!isFormValid) return;

    props.onSubmitOrder({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredCreditCard,
      city: enteredCity
    });

    clearNameInput();
    clearStreetInput();
    clearCityInput();
    clearCardInput();
  };

  const nameControlClasses = `${classes.control}
     ${!nameHasError ? '' : classes.invalid}`;

  const streetControlClasses = `${classes.control}
     ${!streetHasError ? '' : classes.invalid}`;

  const cityControlClasses = `${classes.control}
     ${!cityHasError ? '' : classes.invalid}`;

  const cardControlClasses = `${classes.control}
     ${!cardHasError ? '' : classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmOrderHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameHasError && <p>Please enter your name.</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' value={enteredStreet}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
        {streetHasError && <p>Please enter a street.</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' value={enteredCity}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        />
        {cityHasError && <p>Please enter your city.</p>}
      </div>
      <div className={cardControlClasses}>
        <label htmlFor='credit-card'>Credit card</label>
        <input type='text' id='credit-card' value={enteredCreditCard}
          onChange={cardChangeHandler}
          onBlur={cardBlurHandler}
        />
        {cardHasError && <p>Please enter your credit card.</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;