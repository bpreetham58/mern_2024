const arr=[7, 9, 4, 2, 5, 8];

const arr1=arr.map((num) => num*num*num);
console.log(arr1);

const arr2=arr1.filter((f) => f%2==0);
console.log(arr2);

const cart=[
    {name: "laptop", price:5000},
    {name: "pendrive", price:200},
    {name: "charger", price:700},
]

const value=cart.reduce((a,item)=>a+item.price,0);

console.log(value);

