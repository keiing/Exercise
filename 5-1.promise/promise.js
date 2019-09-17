const PENDING = "PENDING"
const FULFILLED = "FULFILLED"
const REJECTED = "REJECTED"
const resolvePromise = (promise2, x, resolve, reject) => {
    //处理x 的类型 来决定时调用resolve还是reject
    //必须要写的很谨慎
    if (promise2 === x) { //自己等待自己完成
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    // 判断x 是不是一个普通值 先认为你是一个promise
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        let called;//默认没有调用成功 和失败
        //可能是promise 判断是不是promise then
        try {//取then的时候 可能会发生异常 getter
            let then = x.then; //看一看有没有then方法
            if(typeof then === 'function'){ //{then:function(){}}
                //时promise了 让函数调用即可
                then.call(x,y=>{//如果时一个promise 就用这个promise的结果 
                    if(called)return;
                    called=true; //y有可能还是个promise
                    resolvePromise(promise2,y,resolve,reject)
                },r=>{
                    if(called)return;//防止多次调用
                    called=true;
                    reject(r)
                })
            }else{//[1,2,3]
                resolve(x);//常量直接抛出去就行了
            }
        } catch (err) {
            if(called) return;//防止多次调用
            called=true;
            reject(err)
        }
    } else {
        //不是promise
        resolve(x);
    }
}
class Promise {
    constructor(executor) {
        //创建promise executor会立即执行
        this.value = undefined;//成功的值
        this.reason = undefined;//失败的值
        this.status = PENDING;
        this.onResolvedCallback = [];
        this.onRejectedCallback = [];
        this.onRejected;
        let resolve = value => {//成功
            //如果一个promsie resolve中传过来的是一个新的promise()就会等到这个内部的promise执行完成
            if(value instanceof Promise){
                //就让 vlaue.then(resolve,reject)执行 返回结果 再去调用成功或者失败
                return value.then(resolve,reject);
            }
            if (this.status === PENDING) {//只有当状态时pending的时候
                this.value = value;//将值保存起来
                this.status = FULFILLED;
                this.onResolvedCallback.forEach(fn => fn()); //发布有可能resolve在then的后面执行，此时先将方法存放起来，到时候依次执行
            }
        };
        let reject = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason;
                this.status = REJECTED;
                this.onRejectedCallback.forEach(fn => fn());
            }
        };
        //这里可能会发生异常
        try {//如果出错
            executor(resolve, reject);//出错了 直接退出即可
        } catch (e) { //发生错误
            reject(e)
        }
    }
    //then 方法会判断当前的状态
    then(onFulfilled, onRejected) {//两个回调时可选参数
        //默认参数
        onFulfilled=typeof onFulfilled === 'function'?onFulfilled:val=>val;
        onRejected=typeof onRejected === 'function'?onRejected:err=>{throw err};
        //then方法调用后应该返还一个新的promise
        let promise2 = new Promise((resolve, reject) => {
            //应该在返回的promise中 取到上一次的状态 来决定这个promise2时成功还是失败
            if (this.status === FULFILLED) {
                //当前的onFulfilled，onRejected不能再当前的上下文中执行，为了确保代码promise2存在
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (err) {
                        reject(err)
                    }
                })
            }
            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (err) {
                        reject(err)
                    }
                })
            }
            if (this.status === PENDING) {
                this.onResolvedCallback.push(() => {
                    setTimeout(() => {
                        try { //让then中的方法执行 拿到他的返回值
                            let x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (err) {
                            reject(err)
                        }
                    })
                })
                this.onRejectedCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (err) {
                            reject(err)
                        }
                    });
                });
            }
        })
        return promise2
    }
    catch(errCallback){//没有成功的then
        return this.then(null,errCallback)
    }
    static reject(reason){//创建一个失败的promise
     return new Promise((resolve,reject)=>{
         reject(reason);
     })   
    }
    static resolve(value){//创建一个成功的promise
        return new Promise((resolve,reject)=>{
            resolve(value);
        })
    }
}

/** promises-aplus-tests promise.js*/
Promise.deferred=function(){
    let dfd={};
    dfd.promise=new Promise((resolve,reject)=>{
        dfd.resolve=resolve;
        dfd.reject=reject;
    })
    return dfd;
}
 

//导出当前类 commonjs定义方式 export default 是ES6写法node不支持
module.exports = Promise

//链式调用

//规范测试库  Promise.deferred=function(){}