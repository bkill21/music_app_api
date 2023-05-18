let token
let song


async function getToken(){
    const res = await fetch('https://accounts.spotify.com/api/token',{
        method: 'POST',
        body: 'grant_type=client_credentials',
        headers: {
            Authorization : `Basic ${btoa(clientId+':'+clientSecret)}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    if (res.ok){
        const data = await res.json()
        return data.access_token
    }
}

(async ()=>{
    token = await getToken()
})()


// getSongApiCall('R.I.P.C.D', 'Flatbush Zombies')
// getSongApiCall('Wrong Side of Heaven', 'Five Finger Death Punch')
// getSongApiCall('Woods', 'Mac Miller')
// getSongApiCall('Nurse Ratched', 'Cherry Glazerr')
// getSongApiCall('Angel', 'Sticky Fingers')
// getSongApiCall('What Once Was', 'Hers')

async function getSongApiCall(track, artist){
    const res = await fetch(`https://api.spotify.com/v1/search?q=${track},${artist}&type=track,artist`,{
        method: 'GET',
        headers:{
            Authorization: `Bearer ${await getToken()}`,
            'Content-Type': 'application/json'
        }
    })
    if(res.ok){
        const data = await res.json()
        return(data.tracks.items[0].preview_url)
    }
}

const imgs = document.getElementsByTagName('img')
console.log(imgs)
for(const image of imgs){
    image.addEventListener('click', async ()=>{
        const [track, artist] = image.alt.split(' - ')
        if(song){
            stopSong()
        }
        playSong(await getSongApiCall(track, artist))
    })
}


function playSong(url){
    song = new Audio(url)
    song.volume = .1
    song.play()
}

function stopSong() {
    song.pause()
}

// const button = document.querySelector('#stop-button')

// button.addEventListener('click', ()=> stopSong())

const figures = document.querySelectorAll('.fig-container');
figures.forEach(fig => {
  fig.addEventListener('click', () => {
    // remove active class from all figures
    figures.forEach(f => f.classList.remove('active'));
    // add active class to clicked figure
    fig.classList.add('active');
  });
});