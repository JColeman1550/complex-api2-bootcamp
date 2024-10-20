const standingsContainer = document.querySelector('#standings .teams-list');
const teamStatsContainer = document.querySelector('#team-stats .stats-list');
const season = 2024;
const apiKeyStandings = '51b02b3b484e47e290e7c6bf10087e5e';
const apiKeyStats = '51b02b3b484e47e290e7c6bf10087e5e';

// fetch standings
fetch(`https://api.sportsdata.io/v3/mlb/scores/json/Standings/${season}?key=${apiKeyStandings}`)
    .then(response => response.json())
    .then(standingsData => {
        console.log(standingsData); 
        
        // fetch team stats
        fetch(`https://api.sportsdata.io/v3/mlb/scores/json/TeamSeasonStats/${season}?key=${apiKeyStats}`)
            .then(response => response.json())
            .then(statsData => {
                console.log(statsData); 
                let combinedHTML = '';

                standingsData.forEach(standingTeam => {
                    // find matching team stats by TeamID
                    const teamStats = statsData.find(statsTeam => statsTeam.TeamID === standingTeam.TeamID);

                    // combine standings/stats in display
                    combinedHTML += `
                        <div class="team">
                            <h4>${standingTeam.Name}</h4>
                            <p><strong>Wins:</strong> ${standingTeam.Wins} <strong>Losses:</strong> ${standingTeam.Losses}</p>
                            <p><strong>Runs Scored:</strong> ${teamStats?.Runs || 'N/A'} <strong>Runs Against:</strong> ${teamStats?.PitchingRuns || 'N/A'} 
                            <strong>Balls in Play:</strong> ${teamStats?.BallsInPlay || 'N/A'}</p>
                        </div>
                    `;
                });

                // display combined data
                standingsContainer.innerHTML = combinedHTML;
            })
            .catch(error => console.error('Error fetching team stats:', error));
    })
    .catch(error => console.error('Error fetching standings:', error));
