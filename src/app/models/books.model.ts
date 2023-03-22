export interface Data{
    data: BooksData; 
    status: string
}
export interface BooksData{
    author: string;
    birthday: string;
    birthPlace:string;
    books: Book[];
    
}

export interface Book{
    imageUrl: string;
    title: string;
    purchaseLink: string;
    PublishDate: string;
    
}