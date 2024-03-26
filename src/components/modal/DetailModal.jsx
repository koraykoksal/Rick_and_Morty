import React from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { IoClose } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { IoHeartDislikeOutline } from "react-icons/io5";
import { useEffect,useState } from 'react';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    borderRadius: 3,
    // border: '2px solid #000',
    // boxShadow: 14,
    p: 4,

};


const DetailModal = ({ open, handleClose, selectedData }) => {


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
                <Box sx={style}>

                    <IoClose size={26} color='red' onClick={handleClose} cursor={'pointer'} />

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>


                        <Typography align='center'>Name: {selectedData?.name}</Typography>

                        <Typography align='center'>Episodes: {selectedData?.episode?.length}</Typography>

                        <img src={selectedData?.image} loading='lazy' component="img" height="120" style={{ borderRadius: 5, margin: 'auto', display: 'flex' }} />

                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                            <Typography align='center'>Gender: {selectedData?.gender}</Typography>
                            <Typography align='center'>Species: {selectedData?.species}</Typography>
                            <Typography style={{ alignItems: 'center', display: 'flex', gap: 3 }}>
                                Status:
                                {
                                    selectedData?.status == 'Dead' ? <IoHeartDislikeOutline color='red' /> : <FaHeart color='red' />
                                }
                            </Typography>
                        </Box>



                    </Box>


                </Box>

            </Modal>
        </div>
    )
}

export default DetailModal