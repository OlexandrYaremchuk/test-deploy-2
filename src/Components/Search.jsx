import React, { useEffect, useState } from "react"
import s from './Search.module.css'
import axios from 'axios';
import clearIcon from '../img/54972.png'

const Search = (props) => {
    const [musicData, setMusicData] = useState([])
    const [value, setValue] = useState('')

    const API_KEY = 'YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4'
    const options = {
        method: 'GET',
        url: `http://api.napster.com/v2.2/search/verbose?apikey=${API_KEY}&query=${value}`,
        params: { s: 'daft_punk' },
    }
    const getMusic = () => {
        axios(options).then(response => {
            setMusicData(response.data.search.data.tracks)
            console.log(musicData)
        })
    }
    useEffect(() => {
        getMusic()
    }, [])
    useEffect(() => {
        getMusic()
    }, [options.url])


    const clear = () => {
        setValue('')
    }

    return (

        <div>
            <form className={s.searchBox}>
                <input
                    placeholder='Search.....'
                    type="text"
                    value={value}
                    onChange={(event) => { setValue(event.target.value) }}
                />
                <img className={s.clearIcon} src={clearIcon} onClick={clear} alt="" />

            </form>
            <div className={s.musicBox}>
                {
                    musicData.map(music => {
                        // const size = '356x237'
                        // const extension = 'jpg'
                        const imgLink = `https://api.napster.com/imageserver/v2/artists/${music.artistId}/images/230x153.jpg`

                        return (
                            <div
                                className={s.musicContainer}>
                                <h4>{music.artistName}</h4>
                                <h3>{music.name}</h3>
                                <img src={imgLink} alt="" />

                                <audio className={s.player}
                                    controls
                                    src={music.previewURL}></audio>
                                <div>

                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
};
export default Search