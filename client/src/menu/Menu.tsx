import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import AuthMenu from '../auth/AuthMenu';

export const menuLinks: { [link: string]: string } = {
  '/orders': 'Orders',
  '/products': 'Products',
  '/customers': 'Customers',
  '/employees': 'Employees',
  // '/categories': 'Categories',
  // '/shippers': 'Shippers',
  // '/suppliers': 'Suppliers',
  // '/regions': 'Regions',
};

export default class Menu extends React.Component<{}> {
  public render() {
    return (
      <Nav bsStyle="tabs" style={{ marginBottom: '20px' }}>
        <LinkContainer to={{ pathname: '/' }} exact>
          <NavItem>MainPage</NavItem>
        </LinkContainer>

        {Object.keys(menuLinks).map(link => (
          <LinkContainer key={link} to={{ pathname: link }}>
            <NavItem>{menuLinks[link]}</NavItem>
          </LinkContainer>
        ))}

        <NavItem>
          <AuthMenu />
        </NavItem>
      </Nav>
    );
  }
}
