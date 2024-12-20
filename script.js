// Initialize score and high score
let currentFlagIndex = 0;
let currentScore = 0;
let highScore = parseInt(localStorage.getItem('highScore')) || 0;

// Set limits for random and hint clicks
let randomClicksRemaining = 10;
let hintClicksRemaining = 15;

// Get references to HTML elements
const flagContainer = document.querySelector('.flag-container');
const flagNameElement = document.getElementById('flag-name');
const guessInput = document.getElementById('guess-input');
const randomFlagBtn = document.getElementById('random-flag-btn');
const submitGuessBtn = document.getElementById('submit-guess');
const resultMessage = document.getElementById('result-message');
const currentScoreSpan = document.getElementById('current-score');
const highScoreSpan = document.getElementById('high-score');
const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownContent = document.querySelector('.dropdown-content');
const hintBtn = document.getElementById('hint');


// Navigation menu variables
const menuBtn = document.querySelector(".menu-btn");
const insideMenu = document.querySelector(".inside-menu");
const closeBtn = document.querySelector(".close-btn");

// Button variables (updated)
let resetGameBtn = document.querySelector("#reset-game");
let resetHighScoresBtn = document.querySelector("#reset-high-scores");
let changeBackgroundBtn = document.querySelector("#change-background");

// Update button variables for inside menu
let insideMenuResetGameBtn = document.querySelector(".inside-menu #reset-game");
let insideMenuResetHighScoresBtn = document.querySelector(".inside-menu #reset-high-scores");
let insideMenuChangeBackgroundBtn = document.querySelector(".inside-menu #change-background");

//Background color array global variable 
let colorIndex = 0;
const colors = ["white", "#aa7a7a28", "#54609728", "#28282928", "#33a1fb28", "#f1fb3328" ];


const countries = [
    { name: ["Uganda", "UG"], flag: "./asserts/Africa/Uganda.svg" },
    { name: "Kenya", flag: "./asserts/Africa/Kenya.svg" },
    { name: "Tanzania", flag: "./asserts/Africa/Tanzania.svg"},
    { name: "Algeria", flag: "./asserts/Africa/Algeria.svg"},
    { name: "Angola", flag: "./asserts/Africa/Angola.svg"},
    { name: "Benin", flag: "./asserts/Africa/Benin.svg"},
    { name: "Botswana", flag: "./asserts/Africa/Botswana.svg"},
    { name: "Burkina Faso", flag: "./asserts/Africa/Burkina Faso.svg"},
    { name: "Burundi", flag: "./asserts/Africa/Burundi.svg"},
    { name: "Cameroon", flag: "./asserts/Africa/Cameroon.svg"},
    { name: "Central African Republic", flag: "./asserts/Africa/Central African Republic.svg"},
    { name: "Chad", flag: "./asserts/Africa/Chad.svg"},
    { name: "Comoros", flag: "./asserts/Africa/Comoros.svg"},
    { name: ["Côte d'Ivoire", "Ivory Coast"], flag: "./asserts/Africa/Côte d'Ivoire.svg"},
    { name: ["Democratic Republic of Congo", "DRC"], flag: "./asserts/Africa/Democratic Republic of Congo.svg"},
    { name: "Djibouti", flag: "./asserts/Africa/Djibouti.svg"},
    { name: "East African Community", flag: "./asserts/Africa/East African Community.svg"},
    { name: "Egypt", flag: "./asserts/Africa/Egypt.svg"},
    { name: "Equatorial Guinea", flag: "./asserts/Africa/Equatorial Guinea.svg"},
    { name: "Eritrea", flag: "./asserts/Africa/Eritrea.svg"},
    { name: "Eswatini", flag: "./asserts/Africa/Eswatini.svg"},
    { name: "Ethiopia", flag: "./asserts/Africa/Ethiopia.svg"},
    { name: "Gabon", flag: "./asserts/Africa/Gabon.svg"},
    { name: "Gambia", flag: "./asserts/Africa/Gambia.svg"},
    { name: "Ghana", flag: "./asserts/Africa/Ghana.svg"},
    { name: "Guinea", flag: "./asserts/Africa/Guinea.svg"},
    { name: "Guinea-Bissau", flag: "./asserts/Africa/Guinea-Bissau.svg"},
    { name: "Lesotho", flag: "./asserts/Africa/Lesotho.svg"},
    { name: "Liberia", flag: "./asserts/Africa/Liberia.svg"},
    { name: "Libya", flag: "./asserts/Africa/Libya.svg"},
    { name: "Madagascar", flag: "./asserts/Africa/Madagascar.svg"},
    { name: "Malawi", flag: "./asserts/Africa/Malawi.svg"},
    { name: "Mali", flag: "./asserts/Africa/Mali.svg"},
    { name: "Mauritania", flag: "./asserts/Africa/Mauritania.svg"},
    { name: "Mauritius", flag: "./asserts/Africa/Mauritius.svg"},
    { name: "Morocco", flag: "./asserts/Africa/Morocco.svg"},
    { name: "Mozambique", flag: "./asserts/Africa/Mozambique.svg"},
    { name: "Namibia", flag: "./asserts/Africa/Namibia.svg"},
    { name: "Niger", flag: "./asserts/Africa/Niger.svg"},
    { name: "Nigeria", flag: "./asserts/Africa/Nigeria.svg"},
    { name: "Republic of the Congo", flag: "./asserts/Africa/Republic of the Congo.svg"},
    { name: "Rwanda", flag: "./asserts/Africa/Rwanda.svg"},
    { name: "Senegal", flag: "./asserts/Africa/Senegal.svg"},
    { name: "Sierra Leone", flag: "./asserts/Africa/Sierra Leone.svg"},
    { name: "Somalia", flag: "./asserts/Africa/Somalia.svg"},
    { name: "South Africa", flag: "./asserts/Africa/South Africa.svg"},
    { name: "South Sudan", flag: "./asserts/Africa/South Sudan.svg"},
    { name: "Sudan", flag: "./asserts/Africa/Sudan.svg"},
    { name: "Togo", flag: "./asserts/Africa/Togo.svg"},
    { name: "Tunisia", flag: "./asserts/Africa/Tunisia.svg"},
    { name: "Western Sahara", flag: "./asserts/Africa/Western Sahara.svg"},
    { name: "Zambia", flag: "./asserts/Africa/Zambia.svg"},
    { name: "Zimbabwe", flag: "./asserts/Africa/Zimbabwe.svg"},
];



// Function to update the current score and high score
function updateScores() {
  currentScoreSpan.textContent = `Current Score: ${currentScore}`;
  highScoreSpan.textContent = `High Score: ${highScore}`;
}

// Function to handle random flag selection
function selectRandomFlag() {
  randomClicksRemaining--;
  updateScores();
}

// Error handling function
function handleError(error) {
  console.error(error); // Log the error for debugging
  resultMessage.innerText = 'An unexpected error occurred. Please try again.'; // Display a user-friendly error message
}

// Function to handle guess submission
function submitGuess() {
  try {
    const userGuess = guessInput.value.trim().toLowerCase();

    // Check if currentFlagIndex is within bounds
    if (currentFlagIndex >= 0 && currentFlagIndex < countries.length) {
      const countryEntry = countries[currentFlagIndex];
      const currentFlagNames = Array.isArray(countryEntry.name) ? 
                                countryEntry.name.map(name => name.toLowerCase()) : 
                                [countryEntry.name.toLowerCase()];

      // Create a regex pattern from the country names
      const regexPattern = new RegExp(currentFlagNames.join('|'), 'i'); // 'i' flag for case-insensitive matching

      if (regexPattern.test(userGuess)) {
        currentScore++;
        updateScores();
        resultMessage.innerText = 'Correct!';
      } else {
        resultMessage.innerText = `Incorrect. The correct answer is ${currentFlagNames.join(' or ')}.`;
      }
    } else {
      throw new Error('Invalid country index.');
    }

    // Update high score if current score exceeds high score
    if (currentScore > highScore) {
      highScore = currentScore;
      localStorage.setItem('highScore', highScore);
    }

    guessInput.value = '';
    currentFlagIndex = getRandomIndex();
    displayFlag();
  } catch (error) {
    handleError(error); // Call the error handling function
  }
}

// Function to handle hint requests
function provideHint() {
  if (hintClicksRemaining > 0) {
    hintClicksRemaining--;
    const countryName = countries[currentFlagIndex].name;
    const hint = countryName.substring(0, 2); // Provide the first two letters as a hint
    resultMessage.innerText = `Hint: ${hint}`;
    document.getElementById('hint-clicks-remaining').innerText = hintClicksRemaining;
    if (hintClicksRemaining <= 0) {
      hintBtn.disabled = true;
    }
  } else {
    resultMessage.textContent = "No hints remaining!";
  }
}

// Function to reset the game
function resetGame() {
  currentScore = 0;
  updateScores();
  resultMessage.innerText = '';
  currentFlagIndex = getRandomIndex();
  displayFlag();

  randomClicksRemaining = 10;
  document.getElementById('random-clicks-remaining').innerText = randomClicksRemaining;
  randomFlagBtn.disabled = false;

  hintClicksRemaining = 15;
  document.getElementById('hint-clicks-remaining').innerText = hintClicksRemaining;
  hintBtn.disabled = false;
}

// Function to reset high scores
function resetHighScores() {
  localStorage.removeItem('highScores');
  localStorage.removeItem('highScore');
  highScores = [];
  highScore = 0;
  displayHighScores();
  updateScores();
}
 
// Function to change background (for example purposes)
function changeBackground() {
  document.body.style.backgroundColor = colors[colorIndex];
  colorIndex = (colorIndex + 1) % colors.length;
}



// Function to display high scores
function displayHighScores() {
    const highScoresList = document.getElementById("high-score");
    if (!highScoresList) {
      console.error('Element with ID "high-scores" not found.');
      return;
    }
    highScoresList.innerHTML = ''; // Clear the list before appending new elements
    const highScoreElement = document.createElement("li");
    highScoreElement.textContent = `High Score: ${highScore}`;
    highScoresList.appendChild(highScoreElement);
    highScores.forEach((score) => {
      const scoreElement = document.createElement("li");
      scoreElement.textContent = `${score.name}: ${score.score}`;
      highScoresList.appendChild(scoreElement);
    });
  }

// Function to display flag
function displayFlag() {
  const flag = countries[currentFlagIndex];
  flagContainer.innerHTML = `<img src="${flag.flag}" alt="${flag.name} flag">`;
  flagNameElement.innerText = '';
}

// Function to get random index
function getRandomIndex() {
  let newIndex = Math.floor(Math.random() * countries.length);
  while (newIndex === currentFlagIndex) {
    newIndex = Math.floor(Math.random() * countries.length);
  }
  return newIndex;
}

// Initialize high scores array and retrieve saved high scores
let highScores = [];
const savedHighScores = JSON.parse(localStorage.getItem("highScores"));
if (savedHighScores) {
  highScores = savedHighScores;
}

// Function to update high scores
function updateHighScores(newScore) {
  highScores.push({ name: 'Player', score: newScore });
  highScores.sort((a, b) => b.score - a.score);
  highScores = highScores.slice(0, 10); // Keep only top 10 scores
  localStorage.setItem("highScores", JSON.stringify(highScores));
  localStorage.setItem('highScore', newScore);
}

// Add event listeners for buttons
randomFlagBtn.addEventListener('click', () => {
  if (randomClicksRemaining > 0) {
    currentFlagIndex = getRandomIndex();
    displayFlag();
    randomClicksRemaining--;
    document.getElementById('random-clicks-remaining').innerText = randomClicksRemaining;
  } else {
    resultMessage.innerText = 'Random clicks limit reached!';
    randomFlagBtn.disabled = true; // Disable the button
  }
});


// Function to close and open menu when user clicks on the menu button 
function toggleMenu() {
    if (insideMenu.style.visibility === "visible") {
      insideMenu.style.visibility = "hidden";
     
  } else {
      insideMenu.style.visibility = "visible";
  }
  }

  function closeMenu() {
    insideMenu.style.visibility = "hidden";
} 


  const insideMenuButton = document.querySelector(".inside-menu button");
// Closing the menu when the user clicks outside of it
// window.addEventListener("click", (event) => {
//   if (!menuBtn.contains(event.target) && 
//       !insideMenu.contains(event.target) && 
//       !event.target.closest('.inside-menu button')) {
//       insideMenu.style.visibility = "hidden";
//   }
// });



// ADDEVENTLISTENERS

menuBtn.addEventListener("click",  toggleMenu);


closeBtn.addEventListener("click", closeMenu);
submitGuessBtn.addEventListener('click', submitGuess);
hintBtn.addEventListener('click', provideHint);
resetGameBtn.addEventListener('click', resetGame);
resetHighScoresBtn.addEventListener('click', resetHighScores);
changeBackgroundBtn.addEventListener('click', changeBackground);

insideMenuResetGameBtn.addEventListener("click", () => {
  resetGameBtn.click();
});

insideMenuResetHighScoresBtn.addEventListener("click", () => {
  resetHighScoresBtn.click();
});

insideMenuChangeBackgroundBtn.addEventListener("click", () => {
  changeBackgroundBtn.click();
});

guessInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    submitGuessBtn.click();
  }
});

menuBtn.addEventListener("click", () => {
  insideMenu.classList.toggle("open");
});

closeBtn.addEventListener("click", () => {
  insideMenu.classList.remove("open");
});

// Initial display of flag and high scores
displayFlag();
displayHighScores();
updateScores();

  
