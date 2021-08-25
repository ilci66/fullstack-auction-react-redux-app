// you can use these numbers as ID numbers
// in this example it's used to mimic a database 

// const storeItems = new Map([
//   [1, { priceInCents: 10000, name: "Learn React Today" }],
//   [2, { priceInCents: 20000, name: "Learn CSS Today" }],
// ])

// console.log(storeItems.get(1).priceInCents)
// // console.log("asdasd")
// console.log("sadasd",process.env.MONGO_URI)
// console.log("test",process.env.TEST)

const promise1 = new Promise((resolve, reject) => {
    resolve("cat")
})
promise1
.then(value => { return value + ' and bar'; })
.then(value => { return value + ' and bar again'; })
.then(value => { return value + ' and again'; })
.then(value => { return value + ' and again'; })
.then(value => { console.log("dis be da value >>",value) })
.catch(err => { console.log(err) });
console.log(promise1)