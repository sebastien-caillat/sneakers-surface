import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from './colors'

export const StyledLink = styled(Link)`
  font-size: 60px;
  color: ${colors.text};
  text-decoration: none;
  margin: 1%;
  &:visited {
    color: ${colors.text};
  }
`