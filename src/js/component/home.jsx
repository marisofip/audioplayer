import React from "react";
//import './App.css';
import { useEffect, useRef, useState } from 'react';



import {AiFillPlayCircle} from "react-icons/ai";
import {AiFillPauseCircle} from "react-icons/ai";
import {BiSkipNextCircle} from "react-icons/bi";
import {BiSkipPreviousCircle} from "react-icons/bi"


 
function Home() {
	const [lista, setLista] = useState([]);
  const [isPlaying, setIsPlaying ] = useState(false);
  const [music, setMusic] = useState(0)
  const audioPlayer = useRef(null);
console.log(music);

//fetch

  function getInfo() {
	fetch("https://assets.breatheco.de/apis/sound/songs") //ir a busca
	  .then((response) => {
		console.log(response.status);
		return response.json();
	  }) //promesa 1
	  .then((data) => setLista(data)) //promesa 2
	  .catch((err) => console.log(err));
	}
	//console.log(lista);

// Use effect
	  useEffect(() => {
		  getInfo();
	  }, []);
	  console.log(lista);

const  setSong = (link , i) => {
	audioPlayer.current.src = `https://assets.breatheco.de/apis/sound/${link}`
	audioPlayer.current.play();
	setIsPlaying(i)
}
 
  const changePlaying =()=> { //funcion que cambia boton de play a pause
	const prevValue = isPlaying
	setIsPlaying(!prevValue);
	if (!prevValue){
		audioPlayer.current.play()}
		else {
			audioPlayer.current.pause();
		}
	}
  
	const nextMusica = () => {
		if (music <= lista.length -1) {
			setMusic(music+1);
		} else { setMusic(0);}
		audioPlayer.current.src = `https://assets.breatheco.de/apis/sound/${lista[music].url}`
		audioPlayer.current.play();
		  console.log(lista[music].url);
	  }
	 
	  const anteriorMusica = () => {
		if (music > 0) {
			setMusic(music-1);
	} else { setMusic(lista.length -1);}
	audioPlayer.current.src = `https://assets.breatheco.de/apis/sound/${lista[music].url}`
	audioPlayer.current.play();
	  console.log(lista[music].url);
	}
 
 return (
	<>
	<div className='titulo'><h2 className='my-2 py-2'>Audio Player</h2></div>
	<div className="container">
	<ol> {lista.map((item, index) => (<li key={index} className="btn bg-light d-flex flex-column mb-3" onClick={()=>setSong(item.url,index)}>{item.name}</li>))}  </ol>
	
		<audio  ref={audioPlayer} src="https://assets.breatheco.de/apis/sound/songs" type="audio.mp3"/>
		<div className="controles">
		<button className="botones" onClick={anteriorMusica}> <BiSkipPreviousCircle/> </button>
		<button className="botones" onClick={changePlaying} > { isPlaying ? <AiFillPauseCircle/> : <AiFillPlayCircle/> }	</button>
		<button className="botones" onClick={nextMusica}> <BiSkipNextCircle/> </button>
		</div>
		
	</div>
	</>
 )

}


export default Home;
//<div className="audioplayer" audio= {audio} setAudio= {setAudio}  isPlaying= {isPlaying} setIsPlaying= {setIsPlaying}> </div>