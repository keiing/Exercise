const fs=require('fs');

let school={}
let e={
    arr:[],
    on(fn){
        this.arr.push(fn);
    },
    emit(){
        this.arr.forEach(fn=>fn())
    }
}
e.on(()=>{//订阅
    console.log('ok')
})
e.on(()=>{//订阅
    if(Object.keys(school).length===2){
        console.log(school)
    }
})

fs.readFile('./4-4.after-fs.js', 'utf8', function (err, data) {
      school['name']=data;
      e.emit();//发布
});
fs.readFile('./4-5.transcation.js', 'utf8', function (err, data) {
      school['name2']=data;
      e.emit();//发布
});