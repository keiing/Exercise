const PENDING = "PENDING"
const FULFILLED = "FULFILLED"
const REJECTED = "REJECTED"
class Promise {
    constructor(executor) {
        //创建promise executor会立即执行
        this.value = undefined;
        this.reason = undefined;
        this.status = PENDING;
        this.onResolvedCallback=[];
        this.onRejectedCallback=[];
        this.onRejected;
        let resolve = (value) => {
            if (this.status === PENDING) {
                this.value = value;
                this.status = FULFILLED;
                this.onResolvedCallback.forEach(fn=>fn());//发布有可能resolve在then的后面执行，此时先将方法存放起来，到时候依次执行
            }
        };
        let reject = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason;
                this.status = REJECTED;
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
        if (this.status === FULFILLED) {
            onFulfilled(this.value)
        }
        if (this.status === REJECTED) {
            onRejected(this.reason)
        }
        if(this.status===PENDING){
            this.onResolvedCallback.push(()=>{
                onFulfilled(this.value)
            })
            this.onRejectedCallback.push(()=>{
                onRejected(this.reason)
            })
        }
    }
}
//导出当前类 commonjs定义方式 export default 是ES6写法node不支持
module.exports = Promise

//链式调用