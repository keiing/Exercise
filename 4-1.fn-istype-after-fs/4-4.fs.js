const fs = require('fs');

//存储结果
var jsons = [{
        "url": "4-1.fn-after.html",
        "name": "after1",
        "Fncoding": "utf8"
    },
    {
        "url":"4-2.fn-is-type.html",
        "name":"42fnistype",
        "Fncoding":'utf8'
    },
    {
        "url": "4-3.fn-is-type2.html",
        "name": "istype1",
        "Fncoding": "utf8"
    }
]
var len = jsons.length;
console.log()

function afters(times, callback) {
    //times次数
    //callback回调函数
    let school = {} //储存对象
    return (key, value) => {
        school[key] = value //如school['uname']='zhangsan'
        if (--times === 0) { //利用闭包判断指定次数是否为0
            callback(school) //指定次数为零后执行
        }
    }
}
let newAfter = afters(len, (school) => {
    for(var item in school){
        console.log(school[item],'------------'+item)
    }
});
for (let i = 0; i < len; i++) {
    fs.readFile(`${jsons[i]["url"]}`, `${jsons[i].Fncoding}`, function (err, data) {
        newAfter(jsons[i].name, data);
    });
}