import { Autocomplete, Chip, Box, Button, Card, CardContent, CardMedia, Container, FormControl, Modal, Select, TextField, Typography } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react'
import { format } from "date-fns"
import { homePageStyle, modalStyles } from '../styles/globalStlye'
import Popover from '@mui/material/Popover';
import { CiBoxList } from "react-icons/ci";
import useRickAndMortyCall from '../hooks/useRickAndMortyCall'
import Contents from '../components/Contents'
import { useSelector } from 'react-redux'
import Characters from '../components/modal/Characters'
import Badge from '@mui/material/Badge';


export const Home = () => {

  const { getFind_Character } = useRickAndMortyCall()
  const { ramCharacterData,selectedCharacters } = useSelector((state) => state.rickandmorty)
  const [info, setInfo] = useState([]);


  //? seçilen karakterlerin gösterilmesi için modal stateleri
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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



          <Box >

            <Badge color='secondary' badgeContent={selectedCharacters.length}>
              <CiBoxList size={25} onClick={handleOpen} cursor={'pointer'}/>
            </Badge>

          </Box>



          <Autocomplete
            id='search-select-demo'
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

        <Characters open={open} handleClose={handleClose} selectedCharacters={selectedCharacters}/>

      </Box>


    </div>

  )
}
