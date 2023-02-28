import { useContext } from 'react';
import { StyledProductCard } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph, StyledTitle } from '../../../styles/typography';
import { CartContext, IProduct } from '../../../providers/CartContext';

interface IProductCart {
  prod: IProduct;
}

const ProductCard = ({ prod }: IProductCart) => {
  const { addProduct } = useContext(CartContext);

  return (
    <StyledProductCard>
      <div className='imageBox'>
        <img src={prod.img} alt='Hamburguer' />
      </div>
      <div className='content'>
        <StyledTitle tag='h3' $fontSize='three'>
          {prod.name}
        </StyledTitle>
        <StyledParagraph className='category'>{prod.category}</StyledParagraph>
        <StyledParagraph className='price'>{prod.price}</StyledParagraph>
        <StyledButton
          $buttonSize='medium'
          $buttonStyle='green'
          onClick={() => addProduct(prod)}
        >
          Adicionar
        </StyledButton>
      </div>
    </StyledProductCard>
  );
};

export default ProductCard;
