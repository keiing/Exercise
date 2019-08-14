/** 
 * Author:Caocao
 * Company:caocao
 * Data:2019-8-14T15:44
*/
var ModuleDriver=(function(global,factory){
    return factory.call(global);
})(this,function(){
    console.log('闭包中');
    return {
        init:function(meta){
            console.log(meta)
        },
        load:function(){}
    };
});