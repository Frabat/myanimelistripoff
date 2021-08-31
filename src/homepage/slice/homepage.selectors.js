import {createSelector} from "@reduxjs/toolkit";
import {initialState} from './homepage.slice'

export const selectDomain = (state) => (state && state.homepage) || initialState

export const topAnimeSelector = createSelector(
    [selectDomain],
    homepage => homepage.topAnime
);
