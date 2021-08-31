const basePath = 'https://api.jikan.moe/v3';

export const topAnimesUrl = () => {
    return `${basePath}/top/anime`;
}
export const topManga = () => {
    return `${basePath}top/manga`;
}

export const animeObj = (item) => {
    const obj = {
        title: item.title,
        episodes: item.episodes,
        type: item.type,
        image_url: item.image_url,
        isAnime: true,
        start_date: item.start_date,
        end_date: item.end_date,
        malScore: item.score,
        rank: item.rank
    }
    if(item?.start_date === item?.end_date && item.type.toLowerCase() === "movie"){
        obj['isOAV'] = true
    }
    return obj
}
