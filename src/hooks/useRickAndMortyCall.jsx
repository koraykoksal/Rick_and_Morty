
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toastInfoNotify, toastSuccessNotify, toastErrorNotify, toastWarnNotify } from '../helper/ToastNotify'
import { uid } from "uid";
import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { fetchFail, fetchRickAndMortyData, fetchStart, fetchSustainabilityData } from '../features/rickAndMortySlice';


const useRickAndMortyCall = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const getFind_Character = async (params) => {

        dispatch(fetchStart())

        try {

            const res = await axios(`${process.env.REACT_APP_API_ADDRESS}/?name=${params}`);

            if (res.status === 200) {
                dispatch(fetchRickAndMortyData(res?.data));
            } else {
                // 200 dışındaki hatalatı için göster
                toastWarnNotify('There is something, but not exactly what was expected');
            }
        } 
        catch (error) {
            // api den gelen 400 lü hata varsa göster
            if (error.response && error.response.status === 404) {
                dispatch(fetchRickAndMortyData([]));
                dispatch(fetchFail())
                toastWarnNotify('There is nothing');
            } else {
                dispatch(fetchRickAndMortyData([]));
                dispatch(fetchFail())
                // diğer hata tipleri için göster
                // console.log("getFind_Character", error);
                toastWarnNotify('An unexpected error occurred');
            }
        }
    }

    return {
        getFind_Character,
    }

}

export default useRickAndMortyCall




















