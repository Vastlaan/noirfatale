
const unchecked=()=>{
	document.querySelector('#navi-toggle').checked=false ;
}

const thankyou=()=>{
	if(document.querySelector('.contact__form--name').value !== "" && document.querySelector('.contact__form--email').value !== ""){
		console.log()
		document.querySelector('#thankyou_message').style.display="block" 
	}	
}

const thankyouclose=()=>{
	document.querySelector('#thankyou_message').style.display="none"
}

const showUp=()=>{
	const hidden = document.querySelectorAll('.hidden');
	const text = document.querySelector('.lyrics__more--text');
	let check = true;
	hidden.forEach(item=>{
		if(item.style.display==="none"){
			check = true;
		}
		else{
			check = false;
		}
	})
	if(check){
		hidden.forEach(item=>{
			return item.style.display="block";
			});
		text.innerHTML="Hide"
	}
	else{
		hidden.forEach(item=>{
			return item.style.display="none";
			});
		text.innerHTML="More"
	}
	
}
//==========================================Audio Player===========================================

const audio = document.querySelector('.audio');
let source = document.querySelector('.audio__source').getAttribute('src');
let title = document.querySelector('.music__player--title');
let current =  parseInt(audio.currentTime.toFixed(0));
const track = document.querySelector('.music__player--track');
const zip = document.querySelector('.music__player--track-zip');
const volume = document.querySelector(".music__player--volumeBox");
const v = document.querySelector(".music__player--volume");
const vt = document.querySelector(".music__player--volume-text")

const adjustVolume = (event) =>{
	let left = volume.getBoundingClientRect().left.toFixed(0);
	let right = volume.getBoundingClientRect().right.toFixed(0);
	audio.volume = (event.clientX - left) / (right-left);
	let stylesVolume = window.getComputedStyle(volume);
	stylesVolume.getPropertyValue('width');
	let percentage = (((event.clientX - left) / (right-left)) * 100).toFixed(0);
	v.style.width = `${percentage}%`;
	v.style.height = `${percentage}%`;
	let currentAudioVolume = (audio.volume * 100).toFixed(0);
	vt.innerHTML = `${currentAudioVolume}%`;
}


let duration =1;
audio.addEventListener("loadedmetadata", function(_event) {
    duration = audio.duration.toFixed(0);
});
let compStyles = window.getComputedStyle(track)
let width = compStyles.getPropertyValue('width').split("p")[0];
window.onresize = ()=>{
	compStyles=window.getComputedStyle(track);
	width = compStyles.getPropertyValue('width').split("p")[0];
}
const moveZip=(event)=>{
	stop()
	let left = track.getBoundingClientRect().left.toFixed(0);
	let right = track.getBoundingClientRect().right.toFixed(0);
	let w = right - left;
	current=( ((event.clientX-left)*duration) / w ).toFixed(0)
	let unit = (w/duration).toFixed(2)
	let u = unit * current
	zip.style.left=`${u}px`
	play()
}
const start=()=>{
	inter = setInterval(()=>{
	current=audio.currentTime.toFixed(0);
	let unit = (width/duration).toFixed(2)
	let u = unit * current
	zip.style.left=`${u}px`
},1000)}
const clear=()=>{
	clearInterval(inter)
}
const play=()=>{
	audio.load()
	audio.currentTime= current;
	audio.play()
	start()
}
const pause=()=>{
	audio.pause()
	current=audio.currentTime;
	clear()
}
const stop =()=>{
	audio.pause()
	current=0;
	audio.currentTime= current;
	clear()
}
(()=>{
	title.innerHTML=source.split('/')[1].split('.')[0];
})()
const highlight=()=>{
	const list = document.querySelector('.music__player--list').children
	for(let i = 0; i<list.length; i++){
		if(list[i].innerHTML===title.innerHTML){
			list[i].className+=" highlight"
		}
		else{
			list[i].className = list[i].className.split(" ")[0]
		}
	}
}
highlight()
const setSource=(event)=>{
	document.querySelector('.audio__source').setAttribute('src', `audio/${event.target.innerHTML}.mp3`)
	title.innerHTML=event.target.innerHTML
	highlight()
	stop()
	play()
}
