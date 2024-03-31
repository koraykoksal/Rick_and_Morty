import React from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { IoClose } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { IoHeartDislikeOutline } from "react-icons/io5";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../styles/globalStlye';
import { MdDeleteForever } from "react-icons/md";
import { fetchSendSelectedData } from '../../features/rickAndMortySlice';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: '50%',
    // maxHeight:'500px',
    overflow: 'auto',
    bgcolor: 'background.paper',
    borderRadius: 3,
    p: 4,

};

const Characters = ({ open, handleClose, selectedCharacters }) => {

    const dispatch = useDispatch()

    // silinen data bilgisi redux dan silinerek yeniden render olur
    const handleDelete = (e, data) => {
        const updateChracter = selectedCharacters?.filter(chr => chr.id !== data.id)
        dispatch(fetchSendSelectedData(updateChracter))
    }


    return (
        <div>
            <Modal
                keepMounted
                open={open}
                onClose={() => {
                    handleClose()
                }}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={{
                    ...style,
                    width: {
                        xs: '90%', // Extra small ve daha küçük cihazlar için
                        sm: '75%', // Small ve daha büyük cihazlar için
                        md: '50%', // Medium ve daha büyük cihazlar için
                        lg: '40%'  // Large ve daha büyük cihazlar için
                    },
                    height: {
                        xs: '90%', // Extra small ve daha küçük cihazlar için
                        sm: '75%', // Small ve daha büyük cihazlar için
                        md: '70%', // Medium ve daha büyük cihazlar için
                        lg: '70%'  // Large ve daha büyük cihazlar için
                    },

                }}>

                    <IoClose size={26} color='red' onClick={handleClose} cursor={'pointer'} />

                    <Typography align='center' py={2}>Selected Data - (Total: {selectedCharacters.length})</Typography>
                    <Typography align='center' py={2}></Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxHeight: '600px' }}>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {
                                selectedCharacters?.map((item, index) => (

                                    <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, gap: 1 }}>


                                        <Box
                                            //tabIndex işlemi her kartın keyboard üzerinden dinlenebilir olmasını sağlar
                                            tabIndex={0}
                                            id={index}
                                            sx={{
                                                width: '100%',
                                                alignItems: 'center',
                                                display: 'flex',
                                                // justifyContent: 'space-between',
                                                flexDirection: 'column',
                                                flexWrap: 'wrap',
                                                gap: 1,
                                                p: 1,
                                                overflow: 'auto',
                                                border: `1px solid ${colors.cardBorder}`,
                                                borderRadius: 2,
                                                // karakterim durumu 'dead' ise arka plan kırmızı yap değilse yeşil yap
                                                '&:hover': item.status == 'Dead' ? { backgroundColor: 'red' } : { backgroundColor: 'green' }, cursor: 'pointer'
                                            }}
                                        >

                                            <Typography variant='subtitle2' sx={{ fontSize: 10 }}>Selected Date: {item?.selectedDate}</Typography>


                                            <Box sx={{
                                                width: '100%',
                                                p:1,
                                                alignItems: 'center',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                flexWrap: 'wrap',
                                                gap: 2
                                            }}>

                                                <img src={item?.image} loading='lazy' component="img" height="80" style={{ borderRadius: 5 }} />

                                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                                    <Typography align='left' variant='subtitle1'>
                                                        {item?.name}
                                                    </Typography>

                                                    <Typography align='left' variant='subtitle2'>
                                                        {item?.episode.length} Episodes
                                                    </Typography>

                                                </Box>

                                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexWrap: 'wrap' }}>
                                                    <Typography align='left' variant='subtitle2'>Gender: {item?.gender}</Typography>
                                                    <Typography align='left' variant='subtitle2'>Species: {item?.species}</Typography>
                                                    <Typography variant='subtitle2' style={{ alignItems: 'center', display: 'flex', gap: 3 }}>
                                                        Status:
                                                        {
                                                            item?.status == 'Dead' ? <IoHeartDislikeOutline color='red' /> : <FaHeart color='red' />
                                                        }
                                                    </Typography>
                                                </Box>

                                            </Box>





                                        </Box>

                                        <MdDeleteForever size={30} color='red' cursor={'pointer'} onClick={(e) => handleDelete(e, item)} />

                                    </Box>

                                ))
                            }
                        </Box>

                    </Box>


                </Box>

            </Modal>

        </div>
    )
}

export default Characters