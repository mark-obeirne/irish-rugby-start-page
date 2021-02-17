
// List fixtures by team
fetch("https://rugby-live-data.p.rapidapi.com/fixtures-by-team/1817", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "8ce6c9e68emshb1f2c358ed2a7d4p1f5d78jsn5bbc0909ad0d",
		"x-rapidapi-host": "rugby-live-data.p.rapidapi.com"
	}
})
.then(response => response.json())
.then(data => updateFixtureInfo(data.results[0])) // Logs next upcoming fixture
.catch(err => {
	console.error(err);
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
}

function setDateTime(info) {
    let fullDate = "";
    const [date, time] = info.split("T");
    const [year, month, day] = date.split("-");
    const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    fullDate = `${day} ${monthsOfYear[month -1]}, ${year} | ${time}`;
    return fullDate;
}