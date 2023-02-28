import { useContext } from 'react';
import CartProductCard from './CartProductCard';
import { StyledCartProductList } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph } from '../../../styles/typography';
import { CartContext } from '../../../providers/CartContext';

const CartProductList = () => {
  const { currentProduct, setCurrentProduct } = useContext(CartContext);

  const totalCart = currentProduct.reduce(
    (acc, valueTotal) => valueTotal.price + acc,
    0
  );

  return (
    <StyledCartProductList>
      {currentProduct.length > 0 && (
        <ul>
          {currentProduct.map((prod) => (
            <CartProductCard prod={prod} key={prod.id} />
          ))}
        </ul>
      )}

      <div className='totalBox'>
        <StyledParagraph>
          <strong>Total</strong>
        </StyledParagraph>
        <StyledParagraph className='total'>
          {totalCart.toFixed(2)}
        </StyledParagraph>
      </div>
      <StyledButton
        $buttonSize='default'
        $buttonStyle='gray'
        onClick={() => setCurrentProduct([])}
      >
        Remover todos
      </StyledButton>
    </StyledCartProductList>
  );
};

export default CartProductList;
