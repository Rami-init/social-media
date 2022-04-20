import React from 'react'
import { styled } from '@mui/material/styles'
 

const Footer = () => {
  const FooterWrapper = styled('div')(({theme})=>({
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.text.disabled,
      width: '100%',
      height: '2.5rem',
      display: 'flex',
      justifyContent: 'center', 
      alignItems: 'center'
  }))
  return (
    <FooterWrapper>Rami Sami &copy; All right Reseved, 2022</FooterWrapper>
  )
}

export default Footer