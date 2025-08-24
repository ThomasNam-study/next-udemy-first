import React from 'react';

import classes from './meals-grid.module.css';
import {Meals} from "@/model/modals/meals-type";
import MealItem from "@/components/meals/meal-item";

type Prop = {meals: Meals[]};

const MealsGrid = ({meals}: Prop) => {
    return (
        <ul className={classes.meals}>
            {meals.map((meal) => <li key={meal.id}>
                <MealItem {...meal} />
            </li>)}
        </ul>
    );
};

export default MealsGrid;