// function that can be called only 5 times

// closure
function funcCreator() {
  let count = 0;
  return function () {
    if (count < 5) {
      count++;
      console.log("Congrats you earn the chance!");
    } else {
      console.log("Sorry you missed the chance");
    }
  };
}

const func = funcCreator();

for (let i = 0; i < 10; i++) {
  func();
}
