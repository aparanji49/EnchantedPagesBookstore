// Contains all the custom types we want to use for our application
// import Classics from './assets/images/categories/classics.jpg';
// import Fantasy from './assets/images/categories/fantasy.jpg';
// import Mystery from './assets/images/categories/mystery.jpg';
// import Romance from './assets/images/categories/romance.jpg';
export interface BookItem {
  bookId: number;
  title: string;
  author: string;
  price: number;
  isPublic: boolean;
}

export interface CategoryItem {
  categoryId: number;
  name: string;
}
// export const categoryImages: Record<string, any> = {
//   classics: Classics,
//   fantasy : Fantasy,
//   mystery : Mystery,
//   romance : Romance
// };
export const categoryList = [
  { categoryId: 1001, name: "Best Sellers" },
  { categoryId: 1002, name: "New Releases" },
  { categoryId: 1003, name: "Art" },
  { categoryId: 1004, name: "CookBooks" },
  { categoryId: 1005, name: "Horror" },
  { categoryId: 1006, name: "Romance" },
  { categoryId: 1007, name: "Thriller" },
  { categoryId: 1008, name: "Travel" },
];
export const topGenreList = [
  { genreId: 1001, name: "Thriller" },
  { genreId: 1002, name: "Romance" },
  { genreId: 1003, name: "CookBooks" },
];
export const bookList = [
  {
    bookId: 1001,
    title: "The Amityville Horror",
    author: "Jay Anson",
    price: 3632,
    isPublic: true,
  },
  {
    bookId: 1002,
    title: "Intercepts A horror novel",
    author: "Tj Payne",
    price: 3676,
    isPublic: false,
  },
  {
    bookId: 1003,
    title: "Fragments of Horror",
    author: "Junji Ito",
    price: 4311,
    isPublic: true,
  },
  {
    bookId: 1004,
    title: "The Horror of Dracula",
    author: "Jimmy Sangster",
    price: 6108,
    isPublic: true,
  },
  {
    bookId: 1005,
    title: "Lighthouse Horrors",
    author: "Charles Waugh",
    price: 6794,
    isPublic: true,
  },
  {
    bookId: 1006,
    title: "Horror in the East",
    author: "Laurence Rees",
    price: 4236,
    isPublic: true,
  },
];