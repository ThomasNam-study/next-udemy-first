import React, {Suspense} from 'react';

import classes from './page.module.css';
import Link from "next/link";
import MealsGrid from "@/components/meals/meals-grid";
import {getMeals} from "@/lib/meals";
import {Meals} from "@/model/modals/meals-type";
import MealsLoadingPage from "@/app/meals/loading-out";

const MealsInnerPage = async () => {
    const meals = (await getMeals()) as Meals[];

    return (
        <MealsGrid meals={meals}/>
    );
};

const MealsPage = () => {


    return (
        <>
            <header className={classes.header}>
                <h1>
                    Delicious meals, created <span className={classes.highlight}>by you</span>
                </h1>
                <p>
                    Choose your favorite recipe and cook it yourself. It is easy and fun!
                </p>
                <p className={classes.cta}>
                    <Link href='/meals/share'>Share Your Favorite Recipe</Link>
                </p>
            </header>
            <main className={classes.main}>
                <Suspense fallback={<MealsLoadingPage/>}>
                    <MealsInnerPage/>
                </Suspense>
            </main>
        </>
    );
};

export default MealsPage;