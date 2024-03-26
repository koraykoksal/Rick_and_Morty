import { Autocomplete, Chip, Box, Button, Card, CardContent, CardMedia, Container, FormControl, Modal, Select, TextField, Typography } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react'
import { format } from "date-fns"
import { homePageStyle, modalStyles } from '../styles/globalStlye'
import Popover from '@mui/material/Popover';
import { uid } from 'uid'
import useRickAndMortyCall from '../hooks/useRickAndMortyCall'
import Contents from '../components/Contents'
import { useSelector } from 'react-redux'



export const Home = () => {

  const { getFind_Character } = useRickAndMortyCall()
  const { ramCharacterData } = useSelector((state) => state.rickandmorty)
  const [info, setInfo] = useState([]);

  const handleSearch = (params) => {
    // param değeri undefiend değilse api talebini yap
    if (params !== undefined) {
      getFind_Character(params)
    }

  }


  return (

    <div style={homePageStyle}>


      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

        <Container maxWidth='sm' component={'form'} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

          <Typography align='center' variant='subtitle2'>Search Rick and Morty Characters</Typography>

          <Autocomplete
            id='name'
            multiple // birden fazla veri girişi için
            options={[]} //arama için kullanılacak
            freeSolo // listede olmayan bir değer girilmesi sağlar
            value={info}
            onChange={(e, newValue) => {
              setInfo(newValue)
              handleSearch(newValue[newValue.length - 1]) // girilen son datayı al/gönder
            }}

            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip variant="outlined" label={option} {...getTagProps({ index })} sx={{ fontWeight: 700 }} onClick={(value) => handleSearch(option)} />
              ))
            }
            renderInput={(params) => (
              <TextField
                required
                {...params}
                variant="outlined"
                label="Search"
                placeholder="Type text"

              />
            )}
          />

          {
            info.length > 0 && <Contents ramCharacterData={ramCharacterData} info={info} />
          }


        </Container>




      </Box>


    </div>

  )
}
