import React from 'react';
import {Card} from 'antd';
const {Meta} = Card;

export const AnimeCard = ({...props}) => {
    return(
        <Card
            hoverable
            style={{ width: 120 }}
            cover={<img alt={props.item.title} src={props.item.image_url} />}
        >
            <Meta title={props.item.title} />
        </Card>
    )
}
