export interface Review {
    id: string;
    authorName: string;
    authorBadge?: string;
    avatar?: string;
    photos?: string[];
    rating: number;
    date: string;
    text: string;
}