'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Florinela Alexandru',
  movements: [223, 0, 0, 0, 0, 0, 0, 0],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ``;


  // folosim slice ca sa facem o copie
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;


  movs.forEach(function (mov, i) {

    const type = mov > 0 ? `deposit` : `withdrawal`;

    const html = `
      <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__value">${mov}</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML(`afterbegin`, html);
  });
};
displayMovements(account1.movements);
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`;
};

const calcDisplaySummary = (acc) => {
  const incomes = acc.movements.filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcome = acc.movements.filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcome)}€`;

  const interest = acc.movements.filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interest}€`;

};


const updateUI = function (acc) {
  //display movements
  displayMovements(acc.movements);

  //display balance
  calcDisplayBalance(acc);

  //displaysummary
  calcDisplaySummary(acc);
};
//stw
// steven Thomas WIlliams,     steven, thomas, wIlliams, s t w, stw
const createUsernames = function (acc) {
  acc.forEach(function (acc) {
    acc.username = acc.owner.toLowerCase().split(` `).map(name => name[0]).join('');
  });
};
createUsernames(accounts);

// Event handler
let currentAccount;

btnLogin.addEventListener(`click`, function (event) {
  //prevents refresing
  event.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {

    //DIsplay UI 
    // labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    labelWelcome.textContent = `Welcome back, Cristian`;
    containerApp.style.opacity = 100;


    //  clear input fields
    inputLoginUsername.value = ``;
    inputLoginPin.value = ``;

    inputLoginPin.blur();

    //update ui
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener(`click`, function (event) {
  event.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);

  inputTransferAmount.value = inputTransferTo.value = '';

  if (amount > 0
    && receiverAcc
    && currentAccount.balance >= amount
    && currentAccount.username !== receiverAcc?.username) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUI(currentAccount);
  }
});

btnLoan.addEventListener(`click`, function (event) {
  event.preventDefault();

  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //add movement;
    currentAccount.movements.push(amount);

    //update ui

    updateUI(currentAccount);
  }

  inputLoanAmount.value = ``;
});

btnClose.addEventListener(`click`, function (event) {
  event.preventDefault();


  if (currentAccount.username === inputCloseUsername.value
    && currentAccount.pin === Number(inputClosePin.value)) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);

    //delete acc
    accounts.splice(index, 1);

    //hide ui;
    containerApp.style.opacity = 0;
  }
  inputClosePin.value = inputCloseUsername.value = ``;

});

let sorted = false;
btnSort.addEventListener(`click`, function (event) {
  event.preventDefault();

  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
})
//console.log(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES



const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////


// let arr = ['a', `b`, `c`, `d`, `e`];

// // slice doesn't modify the array
// // console.log(arr.slice(arr));

// // console.log(arr.slice(2));
// // console.log(arr.slice(2, 4));
// // console.log(arr.slice(-2));
// // console.log(arr.slice(-1));
// // console.log(arr.slice(1, -2));
// // console.log(...arr);

// // // splice mutates the array
// // console.log(arr.splice(2));
// // console.log(arr);
// // arr.splice(-1);
// // console.log(arr);


// // reverse reverses the array   it mutates the array
// const arr2 = [`j`, `i`, `h`, `g`, `f`];
// console.log(arr2.reverse());
// console.log(arr);
// console.log(arr2)


// // concat, adds second arr to first
// // doesn't mutate
// const letters = arr.concat(arr2);

// console.log(letters);
// console.log([...arr, ...arr2]);


// // join
// console.log(letters.join(`-`));

// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movemet ${i + 1} You deposited ${movement}`);
//   }
//   else
//     console.log(`Movemet ${i + 1} You withdrew  ${Math.abs(movement)}`);
// }

// console.log(`-------FOREACH---------`);
// movements.forEach(function (movement, index, array) {
//   if (movement > 0) {
//     console.log(`Movement ${index}: You deposited ${movement}`);
//   }
//   else
//     console.log(`Movement ${index}:You withdrew  ${Math.abs(movement)}`);
// });


// foreach with maps and sets

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

// const currencyUnique = new Set([`USD`, `GBD`, `USD`, `EUR`, `EUR`]);
// console.log(currencyUnique);
// currencyUnique.forEach(function (value, _, map) {
//   console.log(`${_}: ${value}`);
// });


// const julia = [3, 5, 2, 12, 7];

// // const kate = [4, 1, 15, 8, 3];

// const julia =[9,16,6,8,3];

// const kate = [10, 5 ,6 ,1 ,4];

// const shallowCopyJulia = julia.slice(1, -2);

// const allDogs = shallowCopyJulia.concat(kate);

// allDogs.forEach(function (value, number) {
//   console.log(`Dog number ${number} is a ${value > 3 ? `adult` : `puppy`} and is ${value} years old`);
// });


// const eurToUsd = 1.1;

// const movementsUSD = movements.map(mov => mov * eurToUsd);

// console.log(movements);
// console.log(movementsUSD);

// const movementsUSDfor = [];

// for (const mov of movements) {
//   movementsUSDfor.push(mov * eurToUsd);
// }
// console.log(movementsUSDfor);

// const movemenetsDescriptions = movements.map((mov, i) => {

//   return `Movement ${i + 1}: You ${mov > 0 ? `deposited` : `withdrew`} ${Math.abs(mov)}`

// });

// console.log(movemenetsDescriptions);

// const deposits = movements.filter(mov => {
//   return mov > 0;
// });

// console.log(movements);
// console.log(deposits);
// const depositsFor = [];
// for (const mov of movements) {
//   if (mov > 0) {
//     depositsFor.push(mov);
//   }
// }

// console.log(depositsFor);


// const withdrawls = movements.filter(mov => mov < 0);

// console.log(withdrawls);


// console.log(movements);
// //                                acc = acumulator , cur = current, i = index, arr = array
// const balance = movements.reduce((acc, cur) => acc += cur, 0);

// console.log(balance);


// // maximum value

// const reduce = movements.reduce((acc, cur) => acc < cur ? cur : acc, 0);
// // console.log(reduce);

// const calcHumnaAverage = function (ages) {
//   const humanAges = ages.map(age => age <= 2 ? 2 * age : 16 + age * 4)
//   console.log(humanAges);
//   const adults = humanAges.filter(age => age >= 18)
//   console.log(adults);
//   const average = adults.reduce((acc, cur) => acc + cur, 0) / adults.length;
//   return average;
// // }

// // console.log(calcHumnaAverage([5, 2, 4, 1, 15, 8, 3]));
// const eurToUsd = 1.1;
// const totalDepositsUSD = movements.filter(mov => mov > 0).map(mov => mov * eurToUsd).reduce((acc, cur) => acc + cur, 0);

// console.log(totalDepositsUSD);


// const calcHumanAverage = (ages) => ages.map(age => age <= 2 ? 2 * age : 16 + age * 4)
//   .filter(age => age >= 18)
//   .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

// console.log(calcHumanAverage([5, 2, 4, 1, 15, 8, 3]));


// const firstWithdrawal = movements.find(mov => mov < 0);

// // console.log(movements);
// // console.log(firstWithdrawal);


// console.log(accounts);

// const account = accounts.find(acc => acc.owner === `Jessica Davis`);
// console.log(account);


// console.log(movements);

// //equality
// console.log(movements.includes(-130));

// //some: condition
// console.log(movements.some(mov => mov === -130));


// const anyDeposits = movements.some(mov => mov >= 3000);
// console.log(anyDeposits);



// // every , true only if all pass condition

// // console.log(movements.every(mov => mov > 0));
// // console.log(account4.movements.every(mov => mov > 0));

// //separate callback
// const deposit = mov => mov > 0;
// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));

// flat () reduce doar 1 layer default
// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr.flat());

// const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(arrDeep.flat());


// console.log(arrDeep.flat(2));

// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);

// const allMovements = accountMovements.flat();
// console.log(allMovements);

// // const overalBalance = allMovements.reduce((acc, cur) => acc + cur, 0);
// // console.log(overalBalance);

// // const overalBalance = accounts.map(acc => acc.movements).flat().reduce((acc, mov) => acc + mov, 0);

// // console.log(overalBalance);


// // flat map, better performance , dar poate scoate doar 1 layer

// const overalBalance = accounts.flatMap(acc => acc.movements).reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance);


// // sorting
// const owners = [`Jonas`, `Zack`, `Martha`];

// // it mutates
// console.log(owners.sort());
// console.log(owners);


// //numbers, le face strings si le compara ca strings
// console.log(movements);
// console.log(movements.sort());


// //return <0 A,B (keep order)
// //  return >0 B,A (switch order)
// movements.sort((a, b) => a - b);

// console.log(movements);



// const x = new Array(7);
// x.fill(1, 3);
// console.log(x);

// const arr = [1, 2, 3, 4, 5, 6, 7];

// arr.fill(23, 2, 6);
// console.log(arr);


// // array.from se face pe constructo
// const y = Array.from({ length: 7 }, () => 1);
// console.log(y);

// const z = Array.from({ length: 7 }, (_, i) => i + 1);
// console.log(z);



// labelBalance.addEventListener(`click`, function (event) {
//   event.preventDefault();
//   const movementsUI = Array.from(document.querySelectorAll(`.movements__value`),
//     el => Number(el.textContent.replace(`€`, ``)));

//   console.log(movementsUI);


//   movementsUI2 = [...document.querySelectorAll(`.movements__value`)];
// });


const dogs = [
  { weight: 22, curFood: 250, owners: [`Alice`, `Bob`] },
  { weight: 8, curFood: 200, owners: [`Matilda`] },
  { weight: 13, curFood: 275, owners: [`Sarah`, `John`] },
  { weight: 32, curFood: 340, owners: [`Michael`] },
];

dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);


const dogSarah = dogs.find(dog => dog.owners.includes(`Sarah`));
console.log(dogSarah);

console.log(`Sarah's dog is eating ${dogSarah.curFood > dogSarah.recFood ? `too much` : `too little`} food`);

const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);


console.log(`${ownersEatTooMuch.join(', ')}'s dogs eat too much `);




const checkEatingOkay = dog => dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;

console.log(dogs.some(checkEatingOkay));

console.log(dogs.filter(checkEatingOkay));


const dogsCopy = dogs.slice().sort((a, b) => a.recFood - b.recFood
);

console.log(dogsCopy);