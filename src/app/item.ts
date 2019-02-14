import { Genre } from "./genre";

export class Item
{
    title: string;
    description: string;
    score: number;
    genre: string;
    image: string;
    userIncluded: string;
    userModified: string;
    included: Date;
    modified: Date;
}