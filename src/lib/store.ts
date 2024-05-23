import { configureStore } from '@reduxjs/toolkit'
import CartSlice from './features/CartSlice'
import UserSlice from './features/UserSlice'
import productsSlice from './features/ProductSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            cart : CartSlice,
            user : UserSlice,
            products :productsSlice,
        },
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']