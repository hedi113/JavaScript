function fetching(userName){
    fetch(`https://www.codewars.com/api/v1/users/${userName}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(user => {
    console.log(user);
    let content = `<div class="card">
    <p><strong>Username:</strong> ${user.username}</p>
      <p><strong>Name:</strong> ${user.name ?? "no name given"}</p>
      <p><strong>Honor:</strong> ${user.honor ?? "no honor collected yet"}</p>
      <p><strong>Clan:</strong> ${user.clan ?? "hasn't joined a clan yet"}</p>
      <p><strong>Place on leaderboard:</strong> ${user.leaderboardPosition ?? "no placement on the leaderboard yet"}</p>
      <p><strong>Skill(s):</strong> ${user.skills ?? "Not given"}</p>
      <p><strong>Overall ranking:</strong>
        <ul> 
          <li>Rank: ${user.ranks.overall.rank ?? "Not given"}</li>
          <li>Name: ${user.ranks.overall.name ?? "Not given"}</li>
          <li>Color: ${user.ranks.overall.color ?? "Not given"}</li>
          <li>Score: ${user.ranks.overall.score ?? "Not given"}</li>
        </ul>
      </p>
      <p><strong>Languages:</strong> </p>`;

    const outerObject = user.ranks.languages;
    Object.entries(outerObject).forEach(([key, value]) => {      
      content += `
        <p>&emsp;<strong>${key}:</strong></p>
        <ul>
          <li>Rank: ${value.rank}</li>
          <li>Name: ${value.name}</li>
          <li>Color: ${value.color}</li>
          <li>Score: ${value.score}</li>
        </ul>`;
    });

    content += 
    `<p><strong>Code challenges:</strong></p>
    <ul>
    <li>Authored in total: ${user.codeChallenges.totalAuthored}</li>
    <li>Completed in total: ${user.codeChallenges.totalCompleted}</li>
    </ul>
    </div>`;
    
    document.getElementById("container").innerHTML += content;
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
}

function kereses(){
    userName = document.getElementById("userName").value;
    fetching(userName);
}

const userLogins = [];
function noSameUsers() {
  let login = (document.getElementById("userName").value);  
  if(userLogins.includes(login) == false) {  
    kereses();
    userLogins.push(login);
    console.log(userLogins);
  }
  else {
    alert("Ennek a felhasználónak az adatai már a képernyőn láthatóak.")
  }
}
