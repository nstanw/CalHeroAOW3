const heroData = {
  wasp: {
    levels: [250, 500, 1000, 1750, 3000, 5000, 8000, 12000, 17000, 23500, 33000, 48500],
    maxLevel: 12
  },
  mole: {
    levels: [70, 160, 300, 520, 860, 1400, 2300, 3400, 4700, 6400, 8900, 12800],
    maxLevel: 12
  },
  leviathan: {
    levels: [25, 60, 110, 180, 300, 500, 800, 1200, 1650, 2200, 3100, 4900],
    maxLevel: 12
  }
};

function calculateLevel() {
  const heroName = document.getElementById('heroName').value;
  const fragments = parseInt(document.getElementById('fragments').value);
  const currentLevel = parseInt(document.getElementById('currentLevel').value);

  const hero = heroData[heroName];
  let level = currentLevel;
  let remainingFragments = fragments;
  let levelDetails = "";
  let nextLevelFragmentsNeeded = 0;
  let startLevel = currentLevel + 1;

  for (let i = startLevel; i <= hero.maxLevel; i++) {
    const requiredFragments = hero.levels[i - 1];
    const fragmentsNeeded = requiredFragments - remainingFragments;
    const levelMessage = `Level ${i}: Required Fragments: ${requiredFragments}, `;
    let remainingMessage = "";
    if (remainingFragments >= requiredFragments) {
      remainingMessage = `Remaining Fragments: ${remainingFragments - requiredFragments}`;
      remainingFragments -= requiredFragments;
      level++;
    } else {
      remainingMessage = `Fragments Needed: ${fragmentsNeeded > 0 ? fragmentsNeeded : 0}`;
      nextLevelFragmentsNeeded = fragmentsNeeded > 0 ? fragmentsNeeded : 0;
      break;
    }
    levelDetails += `<p>${levelMessage} ${remainingMessage}</p>`;
  }

  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `Current Level: ${currentLevel}<br>Max Level Reachable: ${level}<br>Remaining Fragments: ${remainingFragments}<br>Fragments Needed for Next Level: ${nextLevelFragmentsNeeded}`;
  const levelDetailsDiv = document.getElementById('levelDetails');
  levelDetailsDiv.innerHTML = levelDetails;

  updateLevelNav(heroName);
  updateHeroList();
}

function setLevel(level) {
  document.getElementById('currentLevel').value = level;
}

function updateLevelNav(heroName) {
  const hero = heroData[heroName];
  const nav = document.getElementById('levelNav');
  let navHTML = "<ul>";
  for (let i = 1; i <= hero.maxLevel; i++) {
    navHTML += `<li>Level ${i}: ${hero.levels[i - 1]} fragments</li>`;
  }
  navHTML += "</ul>";
  nav.innerHTML = navHTML;
}

function updateHeroList() {
  const heroListDiv = document.getElementById('heroList');
  let heroListHTML = "<ul>";
  for (const hero in heroData) {
    heroListHTML += `<li>${hero}: Max Level ${heroData[hero].maxLevel}</li>`;
  }
  heroListHTML += "</ul>";
  heroListDiv.innerHTML = heroListHTML;
}

function showDetails() {
  const detailsDiv = document.getElementById('details');
  let detailsHTML = "<h2>Hero Details</h2>";
  for (const hero in heroData) {
    detailsHTML += `<h3>${hero}</h3><ul>`;
    heroData[hero].levels.forEach((fragments, index) => {
      detailsHTML += `<li>Level ${index + 1}: ${fragments} fragments</li>`;
    });
    detailsHTML += "</ul>";
  }
  detailsDiv.innerHTML = detailsHTML;
}
