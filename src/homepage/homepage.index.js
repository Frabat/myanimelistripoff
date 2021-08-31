import React, {useEffect, useState} from 'react'
import {useHomeSlice} from "./slice/homepage.slice";
import {useDispatch, useSelector} from "react-redux";
import {topAnimeSelector} from "./slice/homepage.selectors";
import {Col, Row, Switch} from "antd";
import {AnimeCard} from "./components/AnimeCard";

export const Homepage = () => {
    const dispatch = useDispatch();
    const { actions } = useHomeSlice();
    const animeList = useSelector(topAnimeSelector);
    const [list, setList] = useState([]);
    useEffect(() => {
        dispatch(actions.getAnime());
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setList(animeList);
    }, [animeList])

    const renderCards = () => {
        return list.map(item => {
            return(<Col span={2} xxs={12} md={4} sm={6} lg={3} xs={8} xl={2}>
                <AnimeCard item={item}/>
            </Col>)
        })
    }

    const groupByCategory = () => {
            let movies = [];
            let tv = [];
            let ova = [];
        const grouped = animeList.reduce((list, item) => {
            switch (item.type){
                case 'Movie':
                    movies.push(item);
                    break;
                case 'TV':
                    tv.push(item);
                    break;
                case 'OVA':
                    ova.push(item);
                    break;
                default:
                    movies.push(item);
            }
            return movies.concat(tv).concat(ova);
        })
        console.log(grouped);
        setList(grouped);
    }



    const toggleSwitch = (checked) => {
        console.log(checked)
        if(checked){
            groupByCategory();
        } else {
            dispatch(actions.getAnime());
        }
    }

    return (
        <>
            <Switch defaultChecked={false} onChange={toggleSwitch}/>

            <Row gutter={[6, 6]}>
                {renderCards()}
            </Row>
        </>
    );
}
