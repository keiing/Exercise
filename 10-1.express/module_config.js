var module_config={
    "detail":{
        "model":null,
        "render":function(){
            console.log("detail")
            for(var p in this.model){
                if(elem=$("#"+p,this.view)){
                    if(elem.length>1)for(var i=0;i<elem.length;i++){elem[i].textContent=this.model[p]}
                    else{elem.textContent=this.model[p]}
                }
            }
        },
        "view":$('#ceshi-detail')
    },
    "inverst":{
        "model":null,
        "render":function(){
            console.log("inverst")
            console.log(this.model)
        },
        "view":$('#ceshi-inverst')
    },
    "list":{
        "model":null,
        "render":function(){
            console.log("list")
        },
        "view":null
    },
    "mingfan":{
        "model":null,
        "render":function(){
            console.log('mingfan')
        },
        "view":null
    }
}