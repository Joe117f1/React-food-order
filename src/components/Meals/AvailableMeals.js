import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import useHttp from '../../hooks/use-http';
import classes from './AvailableMeals.module.css';

const firebase_api = process.env.REACT_APP_GET_API_KEY;

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const { isLoading, error: hasError, sendRequest: fetchMeals } = useHttp();

  useEffect(() => {
    const transformMealData = (dataObj) => {
      const loadedMeals = [];
      for (const key in dataObj) {
        loadedMeals.push({
          id: key,
          title: dataObj[key].title,
          name: dataObj[key].name,
          description: dataObj[key].description,
          price: dataObj[key].price,
        });
      }
      setMeals(loadedMeals);
    }
    fetchMeals({ url: firebase_api }, transformMealData);
  }, [fetchMeals]);

  const mealsList = meals.map(meal => {
    return (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });

  let content = <ul>{mealsList}</ul>
  if (hasError) {
    content = <ul>{hasError}</ul>
  }
  if (isLoading) {
    content = <ul>Loading...</ul>
  }

  return (
    <section className={classes.meals}>
      <Card>
        {content}
      </Card>
    </section>
  );
};

export default AvailableMeals;
