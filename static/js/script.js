// List fixtures by team - 1817 is Ireland
fetch("https://rugby-live-data.p.rapidapi.com/fixtures-by-team/1817", {
	"method": "GET", 
	"headers": {
		"x-rapidapi-key": "a7c9bde733mshfab15cef7338668p164f4djsnbbc60d7ce04b",
		"x-rapidapi-host": "rugby-live-data.p.rapidapi.com"
	}
})
.then((response) => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error("Error encountered")
    }
})
.then((data) => {
    if (data.results) {
        updateFixtureInfo(data.results[0]) // Logs next upcoming fixture
    } else {
        hideFixtureBox();
        showClock();
    }
})
.catch(err => {
    hideFixtureBox();
    showClock();
});


function updateFixtureInfo(data) {
    const homeTeam = document.querySelector(".home-team");
    const awayTeam = document.querySelector(".away-team");
    const dateTime = document.querySelector(".date");
    const location = document.querySelector(".location");
    const date = setDateTime(data.date)
    homeTeam.textContent = data.home;
    awayTeam.textContent = data.away;
    dateTime.textContent = date;
    location.textContent = data.venue;
    if (data.status !== "Not Started") {
        addScore(data)
    }
}

function addScore(matchInfo) {
    const homeScore = document.querySelector(".home-score");
    const awayScore = document.querySelector(".away-score");
    homeScore.style.display = "inline-block"
    awayScore.style.display = "inline-block"
    homeScore.textContent = matchInfo.home_score;
    awayScore.textContent = matchInfo.away_score;
}

function setDateTime(info) {
    let fullDate = "";
    const [date, time] = info.split("T");
    const [year, month, day] = date.split("-");
    const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    fullDate = `${day} ${monthsOfYear[month -1]}, ${year} | ${time}`;
    return fullDate;
}

function hideFixtureBox() {
    const fixture = document.querySelector(".fixture");
    fixture.style.display = "none";
}

function getTime() {
    const d = new Date();
    let hours = d.getHours();
    let mins = d.getMinutes();
    let seconds = d.getSeconds();
    if (hours < 10) {
        hours = `0${hours}`;
    };
    if (mins < 10) {
        mins = `0${mins}`;
    }; 
    if (seconds < 10) {
        seconds = `0${seconds}`;
    };  
    const currentTime = document.querySelector(".current-time");
    currentTime.innerHTML = `${hours}:${mins}:${seconds}`;
}

function showClock() {
    const clockSpan = document.querySelector(".clock");
    clockSpan.style.display = "flex";
    clockSpan.style.justifyContent = "center";
}

// Selectors // 

const searchBtn = document.querySelector(".search-button");


// Functions //

function searchTerm(e) {
    const query = document.querySelector(".search-bar").value;
    if (query) {
        const domain = "https://www.google.com/search?q=";
    const url = `${domain}${query}`;
    window.open(url);
    }
}


// Event Listeners //

searchBtn.addEventListener("click", searchTerm)
document.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        searchTerm(e);
    }
})

window.setInterval(getTime, 1000);