const Promise=require("./promise");

//如果一个Promise then的方法中返回了一个普通值
/**
let p=new Promise((resolve,reject)=>{
    resolve(new Promise((resolve,reject)=>{

        setTimeout(()=>{
            resolve('ppp')
            // resolve("路漫漫")
        })
    }))

    });
let p2=p.then(data=>{
    throw new Error('err')
    console.log(data+"吾应而上下求其知知，而知所以然");
    return data+"吾应而上下求其知知，而知所以然";//意思就是 我等待着我写作业 卡死了
})
p2.then(null,(err)=>{
    console.log(err,'111111')
}).then(null,err=>{
    console.log(err,"持之以恒方程也")
})
 */
let p=new Promise((resolve,reject)=>{
    resolve(new Promise((resolve,reject)=>{

        setTimeout(()=>{
            reject('路漫漫')
            // resolve("路漫漫")
        },1000)
    }))

    }).then(data=>{
    console.log(data+"吾应而上下求其知知，而知所以然");
    // return data+"吾应而上下求其知知，而知所以然";//意思就是 我等待着我写作业 卡死了
}).catch(err=>{
    console.log(err,"err")
})

//Promise.finally 最终的 无论如何都执行
//Promise.try()

// let p2=new Promise((resolve,reject)=>{
//     resolve();
// })
//finally这里出错了
Promise.resolve(123).then(data=>{console.log(data)}).finally(()=>{
    console.log('hellow')
})
// Promise.resolve(123).finally(()=>{
//     console.log('finally')
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{resolve()},3000)
//         console.log('hello')
//     })
// }).then(data=>{
//     console.log(data,'err')
// })