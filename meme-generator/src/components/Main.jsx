import { useState, useEffect } from "react"

export default function Main() {
    const [meme, setMeme] = new useState({
        topText : "one does not simply",
        bottomText : "walk into mordor",
        imageUrl : "http://i.imgflip.com/1bij.jpg",    
    })
    const [allMemes, setAllMemes] = useState([])

    function handleChange(event) {
        const {value, name} = event.currentTarget;
        setMeme(prevMeme => ({
            ...prevMeme,
            [name] : value,
        }))
    }

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])

    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="one does not simply"
                        name="topText"
                        onChange={handleChange}
                        value={meme.topText}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="walk into mordor"
                        name="bottomText"
                        onChange={handleChange}
                        value={meme.bottomText}
                    />
                </label>
                <button>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src= {meme.imageUrl}/>
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}