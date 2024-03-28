import React from 'react'
import { Autocomplete, Chip, Box, Button, Card, CardContent, CardMedia, Container, FormControl, Modal, Select, TextField, Typography } from '@mui/material'
import { FaHeart } from "react-icons/fa";
import { IoHeartDislikeOutline } from "react-icons/io5";


const Content = ({ option,info }) => {


    // girilen text karakterleri ile çıkan sonucun name bilgisini bold yap
    function textBold(text,param) {
        // RegExp içindeki 'gi' g:global olarak metnin tamamında arama yapar, i:büyük küçük harf duyarsız işlem yap
        const regex = new RegExp(`(${param})`, 'gi');
        const parts = text.split(regex);

        return parts.map((part, index) =>
            regex.test(part) ? <b key={index}>{part}</b> : part
        );
    }

    return (
        <div style={{width:'100%',padding:5}}>
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'start',
                    flexWrap: 'wrap',
                    gap: 2,
                    p:2,
                    overflow: 'auto',
                    border: `1px solid black`,
                    borderRadius: 2,
                    // karakterim durumu 'dead' ise arka plan kırmızı yap değilse yeşil yap
                    '&:hover': option?.status == 'Alive' ? { backgroundColor: 'green' } : { backgroundColor: 'red' }, cursor: 'pointer'
                }}
            >
                <img src={option?.image} loading='lazy' component="img" height="80" style={{ borderRadius: 5 }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography align='left' variant='subtitle1'>
                        {textBold(option?.name,info)}
                    </Typography>

                    <Box sx={{display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap'}}>

                        <Typography align='left' variant='subtitle2'>
                            {option?.episode.length} Episodes
                        </Typography>

                        <Typography variant='subtitle2' style={{ alignItems: 'center', display: 'flex', gap: 3 }}>
                                Status:
                                {
                                    option?.status == 'Alive' ? <FaHeart color='red' /> :<IoHeartDislikeOutline color='black' />
                                }
                            </Typography>

                    </Box>



                </Box>
            </Box>

        </div>
    )
}

export default Content