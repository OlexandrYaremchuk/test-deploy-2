import React, { useEffect, useState, useRef } from 'react'
import s from './MusicList.module.css'
import axios from "axios"

const MusicList = (props) => {
    // debugger
    const [error, setError] = useState(null)
    const [isLoader, setIsLoader] = useState(false)
    const [musicData, setMusicData] = useState({ albums: [] })
    // const [tagResult, setTagResult] = useState(JSON.stringify(props.newTagName))

    // const tagResult = Object.values(store.state.newTagData);
    // const tagResult = JSON.stringify(props.newTagName);
    const tagResult = JSON.stringify(props.newTagName);
    console.log(`t:${tagResult}`)

    // let tag = {tagResult}
    // console.log(`finish:${tag}`)
    const options = {
        method: 'GET',
        timeout: 10000,
        url: `https://deezerdevs-deezer.p.rapidapi.com/search?q=${tagResult}`,
        // url: 'https://deezerdevs-deezer.p.rapidapi.com/search?q=',

        headers: {
            'X-RapidAPI-Key': '082c350bedmsh30bd8702b6f2bdcp1b9a16jsnf7a143799076',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }

    };
    console.log(options.url)
    useEffect(() => {
        axios(options)
            .then((res) => {
                setIsLoader(true)
                setMusicData(res.data.data)
                console.log(res.data.data)
            })
    }, [])


    if (error) {
        return <div>ERROR:{error.message}</div>
    } else if (!isLoader) {
        return <div>Loader ...</div>
    } else {
        return (
            musicData.map(music => {
                return (
                    <div
                        className={s.chartContainer}>
                        <img src={music.artist.picture_medium} alt="" />
                        <h3>{music.title}</h3>
                        <audio className={s.player}
                            controls
                            src={music.preview}></audio>
                        <div>

                        </div>
                    </div>

                )
            })
        )
    }


}

export default MusicList