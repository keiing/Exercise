let $=function(elem,content){
    if(!content){
        var query=document.querySelectorAll(elem);
        if(query.length>1){
            return query;
        }
        return query[0];
    }else{
        var query=content.querySelectorAll(elem);
        if(query.length>1){
            return query;
        }
        return query[0];
    }
}