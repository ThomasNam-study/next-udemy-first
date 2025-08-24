import React from 'react';
import Image from 'next/image';

import classes from './page.module.css';
import {getMeal} from "@/lib/meals";
import {Meals} from "@/model/modals/meals-type";
import {notFound} from "next/navigation";

type Prop = { params: { slug: string } }

const MealDetailPage = ({params}: Prop) => {
    // const meal = (await getMeal(params.slug)) as Meals;
    const meal = (getMeal(params.slug)) as Meals|undefined;

    if (!meal) {
        notFound();
    }

    meal.instructions = (meal.instructions ?? "").replace(/\n/g, '<br />');

    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image fill src={meal.image} alt={""}/>
                </div>
                <div className={classes.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={classes.creator}>
                        by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
                    </p>
                    <p className={classes.summary}>
                        {meal.summary}
                    </p>
                </div>
            </header>
            <main className={classes.main}>
                <p className={classes.instructions} dangerouslySetInnerHTML={{
                    __html: meal.instructions ?? ''
                }}></p>
            </main>
        </>
    );
};

export default MealDetailPage;