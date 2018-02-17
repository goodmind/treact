import styled from 'glamorous'
import * as React from 'react'
// TODO: use absolute paths
import { Link } from '../../../vendor/containers/Link'
import * as logo from './title-logo.png'

interface Props {
  logOut: React.MouseEventHandler<HTMLAnchorElement>
  switchNightMode(): void
}

// TODO: use flexbox

const StyledHeader = styled.header({
  backgroundColor: '#6389a8',
  flex: 1,
  height: '39px',
  width: '100%',
  '& a': {
    color: '#d4e3ef',
    cursor: 'default',
    textDecoration: 'none',
    float: 'left',
    fontSize: '13px',
    fontWeight: 400,
    height: '39px',
    lineHeight: '39px',
    padding: '0 7px',
    transition: 'all .15s linear',
    userSelect: 'none',
    ':hover': {
      color: '#fff',
      textDecoration: 'none',
    },
    ':active': {
      marginTop: '1px',
    },
  },
})

const Logo = styled.img({
  float: 'left',
  height: '26px',
  margin: '7px',
  width: '26px',
})
Logo.defaultProps = { src: logo }

const LogoutLink = styled.a({
  float: 'right',
})

const Header = ({ logOut, switchNightMode }: Props) => (
  <StyledHeader>
    <Logo />
    <Link to="/">Home</Link>
    <Link to="login">Login</Link>
    <LogoutLink onClick={logOut}>Logout</LogoutLink>
    <a onClick={switchNightMode}>Night Mode</a>
  </StyledHeader>
)

export { Header }
