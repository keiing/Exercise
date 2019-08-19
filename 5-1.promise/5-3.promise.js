//1.解决兵法问题 同步多个异步方法的执行结果
//2.链式调用的问题 （先获取name，通过name获取age） 解决多个回调的问题

//Promise是一个类
// 1.每次new 一个Promise 都需要传递一个执行器，执行器是立即执行的
// 2.执行器中有两个参数 resolve，reject
// 3.默认Promise 有三个状态 pendding=> resolve表示成功了fulfilleds reject表示拒绝了rejected
// 4.如果一旦成功了 不能变成失败 一旦失败 不能再成功了 只有当前状态时pendding时
// 5.每个Promise都有一个then方法
let Promise=require('./promise')
let p=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('路漫漫');
    },1000)
    // throw new Error('路漫漫')
});
p.then(data=>{//成功的回调
    console.log(data+"吾将上下而其所")
},err=>{
    console.log('找其根，追其本，学而精有所成',err);//失败的回调
}
)
p.then(data=>{//成功的回调
    console.log(data+"吾将上下而其所")
},err=>{
    console.log('找其根，追其本，学而精有所成',err);//失败的回调
}
)
p.then(data=>{//成功的回调
    console.log(data+"吾将上下而其所")
},err=>{
    console.log('找其根，追其本，学而精有所成',err);//失败的回调
}
)