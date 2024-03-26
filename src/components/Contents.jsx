import { Box, Button, Card, Select, Typography } from '@mui/material'
import React from 'react'
import { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import { colors } from '../styles/globalStlye';
import { useSelector } from 'react-redux';
import FormCheckLabel from 'react-bootstrap/esm/FormCheckLabel';
import { HiEye } from "react-icons/hi";
import DetailModal from './modal/DetailModal';


const Contents = ({ ramCharacterData, info }) => {

    const [selectedData, setSelectedData] = useState({})
    const { loading } = useSelector((state) => state.rickandmorty)
    const [status, setStatus] = useState({})
    const [selectedIndex, setSelectedIndex] = useState(null);

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => { setOpen(false) }


    useEffect(() => {
        info.length < 0 && setStatus({})
    }, [info])

    function textBold(text, param) {
        // RegExp içindeki 'gi' g:global olarak metnin tamamında arama yapar, i:büyük küçük harf duyarsız işlem yap
        const regex = new RegExp(`(${param})`, 'gi');
        const parts = text.split(regex);

        return parts.map((part, index) =>
            regex.test(part) ? <b key={index}>{part}</b> : part
        );
    }


    // direk check box tıklarnırsa işlem yap
    const handleCheck = (e, param) => {

        // hedefden isim ve durum bilgisini al
        const { checked } = e.target

        //mevcut durumu tut, yeni değişikliklerde işlem yap
        setStatus(prev => ({
            ...prev, [param.name]: checked
        }))
    }


    // card elementi tıklanırsa işlem yap
    const handleSelect = (e, param) => {
        if (e.target.type !== "checkbox") {
            const controlCheck = status[param.name]

            // param.name değeri işlem görmüş ise durumu tersine çevir 
            setStatus({ ...status, [param.name]: !controlCheck })
        }
    }

    const handleKeyDown = (e, index) => {

        let newIndex = selectedIndex;
        switch (e.key) {
            case 'ArrowDown':
                newIndex = (selectedIndex + 1) % ramCharacterData?.results?.length;
                break;
            case 'ArrowUp':
                newIndex = (selectedIndex - 1 + ramCharacterData?.results?.length) % ramCharacterData?.results?.length;
                break;
            default:
                break;
        }
        setSelectedIndex(newIndex);

        // Scroll into view if needed
        document.getElementById(`card-${newIndex}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    }


    return (
        <div>

            {
                loading ?
                    (
                        <div className='loader' style={{ margin: 'auto', marginTop: 50 }}></div>
                    )
                    :
                    (
                        <Box sx={{ display: 'flex', flexDirection: 'column', overflow: 'auto', maxHeight: '500px', border: `1px solid ${colors.boxBorder}`, borderRadius: 2, p: 1 }}>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                {
                                    ramCharacterData?.results?.map((item, index) => (



                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
                                            <Box
                                                //tabIndex işlemi her kartın keyboard üzerinden dinlenebilir olmasını sağlar
                                                tabIndex={0}
                                                id={index}
                                                key={index}
                                                sx={{
                                                    width: '100%',
                                                    alignItems: 'center',
                                                    display: 'flex',
                                                    justifyContent: 'flex-start',
                                                    gap: 2,
                                                    p: 1,
                                                    overflow: 'auto',
                                                    border: `1px solid ${colors.cardBorder}`,
                                                    borderRadius: 2,
                                                    // karakterim durumu 'dead' ise arka plan kırmızı yap değilse yeşil yap
                                                    '&:hover': item.status == 'Dead' ? {backgroundColor:'red'}:{backgroundColor:'green'}, cursor:'pointer'
                                                }}
                                                component={'form'}
                                                onClick={(e) => handleSelect(e, item)}
                                                onKeyDown={(e) => handleKeyDown(e, index)}
                                            >

                                                <Checkbox checked={status[item.name] || false} name={item.name} onChange={(e) => handleCheck(e, item)} />

                                                <img src={item?.image} component="img" height="80" style={{ borderRadius: 5 }} />

                                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>

                                                    {/* burada info bilgisi array olarak geldiği için array içindeki son değeri gönder */}
                                                    <Typography align='left' variant='subtitle1'>
                                                        {textBold(item?.name, info[info.length - 1])}
                                                    </Typography>

                                                    <Typography align='left' variant='subtitle2'>
                                                        {item?.episode.length} Episodes
                                                    </Typography>

                                                </Box>
                                            </Box>

                                            {/* DETAIL */}
                                            <HiEye size={35} cursor={'pointer'} style={{ padding: 3 }} onClick={()=>{
                                                setSelectedData(item)
                                                handleOpen()
                                            }} />


                                        </Box>

                                    ))
                                }
                            </Box>

                            <DetailModal open={open} handleClose={handleClose} selectedData={selectedData} />

                        </Box>
                    )
            }

            

        </div>
    )
}

export default Contents