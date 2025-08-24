import React from 'react';

import Link from 'next/link';
import Image from 'next/image';

import classes from './meal-item.module.css';

type Prop = {
    title: string;
    slug: string;
    image: string;
    summary: string;
    creator: string;
};

const MealItem = ({title, slug, image, summary, creator}: Prop) => (
    <article className={classes.meal}>
        <header>
            <div className={classes.image}>
                <Image src={image} alt={title} fill />
            </div>
            <div className={classes.headerText}>
                <h2>{title}</h2>
                <p>by {creator}</p>
            </div>
        </header>
        <div className={classes.content}>
            <p className={classes.summary}>{summary}</p>
            <div className={classes.actions}>
                <Link href={`/meals/${slug}`}>View Details</Link>
            </div>
        </div>
    </article>
);

export default MealItem;