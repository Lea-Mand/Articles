
import {Comment} from '../models/comment.model'
export class Article{
    id!: number;
    title?: string;
    content?: string;
    comments?: Comment [];
    date!:string;
}