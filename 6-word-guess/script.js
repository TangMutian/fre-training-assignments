"use strict";

const Api = (() => {
  const builtInWords = [
    "ballot",
    "soil",
    "legislation",
    "valley",
    "country",
    "nail",
    "piano",
    "speech",
    "efflux",
    "reason",
    "alcohol",
    "stable",
    "slice",
    "situation",
    "profession",
    "restaurant",
    "pocket",
    "satisfaction",
    "condition",
    "comfortable",
  ];
  return {
    /** @returns {Promise<string>} */
    async getWord() {
      try {
        let response = await fetch(
          "https://random-word-api.herokuapp.com/word"
        );
        let data = await response.json();
        return data[0];
      } catch (err) {
        console.error(err);
        return builtInWords[Math.floor(Math.random() * builtInWords.length)];
      }
    },
  };
})();

const View = (() => {
  const DOM = {
    word: document.querySelector(".game__word"),
    guessed: document.querySelector(".game__guessed"),
    input: document.querySelector(".game__input"),
    button: document.querySelector(".game__button"),
    wrongCount: document.querySelector(".game__wrongcount"),
    timer: document.querySelector(".game__timer"),
  };

  return {
    DOM,
    enableInput() {
      DOM.input.disabled = false;
      DOM.button.disabled = false;
    },
    disableInput() {
      DOM.input.disabled = true;
      DOM.button.disabled = true;
    },
    updateShownWord(word) {
      DOM.word.innerText = word;
    },
    updateWrongCount(count) {
      DOM.wrongCount.innerText = count;
    },
    /** @param {[{char: string, correct: boolean}]} wordList */
    updateGuessed(wordList) {
      DOM.guessed.innerHTML = "";
      wordList.forEach(({ char, correct }) => {
        const span = document.createElement("span");
        span.innerText = char;
        span.classList.add(
          correct ? "game__guessed--correct" : "game__guessed--wrong"
        );
        DOM.guessed.append(span);
      });
    },
    updateTimer(time) {
      DOM.timer.value = time;
    },
  };
})();

const Model = ((api, view) => {
  const { getWord } = api;
  const {
    enableInput,
    disableInput,
    updateShownWord,
    updateWrongCount,
    updateGuessed,
    updateTimer,
  } = view;

  class State {
    constructor() {
      this._word = "";
      this._shownWord = "";
      this._wrongCount = 0;
      this._correctCount = 0;
      this._currentHiddenLetter = new Set();
      /** @type {[{char: string, correct: boolean}]} */
      this._guessHistory = [];
      this._timeLeft = 60;
      this._timerInterval = null;
    }

    async initRound() {
      this._currentHiddenLetter.clear();
      this._word = await getWord();
      // random from 1 to word.length - 1
      const hiddenCount =
        Math.floor(Math.random() * (this._word.length - 1)) + 1;
      // sample without replacement
      const hiddenIndices = new Set();
      while (hiddenIndices.size < hiddenCount) {
        hiddenIndices.add(Math.floor(Math.random() * this._word.length));
      }
      // hide letters
      this._shownWord = this._word
        .split("")
        .map((letter, index) => {
          if (hiddenIndices.has(index)) {
            this._currentHiddenLetter.add(letter);
            return "_";
          }
          return letter;
        })
        .join("");
      // update view
      updateShownWord(this._shownWord);
      updateGuessed([]);
      // enable input
      enableInput();
      // reset guess history
      this._guessHistory = [];
    }

    async initGame() {
      await this.initRound();
      this._wrongCount = 0;
      this._correctCount = 0;
      updateWrongCount(this._wrongCount);
      this._startTimer();
    }

    guess(letter) {
      //  check if letter is already guessed
      if (this._guessHistory.some(({ char }) => char === letter)) {
        // pop a message
        alert(`You already guessed "${letter}"`);
        return;
      }

      const correct = this._currentHiddenLetter.has(letter);

      // update guess history
      this._guessHistory.push({ char: letter, correct });
      updateGuessed(this._guessHistory);

      // check if guess is correct
      if (correct) {
        this._currentHiddenLetter.delete(letter);
        // update shown word
        this._shownWord = this._shownWord
          .split("")
          .map((shownLetter, index) => {
            if (this._word[index] === letter) {
              return letter;
            }
            return shownLetter;
          })
          .join("");
        updateShownWord(this._shownWord);
        // check if round is won
        if (this._currentHiddenLetter.size === 0) {
          disableInput();
          this._correctCount++;
          // wait 1 second before starting new round
          setTimeout(() => this.initRound(), 1000);
        }
      } else {
        // update wrong count
        this._wrongCount++;
        updateWrongCount(this._wrongCount);
        // check if game is lost
        if (this._wrongCount === 10) {
          disableInput();
          this._gameOver();
        }
      }
    }

    _startTimer() {
      if (this._timerInterval) {
        clearInterval(this._timerInterval);
      }
      this._timeLeft = 60;
      updateTimer(this._timeLeft);
      this._timerInterval = setInterval(() => {
        this._timeLeft--;
        updateTimer(this._timeLeft);
        if (this._timeLeft === 0) {
          clearInterval(this._timerInterval);
          this._gameOver();
        }
      }, 1000);
    }

    _gameOver() {
      alert(
        `Game over! The word was "${this._word}"\nyou got ${this._correctCount} correct words!`
      );
      this.initGame();
    }

    terminate() {
      if (this._timerInterval) {
        clearInterval(this._timerInterval);
      }
      disableInput();
    }
  }

  return { State };
})(Api, View);

const Controller = ((model, view) => {
  const { DOM } = view;
  const { State } = model;

  const state = new State();

  const init = () => {
    state.initGame();
  };

  const addListeners = () => {
    // enter key on input
    DOM.input.addEventListener("keyup", event => {
      if (event.key === "Enter") {
        const guess = DOM.input.value;
        if (guess.length === 1) {
          state.guess(guess);
          DOM.input.value = "";
          DOM.input.focus();
        }
      }
    });

    // click on button
    DOM.button.addEventListener("click", () => {
      state.terminate();
      state.initGame();
    });
  };

  return {
    bootstrap() {
      init();
      addListeners();
    },
  };
})(Model, View);

Controller.bootstrap();
