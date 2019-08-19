//发布订阅模式 =>观察者模式 （vue watcher）
//发布订阅模式没有关系的
//观察者模式 我加小宝宝 心情好

class Subject{//被观察者 小宝宝
    constructor(){
        this.arr=[];
    }
    attach(o){
        this.arr.push(o);
    }
    setState(newState){
        this.state=newState;
        this.arr.forEach(o=>{
            o.update(newState)
        })
    }
}

class Observer{//观察者 我 我老婆
    constructor(name){
        this.name=name;
    }
    update(newState){
        console.log(this.name+'小宝宝',newState)
    }
}

let s=new Subject('小宝宝');
let o1=new Observer('我');
let o2=new Observer('我老婆');

s.attach(o1)
s.attach(o2)
s.setState('不开心了')
s.setState('开心了')