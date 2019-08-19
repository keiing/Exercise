let fs=require('fs');

function readFile(...args){
   return new Promise((resolve,reject)=>{
    fs.readFile(...args,function(err,data){
        if(err)reject(err);
        resolve(data);
    })
}) 
}
//链式调用 如果返回一个普通值 会走下一个then的成功
//抛出错误 then失败方法
//如果时promise 就常采用promise执行采用他的状态
//返回一个新的promise 来实现链式调用
readFile('./5-2.promise.html','utf8').then(data=>{
    return data;
},err=>{
    console.log('s'+data)
}).then(data=>{
    console.log(data)
})