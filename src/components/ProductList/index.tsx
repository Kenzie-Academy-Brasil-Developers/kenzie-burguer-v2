import { useContext } from 'react';
import ProductCard from './ProductCard';
import { StyledProductList } from './style';
import { CartContext } from '../../providers/CartContext';

const ProductList = () => {
  const { filteredProducts } = useContext(CartContext);

  return (
    <div>
      {filteredProducts.length > 0 && (
        <StyledProductList>
          {filteredProducts.map((prod) => (
            <ProductCard prod={prod} key={prod.id} />
          ))}
        </StyledProductList>
      )}
    </div>
  );
};

export default ProductList;
