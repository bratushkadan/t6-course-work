import type React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../stores';

const NavMenuWrapper = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-grow: 5;

  & a {
    font-size: 1.33rem;
    margin: 0 0.75rem;
  
    cursor: pointer;
  
    transition: 0.125s color;

    &:hover {
      color: #835dff;
    }
  }

  & a.active {
    color: #835dff;
    font-weight: bold;
    &:hover {
      color: inherit;
    }
  }
`;

export const NavMenu: React.FC = () => {
  const token = useAuth((state) => state.token);

  return (
    <NavMenuWrapper>
      <NavLink to="/" className={({isActive}) => isActive ? "active" : ""}>Каталог</NavLink>
      
      {token && (
        <>
          <NavLink to="/cart" className={({isActive}) => isActive ? "active" : ""}>Корзина</NavLink>
          <NavLink to="/orders" className={({isActive}) => isActive ? "active" : ""}>Заказы</NavLink>
        </>
      )}
    </NavMenuWrapper>
  );
};
