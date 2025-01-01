import { atom, useAtom } from 'jotai';

// after all the imports
import Immutable from "seamless-immutable";

// Define the initial state of the cart. We put in one piece of test data
// const initialItem = Immutable([
// {
//     "id": 3,
//     "isbn_10": "0553213105",
//     "isbn_13": "978-0486295831",
//     "bookTitle": "Pride and Prejudice",
//     "pageCount": 352,
//     "priceTag": 9.64,
//     "image": "https://ucarecdn.com/f351d7db-3abf-4a0d-9501-afbda5c60fe7/amazonjaneaustenprideandprejudice.jpg",
//     "format":"Mass Market Paperback",
//     "promotion": "Sale Item",
//     "badge": "Sale",
//     "discount": 0.2,
//     "review": 5
//   }
// ]);

// Define the initial state of the cart.
const initialItem = Immutable([
//   testing data removed
]);

// Create an atom for the cart
export const itemAtom = atom(initialItem);

// const itemAtom = atom();

export function useItem() {
  const [itemArray, setItemAtom] = useAtom(itemAtom);

  const setItemArray = (newItem) => {
    // const cloned = [...itemArray];
    const cloned = [];
    cloned.push(newItem);
    // console.log(cloned);
    setItemAtom(cloned);
  };

  const getItemArray = () => {
    return itemArray;
  };

  const clearItem = () => {
    const cloned = [...itemArray];
    const length = cloned.length;
    cloned.splice(0, length);
    console.log(cloned);
    setItemAtom(cloned);
    // setItemContent(cloned);
    // setItemAtom(null);
  };

  const setItemContent = (items) => {
    setItemArray(Immutable(items));
  }

  const resetItemContent = () => {
    setItemArray(Immutable(initialItem));
  }

  return { itemArray, setItemArray, getItemArray, clearItem, setItemContent, resetItemContent };
}
