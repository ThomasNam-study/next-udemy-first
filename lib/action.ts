'use server';

import {Meals} from "@/model/modals/meals-type";
import slugify from "slugify";
import xss from "xss";
import fs from 'node:fs';
import {saveMeal} from "@/lib/meals";
import {redirect} from "next/navigation";

export async function shareMeal(formData: FormData) {
    const title = formData.get('title') as string;
    const slug = slugify(title, {lower: true});
    const instructions = xss(formData.get('instructions') as string);

    const image =  formData.get('image') as File;
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
        creator: formData.get('creator') as string,
        creator_email: formData.get('creator_email') as string,
        image: `/images/${fileName}`,
        instructions: instructions,
        slug: slug,
        summary: formData.get('summary') as string,
        title: title

    }

    console.log(meal);

    await saveMeal(meal);

    redirect('/meals');
}