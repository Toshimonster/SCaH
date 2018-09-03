let vw = 0
let vh = 0

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
    let admins = document.getElementsByClassName("profilePic")
    console.log(discord.style)
    console.log("hi")
    setInterval(() => {
        time += 1
        if (time > 10000) time -= 10000;

        if (document.body.scrollTop < (100*vh)) {
            //First Secton animations
            for (var i = 0; i < introTitle.length; i++) {
                introTitle[i].style["text-shadow"] = `${0} ${0} ${"5vh"} rgba(255, 255, ${255 - (i*50)}, ${1 - Math.abs(0.0015*((time % 1000)-500))}`
            }

            fullTitle.style["top"] = `${15+((document.body.scrollTop / vh) * 0.2)}vh`
            Title.style["top"] = `${35-((document.body.scrollTop / vh) * 0.2)}vh`
            introBackground.style["background-position"] = `50% ${100 - ((document.body.scrollTop / vh) * 2)}%`
        } 
        if (document.body.scrollTop < (200*vh) && document.body.scrollTop > (0*vh)) {
            //Second section Animations
        }
        if (document.body.scrollTop < (300*vh) && document.body.scrollTop > (100*vh)) {
            //Third section Animations
            if (document.body.scrollTop/vh < 200) { 
                for (var i = 0; i < admins.length; i++) {
                    admins[i].style["top"] = `${((200 - (document.body.scrollTop / vh))/100)*(35*vw)}px`
                }
                discord.style["left"] = `${(((200 - (document.body.scrollTop / vh))/100)*(35*vw))}px`
            }
        }
    }, 1)
}
