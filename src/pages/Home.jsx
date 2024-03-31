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
import { toastWarnNotify } from '../helper/ToastNotify'


export const Home = () => {

  const { getFind_Character } = useRickAndMortyCall()
  const { ramCharacterData, selectedCharacters, loading } = useSelector((state) => state.rickandmorty)
  const [info, setInfo] = useState([]); // Seçilen öğelerin `name`'lerini saklar
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch()
  const [selectedItems, setSelectedItems] = useState([]); // Seçilen öğeleri saklamak için
  const [inputValue, setInputValue] = useState(''); // Arama metnini saklamak için

  const currentDate = new Date()
  const nowDate = format(currentDate, 'yyyy-MM-dd HH:mm')

  //? seçilen karakterlerin gösterilmesi için modal stateleri
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)



  // apiden arama yap
  const handleSearch = async (e, params) => {
    if (params) {
      getFind_Character(params); // API çağrısını bekleyin
    }

  };


  // redux dan gelen state de bir değişiklik olursa gelen veriyi ayrı bir state gönder
  useEffect(() => {
    // api den gelen cevap boş dönerse state boş array gönder undifiend hatasını engelle
    setSearchResults(ramCharacterData?.results || []);
  }, [ramCharacterData]);



  //! selectedItems state her değiştiğinde datayı redux tarafına gönder
  useEffect(() => {

    const sameIDs = new Set()

    const newData = selectedItems.filter((filterData) => {
      if (!sameIDs.has(filterData.id)) {
        sameIDs.add(filterData.id)
        return true
      }
      return false
    })

    // seçilen kaydın tarih saat bilgisini al
    const updateNewData = newData?.map(item => ({
      ...item,
      selectedDate: nowDate // seçilen kaydın tarih saat bilgisi
    }))


    dispatch(fetchSendSelectedData(updateNewData || []))
  }, [selectedItems])


  // selected modal içindeki cardlardan biri silinirse input içinde yer alan textler silinsin
  useEffect(() => {
   
    // redux da bulunan data içinde bir değer silindiği zaman verileri filtrele
    const filterData = selectedCharacters.map((element)=>{
      return selectedItems.find(item => item.id === element.id)
    })

    // filtrelenniş veriyi AutoComplete alanındaki input bölümüne yeniden gönder bu sayede selectedData ile input alanındaki data bilgisi aynı olsun
    setSelectedItems(filterData)

  }, [selectedCharacters])
  


  const handleChange = (e, params) => {

    // tekrar eden kayıtları belirlemek için bir data seti oluştur
    const sameIDs = new Set()

    // param değerin oluşan kayıtları filtreleme yap. sameIDs.has işlemi ile benzersiz öğenin olup olmadığı kontrol edilir.
    const selectedDatas = params.filter((filterData) => {
      if (!sameIDs.has(filterData.id)) {
        sameIDs.add(filterData.id)
        return true
      }
      // seçilmiş olan karakter için hata göster
      toastWarnNotify('Character has been selected !')
      return false
    })


    //! seçilen datanın bilgisini state tarafında tut
    //! bir seçim yapılmamış ise işlem yapma
    if (Array.isArray(selectedDatas)) {
      // Value bilgisi bir obje değilse filtreleme yap [] gönder
      const filteredItems = selectedDatas.filter(item => typeof item === 'object');
      setSelectedItems(filteredItems);
    }
    else {
      // Eğer newValue bir obje ise (tek bir seçim durumu), bir dizi olarak ayarla
      if (typeof selectedDatas === 'object') {
        setSelectedItems([selectedDatas]);
      }
    }

  }



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
            multiple
            options={inputValue.length > 0 ? searchResults : []}
            freeSolo // kullanıcının yazarak seçim yapmasını sağlar
            getOptionLabel={(option) => option.name || ''}
            value={selectedItems} // listeden seçilen değerleri temsil eder
            inputValue={inputValue} // input alanına yazılan text metini temsil eder
            closeOnSelect={false}
            onInputChange={(event, newInputValue) => {
              setInfo(newInputValue || "") //! girilen value değeri bold olarak göstermek için bir kopyasını Content tarafına gönder
              setInputValue(newInputValue || ""); //! girilen değeri Textfield içinde göstermek için value değeri yakala
              handleSearch(event, newInputValue || "") //! girilen her değer için apiden veriyi çek
            }}
            onChange={(event, newValue) => {
              handleChange(event, newValue)
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
                  onClick={(e) => console.log(e)}
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
            loading={loading} // yükleniyor bilgisini göster
          />


          {/* <Autocomplete
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
          /> */}

        </Container>


        {/* {
          info.length > 0 && <Contents ramCharacterData={ramCharacterData} info={info} />
        } */}


        {/* seçim yapılan karakterleri gösteren modal */}
        <Characters open={open} handleClose={handleClose} selectedCharacters={selectedCharacters} />

      </Box>


    </div>

  )
}
