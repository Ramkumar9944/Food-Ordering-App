import './AvailableMeals.css';
import MealItem from './MealItem/MealItem';
import { useEffect, useState } from 'react';

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState();
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://ghost-37ddc-default-rtdb.firebaseio.com/meals.json',
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
          image: responseData[key].image,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setIsError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className='MealsLoading'>
        <p>Loading...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className='MealsError'>
        <p>{isError}</p>
      </section>
    );
  }

  const mealslist =
    meals &&
    meals.map((meal) => (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
        image={meal.image}
      />
    ));
  return (
    <section className='meals'>
      <ul>{mealslist}</ul>
    </section>
  );
};
export default AvailableMeals;
