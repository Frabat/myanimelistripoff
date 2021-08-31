import {call, put, takeLatest} from'redux-saga/effects'
import {noOptRequest, request} from "../../utils/request";
import {topAnimesUrl} from "../utils/homepage.utils";
import {appActions as actions} from "./homepage.slice";

export function* getAnime(){
    const url = topAnimesUrl();
    const response = yield call(noOptRequest, "get", url);
    yield put(actions.setAnimeList(response.top));
}

export function* homepageSaga(){
    yield takeLatest(actions.getAnime.type, getAnime);
}
