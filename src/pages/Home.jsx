import { Autocomplete, Chip, Box, Button, Card, CardContent, CardMedia, Container, FormControl, Modal, Select, TextField, Typography } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react'
import { format } from "date-fns"
import { homePageStyle, modalStyles } from '../styles/globalStlye'
import { CiBoxList } from "react-icons/ci";
import useRickAndMortyCall from '../hooks/useRickAndMortyCall'
import Contents from '../components/Contents'
import { useDispatch, useSelector } from 'react-redux'
import Characters from '../components/modal/Characters'
import Badge from '@mui/material/Badge';
import Content from '../components/Content'
import { fetchSendSelectedData } from '../features/rickAndMortySlice'
import { FaHeart } from "react-icons/fa";
import { IoHeartDislikeOutline } from "react-icons/io5";

export const Home = () => {

  const { getFind_Character } = useRickAndMortyCall()
  const { ramCharacterData, selectedCharacters } = useSelector((state) => state.rickandmorty)
  const [info, setInfo] = useState([]); // Seçilen öğelerin `name`'lerini saklar
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch()

  const [selectedItems, setSelectedItems] = useState([]); // Seçilen öğeleri saklamak için
  const [inputValue, setInputValue] = useState(''); // Arama metnini saklamak için
  
  const currentDate = new Date()
  const nowDate = format(currentDate,'yyyy-MM-dd HH:mm')

  //? seçilen karakterlerin gösterilmesi için modal stateleri
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)



  const handleSearch = async (e, params) => {
    if (params) {
      getFind_Character(params); // API çağrısını bekleyin
    }

  };


  useEffect(() => {
    // api den gelen cevap boş dönerse state boş array gönder undifiend hatasını engelle
    setSearchResults(ramCharacterData?.results || []);
  }, [ramCharacterData]);


  //! sselectedItems state her değiştiğinde datayı redux tarafına gönder
  useEffect(() => {
    // seçilen kaydın tarih saat bilgisini al
    const newData = selectedItems.map(item=>({
      ...item,
      selectedDate:nowDate // seçilen kaydın tarih saat bilgisi
    }))
    dispatch(fetchSendSelectedData(newData || []))
  }, [selectedItems])


  return (

    <div style={homePageStyle}>


      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

        <Container maxWidth='sm' component={'form'} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>



          <Box >

            <Badge color='secondary' badgeContent={selectedCharacters?.length}>
              <CiBoxList size={25} onClick={handleOpen} cursor={'pointer'} />
            </Badge>

          </Box>


          <Autocomplete
            id="search-select-demo"
            multiple={true}
            options={inputValue ? searchResults : []}
            freeSolo
            getOptionLabel={(option) => option.name || ''}
            value={selectedItems}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInfo(newInputValue || "") //! girilen value değeri bold olarak göstermek için bir kopyasını Content tarafına gönder
              setInputValue(newInputValue || ""); //! girilen değeri Textfield içinde göstermek için value değeri yakala
              handleSearch(event, newInputValue || "") //! girilen her değer için apiden veriyi çek
            }}
            onChange={(event, newValue) => {
              setSelectedItems(newValue); //! seçilen datanın bilgisini state tarafında tut
            }}
            //! listelenen sonuçları Content componenti çağırarak göster
            renderOption={(props, option) => (
              <li {...props} key={option.id} style={{ width: '100%', padding: 5 }}>
                <Content option={option} info={info} />
              </li>
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option.name}
                  {...getTagProps({ index })}
                  sx={{ fontWeight: 700 }}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label="Search"
                placeholder="Type text"
                variant="outlined"
                value={inputValue}
              />
            )}
          />
        </Container>

          {/* seçim yapılan karakterleri gösteren modal */}
        <Characters open={open} handleClose={handleClose} selectedCharacters={selectedCharacters} />

      </Box>


    </div>

  )
}
