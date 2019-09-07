function findGf() {
    this.name = "mm";
    this.lag = 160;
}
findGf.prototype.selectName = function () {
    let name = this.name;//闭包 js垃圾回收机制不回去回收
    return function () {
        return name;
    }//垃圾回收机制没有回收，闭包常驻内存
    name = null;/**释放闭包 但是return 之后name=null还会再执行吗 
    通过打印process.memoryUsage()
    发现
    加上 name = null，heapUsed: 4236288,
    不加 heapUsed: 4236296,由此得出是有效果的
    */
}
let gf = new findGf();

// console.log(gf.selectName()())
/**
 * { rss: 21925888,
  heapTotal: 6537216,
  heapUsed: 3986848,
  external: 8272 }
 */
//垃圾回收 引用 并没有被回收
let o={
    a:{
        b:2
    }
}
/**
 * { rss: 21962752,
  heapTotal: 6537216,
  heapUsed: 3987568,
  external: 8272 }
 */

 let o2=o;

 o=1;

 let oa=o2.a;//{b:2}
 console.log(o);//1

 o2='willson'//"willson"
oa=null;//释放内存
console.log(process.memoryUsage());//测试