function fn2(){
    let o={
        a:'55555524',
        b:'55555524',
        d:'55555524',
        c:'55555524',
    };
    let o2={
        a:'55555524',
        b:'55555524',
        d:'55555524',
        c:'55555524',
    };
    //heapUsed: 3985408,
    o.a=o2;
    o2.a=o;
    //引用过后heapUsed: 3985464, 相互引用，不会被回收
}
fn2();
console.log(process.memoryUsage());