import { atom, useAtom } from 'jotai';

// const productAtom = atom(null);
const productAtom = atom("AI-Books");

export function useProduct() {
  const [product, setProductAtom] = useAtom(productAtom);

  const setCurrentProduct = (newProduct) => {
    setProductAtom(newProduct);
  };

  const getProduct = () => product;

  return { setCurrentProduct, getProduct };
}

