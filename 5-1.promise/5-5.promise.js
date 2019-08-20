const Promise=require("./promise");

//如果一个Promise then的方法中返回了一个普通值

let p=new Promise((resolve,reject)=>{
    resolve("路漫漫")
});
let p2=p.then(data=>{
    console.log(data+"吾应而上下求其知知，而知所以然");
    return data+"吾应而上下求其知知，而知所以然";//意思就是 我等待着我写作业 卡死了
})
p2.then(data=>{
    console.log(data,'data2---');
    return data;
},(err)=>{
    console.log(err)
}).then(data=>{
    console.log(data,"持之以恒方程也")
})