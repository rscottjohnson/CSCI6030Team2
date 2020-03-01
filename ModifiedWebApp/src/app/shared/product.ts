import { Comment } from './comment';

export class Product {
    id: string;
    name: string;
    image: string;
    category: string;
    featured: boolean;
    ingredients: string;
    comments: Comment[];
}
