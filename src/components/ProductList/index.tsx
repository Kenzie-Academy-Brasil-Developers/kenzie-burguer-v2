import { useContext } from 'react';
import ProductCard from './ProductCard';
import { StyledProductList } from './style';
import { CartContext } from '../../providers/CartContext';

const ProductList = () => {
  const { product } = useContext(CartContext);

  return (
    <div>
      {product.length > 0 && (
        <StyledProductList>
          {product.map((prod) => (
            <ProductCard prod={prod} key={prod.id} />
          ))}
        </StyledProductList>
      )}
    </div>
  );
};

export default ProductList;
