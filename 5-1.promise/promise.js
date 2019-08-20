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
    if ((typeof x === 'object' && x != null) || typeof x === 'function') {
        //可能是promise 判断是不是promise then
        try {
            let then = x.then; //看一看有没有then方法
            let called;//默认没有调用成功 和失败
            if(typeof then ==='function'){ //{then:function(){}}
                //时promise了
                then.call(x,(y)=>{//如果时一个promise 就用这个promise的结果
                    if(called)return;
                    called=true;
                    resolvePromise(y)
                },(r)=>{
                    if(called)return;//防止多次调用
                    called=true;
                    reject(r)
                })
            }else{//[1,2,3]
                resolve(x);//常量直接抛出去就行了
            }
        } catch (err) {
            if(called)return;//防止多次调用
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
        this.value = undefined;
        this.reason = undefined;
        this.status = PENDING;
        this.onResolvedCallback = [];
        this.onRejectedCallback = [];
        this.onRejected;
        let resolve = (value) => {
            if (this.status === PENDING) {
                this.value = value;
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
        try {
            executor(resolve, reject);
        } catch (e) { //发生错误
            reject(e)
        }
    }
    //then 方法会判断当前的状态
    then(onFulfilled, onRejected) {
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
                    })
                })
            }
        })
        return promise2
    }
}
//导出当前类 commonjs定义方式 export default 是ES6写法node不支持
module.exports = Promise

//链式调用

//规范测试库  Promise.deferred=function(){}