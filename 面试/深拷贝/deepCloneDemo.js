var obj1 = {
    p1: '张三',
    p2: Symbol(3),
    p3: function(){
        console.log("im p3")
    },
    p4: [1,2,3],
    p5: null,
    p6: undefined
}

var obj2 = Object.create(obj1);
obj2.p7 = '李四';
var p8 = Symbol(4);
obj2[p8] = "localSymbol";
obj2.p9 = ()=>{
    console.log("im p5")
};
obj2.p10 = [4,5,6];
obj2.p11 = null;
obj2.p12 = undefined;
// console.log(obj2);

//demo1
for(let k in obj2){
    // console.log(typeof k, k, 'is...', obj2.k)   
    // deepCloneDemo.js:25 string p7 is... undefined
    // deepCloneDemo.js:25 string p8 is... undefined
    // deepCloneDemo.js:25 string p9 is... undefined
    // deepCloneDemo.js:25 string p10 is... undefined
    // deepCloneDemo.js:25 string p11 is... undefined
    // deepCloneDemo.js:25 string p12 is... undefined
    // deepCloneDemo.js:25 string p1 is... undefined
    // deepCloneDemo.js:25 string p2 is... undefined
    // deepCloneDemo.js:25 string p3 is... undefined
    // deepCloneDemo.js:25 string p4 is... undefined
    // deepCloneDemo.js:25 string p5 is... undefined
    // deepCloneDemo.js:25 string p6 is... undefined

    console.log(k, 'is...', obj2[k]);
    // p7 is... 李四
    // deepCloneDemo.js:39 p8 is... Symbol(4)
    // deepCloneDemo.js:39 p9 is... ()=>{
    //     console.log("im p5")
    // }
    // deepCloneDemo.js:39 p10 is... (3) [4, 5, 6]
    // deepCloneDemo.js:39 p11 is... null
    // deepCloneDemo.js:39 p12 is... undefined
    // deepCloneDemo.js:39 p1 is... 张三
    // deepCloneDemo.js:39 p2 is... Symbol(3)
    // deepCloneDemo.js:39 p3 is... ƒ (){
    //         console.log("im p3")
    //     }
    // deepCloneDemo.js:39 p4 is... (3) [1, 2, 3]
    // deepCloneDemo.js:39 p5 is... null
    // deepCloneDemo.js:39 p6 is... undefined
}

//demo2
console.log(Object.keys(obj2));
// ['p7', 'p8', 'p9', 'p10', 'p11', 'p12']

// demo3
console.log(Reflect.ownKeys(obj2));
// ['p7', 'p8', 'p9', 'p10', 'p11', 'p12', Symbol(4)]]

// demo4
console.log(Object.getOwnPropertyNames(obj2));
// ['p7', 'p8', 'p9', 'p10', 'p11', 'p12']

// demo5
console.log(Object.getOwnPropertySymbols(obj2));
// Symbol(4)]