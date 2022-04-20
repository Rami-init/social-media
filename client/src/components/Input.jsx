import React from 'react'
import { IconButton, Grid, InputAdornment, TextField } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
const Input = ({name, label, handleChange, autoFocus, type, handlePassword, xs}) => {
  return (
    <Grid item xs={xs}>
      <TextField 
        variant='outlined' 
        required
        name={name} 
        label={label} 
        fullWidth
        onChange={handleChange}
        autoFocus={autoFocus}
        type={type}
        size='small'
        InputProps={ name === 'password' ? {
            endAdornment : (
                <InputAdornment position='end' >
                    <IconButton onClick={handlePassword}>
                    {type === 'password'? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </InputAdornment>
            )
        }: null }
      />
    </Grid>
  )
}

export default Input