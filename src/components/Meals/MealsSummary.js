import classes from './MealsSummary.module.css';

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Delicious Food, Delivered To You</h2>
      <p>
        All those meals are fetched from Firebase through my custom hook! explore this little demo app
        and submit your order- it will also be posted to Firebase!
      </p>
      <p>
        This React project uses many key features like React Portal, the hooks useState, useContext, useReducer,
        useEffect and useRef, but also two custom hooks which I built for this project to handle both HTTP requests
        and the order-form.
      </p>
    </section>
  );
}

export default MealsSummary;