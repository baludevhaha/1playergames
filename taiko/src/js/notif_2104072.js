try{

    var ex_strings = {
        new_song: {
            ja: "新曲：",
            en: "New song:",
            cn: "新歌：",
            tw: "新歌：",
            ko: "새로운 노래："
        },
        play: {
            ja: "演奏する",
            en: "Play",
            cn: "玩",
            tw: "玩",
            ko: "플레이"
        },
        vote: {
            ja: "新曲に投票する",
            en: "Vote for new songs",
            cn: "投票选新歌",
            tw: "投票選新歌",
            ko: "신곡 투표"
        },
        close: {
            ja: "閉じる",
            en: "Close",
            cn: "关闭",
            tw: "關閉",
            ko: "닫기"
        }
    }
    
    var new_song = { 
        id: 202,
        date: "2021-04-29",
        title: {
            ja: "あなたとトゥラッタッタ♪",
            en: "Anata to Tu-lat-tat-ta♪",
            cn: "あなたとトゥラッタッタ♪",
            tw: "あなたとトゥラッタッタ♪",
            ko: "あなたとトゥラッタッタ♪"
        }
    }
    
    function addStyle(styleString) {
        const style = document.createElement('style');
        style.textContent = styleString;
        document.head.append(style);
    }
    
    addStyle(`
    #infoBanner {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        max-height: 100%;
        overflow: hidden auto;
        padding: 0.5em;
        background: rgba(170,238,255,0.95);
        font-family: TnT, sans-serif;
        font-size: 20px;
        cursor: default;
        z-index: 10;
        margin: 10px;
        border-radius: 5px;
        border: 0.1em #702222 solid;
    }
    
    #infoBanner span {
        user-select: text;
    }
    
    .taibtn-info {
        font-size: 1.1em;
        margin-right: 10px;
        margin-top: 10px;
    }
    
    .taibtn-hide {
        float: right;
        margin-right: 0;
    }
    `)
    
    var notifs = JSON.parse(localStorage.getItem('notifs')) || [];
    var notif_name = 'new_song_' + new_song.date;
    
    if (!notifs.includes(notif_name)) {
        var lang
        try{
            if("localStorage" in window && window.localStorage.lang && window.localStorage.lang in allStrings){
                lang = window.localStorage.lang
            }
            if(!lang && "languages" in navigator){
                var userLang = navigator.languages.slice()
                userLang.unshift(navigator.language)
                for(var i in userLang){
                    for(var j in allStrings){
                        if(allStrings[j].regex.test(userLang[i])){
                            lang = j
                        }
                    }
                }
            }
        }catch(e){}
        if(!lang){
            lang = "en"
        }
    
        var message = '[' + new_song.date + '] ' + ex_strings.new_song[lang] + ' ' + new_song.title[lang] + '<br>'
    
        div = document.createElement("div")
        div.id = "infoBanner"
        
        var warn = document.createElement("div")
        warn.id = "unsupportedWarn"
        warn.innerText = "!"
        div.appendChild(warn)
    
        var span = document.createElement("span")
        span.innerHTML = message
        div.appendChild(span)
    
        var play_button = document.createElement("div")
        play_button.classList.add('taibtn')
        play_button.classList.add('taibtn-info')
        play_button.classList.add('stroke-sub')
        play_button.classList.add('link-btn')
        play_button.innerText = ex_strings.play[lang]
        play_button.setAttribute("alt", ex_strings.play[lang])
        div.appendChild(play_button)
    
        var vote_link = document.createElement("div")
        vote_link.classList.add('taibtn')
        vote_link.classList.add('taibtn-info')
        vote_link.classList.add('stroke-sub')
        vote_link.classList.add('link-btn')
        vote_link.innerText = ex_strings.vote[lang]
        div.appendChild(vote_link)
    
        var hide = document.createElement("div")
        hide.classList.add('taibtn')
        hide.classList.add('taibtn-info')
        hide.classList.add('taibtn-hide')
        hide.classList.add('stroke-sub')
        hide.classList.add('link-btn')
        hide.innerText = ex_strings.close[lang]
        div.appendChild(hide)
    
        document.body.appendChild(div)
    
        var hideClick = function(event){
            if(event.type === "touchstart"){
                event.preventDefault()
            }
            event.stopPropagation()
            div.remove()
            assets.sounds["se_don"].play()
    
            notifs.push(notif_name)
            localStorage.setItem('notifs', JSON.stringify(notifs))
        }
    
        var playSong = function(event){
            document.location = 'https://taiko.bui.pm/#song=' + new_song.id
        }
    
        var openVoteLink = function(event){
            assets.sounds["se_don"].play()
            window.open('https://taiko.bui.pm/vote')
        }
    
        hide.addEventListener("click", hideClick)
        hide.addEventListener("touchstart", hideClick)
        play_button.addEventListener("click", playSong)
        vote_link.addEventListener("click", openVoteLink)
    }
    
    }catch(e){
        console.log(e);
    }