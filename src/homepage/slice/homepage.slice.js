import {createSlice} from "@reduxjs/toolkit";
import {useInjectReducer, useInjectSaga} from "redux-injectors";
import {homepageSaga} from "./homepage.saga";
import {animeObj} from "../utils/homepage.utils";

export const initialState = {
    user: {
        name: "admin"
    },
    manga: [

    ],
    anime: [

    ],
    topAnime: [],
    topManga: []
}

export const slice = createSlice({
    name: 'homepage',
    initialState,
    reducers: {
        getAnime(state, action){},
        setAnimeList(state, action){
           state.topAnime = action.payload.map(item => animeObj(item));
        }
    }
})

export const {actions: appActions, reducer } = slice;

export const useHomeSlice = () => {
    useInjectReducer({ key: slice.name, reducer: slice.reducer });
    useInjectSaga({ key: slice.name, saga: homepageSaga });
    return { actions: slice.actions };
};
