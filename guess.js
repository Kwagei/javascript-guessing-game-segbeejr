
    var numberToGuess;
    var isGameOver = false;
    var lives = 7;

    function generateButtons() {
      var numbers = [];

      // generate an array of numbers from 1 to 100
      for (var i = 1; i <= 100; i++) {
        numbers.push(i);
      }

      // randomly shuffle the numbers
      for (var i = numbers.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = numbers[i];
        numbers[i] = numbers[j];
        numbers[j] = temp;
      }

      // create a button for each number and add it to the button container
      for (var i = 0; i < numbers.length; i++) {
        var button = document.createElement("button");
           button.innerText = numbers[i];
        document.getElementById("button-container").appendChild(button);

        button.addEventListener("click", function() {
          if (!isGameOver) {
            var guess = parseInt(this.innerText);
            checkGuess(guess, this);
          }
        });
      }
    }

    function startGame() {
      document.getElementById("button-container").innerHTML = "";
      numberToGuess = Math.floor(Math.random() * 100) + 1;
      isGameOver = false;
      lives = 7;
      updateLivesDisplay();
      generateButtons();
    }


    if (lives == 0) {
      var buttons = document.getElementsByTagName("button");
      for (var i = 0; i < buttons.length; i++) {
        if (parseInt(buttons[i].innerText) == numberToGuess) {
          buttons[i].classList.add("correct-guess");
        } else {
          buttons[i].classList.add("wrong-guess");
          buttons[i].classList.add("inactive");
        }
      }
      alert("Your correct number is the one shaded green.");
      isGameOver = true;
    }
    


    function checkGuess(guess, buttonElement) {
      if (guess == numberToGuess) {
        alert("Congratulations, you guessed the number!");
        buttonElement.classList.add("correct-guess");
        document.getElementById("correct-sound").play();
        // else if (document.getElementById("wrong-sound").play()); 

        
        var buttons = document.getElementsByTagName("button");
        for (var i = 0; i < buttons.length; i++) {
          if (buttons[i] != buttonElement) {
            buttons[i].classList.add("inactive");
          }
        }

        isGameOver = true;
      } else if (guess > numberToGuess) {
        alert("Too high, try again.");
        lives--;
        updateLivesDisplay();
        buttonElement.classList.add("wrong-guess"); 
      } else {
        alert("Too low, try again.");
        lives--;
        updateLivesDisplay();
        buttonElement.classList.add("wrong-guess"); 
      }  
        document.getElementById("wrong-sound").play();

      if (lives == 0) {
        alert("Game over, you ran out of lives!");
        isGameOver = true;
      }
    }

    function updateLivesDisplay() {
      document.getElementById("lives-display").innerText = lives;
      if (lives == 0) {
        var buttons = document.getElementsByTagName("button");
        for (var i = 0; i < buttons.length; i++) {
          if (parseInt(buttons[i].innerText) == numberToGuess) {
            buttons[i].classList.add("correct-guess");
          } else {
            buttons[i].classList.add("wrong-guess");
            buttons[i].classList.add("inactive");
          }
        }
        alert("The correct number will the one shaded green.");
        isGameOver = true;
      }
    }
    
    

    document.getElementById("restart-button").addEventListener("click", function() {
      startGame();
    });


    startGame();