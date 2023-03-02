import { MdSearch } from 'react-icons/md';
import { useContext } from 'react';
import { StyledSearchForm } from './style';
import { StyledButton } from '../../../styles/button';
import { CartContext } from '../../../providers/CartContext';

const SearchForm = () => {
  const { filterProduct, setFilteredProducts, searchValue, setSearchValue } =
    useContext(CartContext);

  const submit = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    filterProduct(event.target.value);
  };

  return (
    <StyledSearchForm>
      <input type='text' placeholder='Digitar pesquisa' onChange={submit} />
      <StyledButton type='submit' $buttonSize='medium' $buttonStyle='green'>
        <MdSearch />
      </StyledButton>
    </StyledSearchForm>
  );
};

export default SearchForm;
