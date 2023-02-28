import { createContext, useEffect, useState } from 'react';
import { api } from '../Services/api';

export const CartContext = createContext<IProductCart>({} as IProductCart);

interface IDefaultProviderProps {
  children: React.ReactNode;
}

export interface IProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

interface IProductCart {
  product: IProduct[];
  setProduct: React.Dispatch<React.SetStateAction<IProduct[]>>;
  filteredProducts: IProduct[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  currentProduct: IProduct[];
  setCurrentProduct: React.Dispatch<React.SetStateAction<IProduct[]>>;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  addProduct: (productCart: IProduct) => void;
  removeProduct: (currentID: number) => void;
}

export const CartProvider = ({ children }: IDefaultProviderProps) => {
  const [product, setProduct] = useState([] as IProduct[]);
  const [filteredProducts, setFilteredProducts] = useState([] as IProduct[]);
  const [currentProduct, setCurrentProduct] = useState([] as IProduct[]);
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    async function getProduct() {
      const userToken = localStorage.getItem('@TOKEN');

      try {
        const response = await api.get('/products', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getProduct();
  }, []);

  const addProduct = (productCart: IProduct) => {
    if (!currentProduct.some((products) => products.id === productCart.id)) {
      setCurrentProduct([...currentProduct, productCart]);
    }
  };

  const removeProduct = (currentID: number) => {
    const newCart = currentProduct.filter(
      (products) => products.id !== currentID
    );
    setCurrentProduct(newCart);
  };

  return (
    <CartContext.Provider
      value={{
        product,
        setProduct,
        filteredProducts,
        setFilteredProducts,
        currentProduct,
        setCurrentProduct,
        modal,
        setModal,
        addProduct,
        removeProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
