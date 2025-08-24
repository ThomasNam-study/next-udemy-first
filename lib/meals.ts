import sql from 'better-sqlite3';
import {Meals} from "@/model/modals/meals-type";

const db = sql('meals.db');

export async function  getMeals() {

    await new Promise((resolve, reject) => setTimeout(resolve, 1000));

    // throw new Error('Loading  meals failed');

    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug: string) {
    return db.prepare(`SELECT * FROM meals WHERE slug = ?`).get(slug);
}

export async function saveMeal(meal: Meals) {
    const stmt = db.prepare(`
      INSERT INTO meals VALUES (
         null,
         @slug,
         @title,
         @image,
         @summary,
         @instructions,
         @creator,
         @creator_email
      )
   `);
    stmt.run(meal);
}