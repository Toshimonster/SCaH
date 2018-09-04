let runeImg = [
    "../images/runes/A.png",
    "../images/runes/D.png",
    "../images/runes/G.png",
    "../images/runes/K.png",
    "../images/runes/N.png",
    "../images/runes/R.png"
]

let vw = 0
let vh = 0

easing = (time, start, change, duration) => {
    // quintic easing in/out
    time /= duration/2;
	if (time < 1) return change/2*time*time*time*time*time + start;
	time -= 2;
	return change/2*(time*time*time*time*time + 2) + start;
}
sscroll = null
smoothScroll = (y1, y2, t=1) => {
    return new Promise((resolve, reject) => {
        clearInterval(sscroll)
        let ttemp = 0
        let diff = y2 - y1
        sscroll = setInterval(() => {
            ttemp += 0.001
            document.body.scrollTop = easing(ttemp, y1, diff, t)
            if (ttemp >= t) {
                clearInterval(sscroll)
                resolve(true)
            }
        }, 1)
    }) 
}
navScroll = (section) => {
    smoothScroll(document.body.scrollTop, section*100*vh, 0.5)
}
introductor = () => {
    navScroll(1)
}

window.addEventListener('load',function(){
    initializeV();
    function initializeV(){
            //1% of the parent viewport width (same as 1vw):
            vw = window.parent.innerWidth/100;
            //1% of the viewport height (same as 1vh):
            vh = window.parent.innerHeight/100;

            //assign width and height to your v unit elements here
            let discordFrame = document.getElementById("discordFrame")
            discordFrame.width = 35*vw
            discordFrame.height = 100*vh
            discordFrame.overflow = "hidden"
            
    }

    window.parent.addEventListener('resize',function(){
          //when the browser window is resized; recalculate
          initializeV();
    });
});


let time = 0
window.onload = () => {
    let introBackground = document.getElementById("intro")
    let introTitle = document.getElementsByClassName("intro-Title")
    let fullTitle = document.getElementById("FullTitle")
    let title = document.getElementById("Title")
    let discord = document.getElementById("discord")
    let profiles = document.getElementById("profiles")
    let profileText = document.getElementsByClassName("profileIdentifier")
    let runes = document.getElementsByClassName("rune")
    let navRunes = document.getElementsByClassName("nav")
    let navbarScrub = document.getElementById("navbar-scrub")

    //39(max) - 26(min) = 13
    let scrubmulti = (document.body.scrollTopMax / (14*vh))/2
    

    /*for (var i = 0; i < runes.length; i++) {
        runes[i].src = runeImg[Math.floor(Math.random()*runeImg.length)]
    }*/
    //document.getElementsByClassName("introductor")[0].src = "../images/runes/INTRODUCTOR.png"
    setInterval(() => {
        navbarScrub.style["top"] = `${(26*vh) + (document.body.scrollTop / scrubmulti)}px`
        time += 1
        if (time > 10000) time -= 10000;

        if (document.body.scrollTop < (100*vh)) {
            //First Secton animations

            for (var i = 0; i < introTitle.length; i++) {
                introTitle[i].style["text-shadow"] = `${0} ${0} ${"5vh"} rgba(255, 255, ${255 - (i*50)}, ${1 - Math.abs(0.0015*((time % 1000)-500))}`
            }
            
            fullTitle.style["top"] = `${15+((document.body.scrollTop / vh) * 0.2)}vh`
            Title.style["top"] = `${20-((document.body.scrollTop / vh) * 0.2)}vh`
            introBackground.style["background-position"] = `50% ${100 - ((document.body.scrollTop / vh) * 2)}%`
        } 
        if (document.body.scrollTop < (200*vh) && document.body.scrollTop > (0*vh)) {
            //Second section Animations
        }
        if (document.body.scrollTop < (300*vh) && document.body.scrollTop > (100*vh)) {
            //Third section Animations
            if (document.body.scrollTop/vh < 200) { 
                profiles.style["margin-top"] = `${((200 - (document.body.scrollTop / vh))/100)*(35*vw)}px`
                discord.style["left"] = `${(((200 - (document.body.scrollTop / vh))/100)*(35*vw))}px`
            } else {
                profiles.style["top"] = "0px"
                discord.style["left"] = "0px"
            }
        }
    }, 1)
}

let cipher = [
    38, //up
    38, //up
    40, //down
    40, //down
    37, //left
    39, //right
    37, //left
    39, //right
    98, //B
    97  //A
]
let tosolve = cipher.slice()
let started = false
let completed = false
let x = null
document.addEventListener('keypress', (event) => {
    let charCode = 0;
    if (event.which != 0) {
        charCode = event.which
    } else {
        charCode = event.keyCode
    }
    if (!completed) {
        if (charCode == tosolve[0] && !started) {
            tosolve.shift()
            started = true
            x = setTimeout(() => {
                tosolve = cipher.slice()
                started = false
            }, 10000)
        } else if (charCode == tosolve[0]) {
            tosolve.shift()
            if (tosolve.length == 0) {
                completed = true
                clearTimeout(x)
                primekeeper()
            }
        } else {
            clearTimeout(x)
            tosolve = cipher.slice()
            started = false
        }
    }
});

primekeeper = () => {
    alert("Prime is the keeper, keeper of many things.")
    let prime = [
        "Prime",
        "is",
        "the",
        "keeper",
        "the",
        "keeper",
        "of",
        "many",
        "things"
    ]
    let t = 0
    let i = 0
    let a = document.body.getElementsByClassName("t")
    let b = document.body.getElementsByClassName("profilePic")
    for (i = 0; a.length; i++) {
        t++
        let s = ""
        JSON.stringify(a[i].innerHTML).split(" ").forEach((e) => {
            s += prime[t%9] + " "
            t++
        })
        a[i].innerHTML = s
    }
    for (i = 0; b.length; i++) {
        i++
        b[i].style["background-image"] = url('./images/prime.png')
        b[i].innerHTML = prime[t%9]
    }
    i = 0
    t = 0
    setInterval(() => {
        i++
        t++
        let s = ""
        JSON.stringify(a[i%a.length].innerHTML).split(" ").forEach((e) => {
            s += prime[t%9]
            t++
        })
    },500)
}
