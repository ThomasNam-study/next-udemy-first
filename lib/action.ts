'use server';

import {Meals} from "@/model/modals/meals-type";
import slugify from "slugify";
import xss from "xss";
import fs from 'node:fs';
import {saveMeal} from "@/lib/meals";
import {redirect} from "next/navigation";

function isInvalidText(text: string|undefined) {
    return !text || text.trim() === '';
}

export async function shareMeal(formData: FormData) {
    const title = formData.get('title') as string;
    const instructions = xss(formData.get('instructions') as string);
    const creator = formData.get('creator') as string;
    const creatorEmail = formData.get('creator_email') as string;
    const summary = formData.get('summary') as string;
    const image =  formData.get('image') as File;

    if (isInvalidText(title) || isInvalidText(instructions)
        || isInvalidText(summary)
        || isInvalidText(creator)
        || isInvalidText(creatorEmail)) {
        throw new Error('Invalid input');
    }

    const slug = slugify(title, {lower: true});


    const extension = image.name.split(".").pop();
    const fileName = `${slug}.${extension}.${extension}`;

    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await image.arrayBuffer();
    stream.write(Buffer.from(bufferedImage), (error: Error|undefined|null) => {
        if (error) {
            throw new Error('Saving image failed!');
        }
    });

    const meal: Meals = {
        creator: creator,
        creator_email: creatorEmail,
        image: `/images/${fileName}`,
        instructions: instructions,
        slug: slug,
        summary: summary,
        title: title

    }

    console.log(meal);

    await saveMeal(meal);

    redirect('/meals');
}