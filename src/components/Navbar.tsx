import React, { useContext } from 'react'
import styled from "styled-components";
import Logo from './Logo';
import { Link } from 'react-router-dom';
import Styleguide from "../Styleguide";
import AuthContext from "../store/AuthContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media(min-width: 1024px) {
    flex-direction: row;
    height: 100px;
    justify-content: space-between;
    background-color: ${Styleguide.infoColor};
    padding: 0 2rem;
    box-shadow: 1px 0px 1px black;
  }
`

const LinkRow = styled.div`
  display: flex;
  flex-direction: column;
  @media(min-width: 1024px) {
    flex-direction: row;
    align-items: center;
  }
`

const StyledLink = styled(Link)`
  color: ${Styleguide.primaryColor};
  text-decoration: none;
  padding: 0.25rem 1rem;
  font-weight: bold;
  margin: 0 0.25rem;
  font-size: 1.15rem;
  transition: 0.2s;
  border: 2px solid transparent;
  border-radius: 8px;
  :hover {
    border: 2px solid ${Styleguide.primaryColor};
  }
`

const LinkButton = styled(Link)`
  color: ${Styleguide.secondaryColor};
  text-decoration: none;
  padding: 0.25rem 1rem;
  font-weight: bold;
  border-radius: 8px;
  margin-right: 0.25rem;
  border: 2px solid ${Styleguide.secondaryColor};
  transition: 0.2s;
  :hover {
    background-color: ${Styleguide.secondaryColor};
    color: ${Styleguide.infoColor};
  }
  @media(max-width: 480px) {
    display: none;
  }
`

interface ILink {
  path: string,
  protected: boolean,
  title: string,
}

const links: ILink[] = [
  {
    title: 'Try demo',
    path: '/demo',
    protected: false,
  },
  {
    title: 'Projects',
    path: '/projects',
    protected: true,
  },
]

export default function Navbar() {
  const { authenticated } = useContext(AuthContext)
  return (
    <Container>
      <Logo />
      <LinkRow>
        {
          links.filter(l => !l.protected).map(x => (
            <React.Fragment>
              <StyledLink to={x.path}>{x.title}</StyledLink>
            </React.Fragment>
          ))
        }
        {
          authenticated && links.filter(l => l.protected).map(x => (
            <React.Fragment>
              <StyledLink to={x.path}>{x.title}</StyledLink>
            </React.Fragment>
          ))
        }
        {
          authenticated
            ? (
              <React.Fragment>
                <LinkButton to="/logout">Log out</LinkButton>
              </React.Fragment>
            )
            : (
              <React.Fragment>
                <LinkButton to="/login">Sign in</LinkButton>
                <LinkButton to="/register">Register</LinkButton>
              </React.Fragment>
            )
        }
      </LinkRow>
    </Container>
  )
}