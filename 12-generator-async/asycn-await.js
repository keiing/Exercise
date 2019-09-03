function f(){
    console.log(5);
}
console.log(2);
async function fn(){
    console.log(3);
     /**await 会把await下面的代码变成微任务;是异步的,但是await本身不是微任务，是主线程*/
    await f();
    await f();
    await f();
    console.log(1);
}
fn();
console.log(4);

//答案 2 3 5 4 5 5 1;


function f(){
    return new Promise(function(resovle,reject){
        console.log(5);
        resovle();
    });
}
console.log(2);
async function fn(){
    console.log(3);
     /**await 会把await下面的代码变成微任务;是异步的,但是await本身不是微任务*/
    await f();
    console.log('555')
    await f();
    console.log(44);
    await f();
    console.log(1);
}
fn();
console.log(4);

//答案 2 3 5 4 '555' 5 44 5 1;

function f(){
    return new Promise(function(resovle,reject){
      setTimeout(function(){
          resovle();
      },1000);
      console.log(1111)
    });
}
console.log(2);
async function fn(){
    console.log(3);
     /**await 会把await下面的代码变成微任务;是异步的,但是await本身不是微任务*/
    await f();
    // 如果f函数中有异步，那么await下面的代码会等到函数中异步执行完毕，才会执行这个微任务
    console.log(1);
}
fn();
console.log(4);

//2 3 1111 4 1


function f(t){
    return new Promise(function(resovle,reject){
      setTimeout(function(){
          resovle();
      },t);
      console.log(1111)
    });
}
console.log(2);
async function fn(){
    console.log(3);
     /**await 会把await下面的代码变成微任务;是异步的,但是await本身不是微任务*/
    await f(1000);
    // 如果f函数中有异步，那么await下面的代码会等到函数中异步执行完毕，才会执行这个微任务
    await f(3000);
    console.log(1);
}
fn();
console.log(4);

//2 3 1111 4 1111 1




