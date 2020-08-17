//MAIN DATA COLLECT
document.getElementById('search_btn').addEventListener('click', function () {
    const searchVal = document.getElementById('search').value;
    const url = `https://api.lyrics.ovh/suggest/${searchVal}`
    fetch(url)
        .then(response => response.json())
        .then(jsonData => {
            displayData(jsonData);
            lyricsShow(jsonData);
        });
});

//DISPLAY ITEM SHOW
function displayData(json) {
    const dataArray = json.data;
    const parent = document.getElementById('song_container');
    parent.innerHTML = ``;
    for (let i = 0; i < 10; i++) {
        const element = dataArray[i];
        parent.innerHTML += `<div class="single-result row align-items-center my-3 p-3">
        <div class="col-md-6">
        <h3 class="lyrics-name">${element.title}</h3>
        <p class="author lead">Album by <span>${element.artist.name}</span></p>
        </div>
        <div class="col-md-3 text-md-right text-center">
        <a href="${element.link}" target="_blank" class="btn btn-info">Play Song</a>
        </div>
        <div class="col-md-3 text-md-right text-center">
        <button id="lyrics_btn${i}" class="btn btn-success">Get Lyrics</button>
        </div>`;
    };
};

//LYRICS COLLECT AND SHOW
function lyricsShow(json) {
    const dataArray = json.data;
    for (let i = 0; i < 10; i++) {
        const element = dataArray[i];
        document.getElementById(`lyrics_btn${i}`).addEventListener('click', function () {
            const lyricsUrl = `https://api.lyrics.ovh/v1/'${element.artist.name}'/'${element.title}'`
            fetch(lyricsUrl)
                .then(response => response.json())
                .then(data => {
                    const lyricsOutput = data.lyrics;
                    if (lyricsOutput == undefined) {
                        document.getElementById('single_lyrics').innerHTML = `<h2 class="text-success mb-4">${element.title}</h2><h3 class="lyric text-white">Sorry, The Song Lyrics Is Not Found.</h3>`;
                    } else {
                        document.getElementById('single_lyrics').innerHTML = `<h2 class="text-success mb-4">${element.title}</h2><pre class="lyric text-white">${lyricsOutput}</pre>`;
                        document.getElementById('search').value = '';
                    }
                })
        });
    };
};