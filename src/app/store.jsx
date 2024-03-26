import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rickAndMortySliceReducer from '../features/rickAndMortySlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rickAndMortySliceReducer)

//store created
export const store = configureStore({

  reducer: {
    rickandmorty: persistedReducer,
  },


  //consolda çıkan serileştirme hatasını göstermiyor
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),

})

export const persistor = persistStore(store)
