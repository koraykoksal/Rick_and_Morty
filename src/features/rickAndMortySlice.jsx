
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createElement, useEffect } from "react";
import moment from "moment";


const initialState = {
    loading:false,
    error:false,
    ramCharacterData:[],
    selectedCharacters:[]
}

const rickAndMortySlice = createSlice({

    name: "rickandmorty",
    initialState,
    reducers: {


        fetchStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        fetchFail: (state) => {
            state.loading = false;
            state.error = true;
        },
        fetchRickAndMortyData:(state,{payload})=>{
            state.loading=false
            state.ramCharacterData=payload
        },
        fetchSendSelectedData:(state,{payload})=>{
            state.selectedCharacters=payload
        },



    }


})



export const {
    
    fetchStart,
    fetchFail,
    fetchRickAndMortyData,
    fetchSendSelectedData

} = rickAndMortySlice.actions

//slice oluşturulduktan sonra export default olarak export edilmeli ve reducer ifadesi belirtilmelidir.
export default rickAndMortySlice.reducer






