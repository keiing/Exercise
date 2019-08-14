/** 
 * Author:Caocao
 * Company:caocao
 * Data:2019-8-14T15:44
*/
(function(global,factory){
    //闭包1 做平台判断(其他工作)
    return factory(global);
}(typeof window!=="undefined"?window:this,function(window,noGlobal){
    //闭包2 专门只做关键的活 创建Driver
    var _M_={};
    var _D_={
        init:function(meta,modules){
            _M_=modules || _M_;
            //初始化工作只做一次
            this.load(meta);
        },
        load:function(data){
            //加载数据
            console.log(data)
            this.fetch(data);//拆解数据
            this.refresh();//刷新数据
        },
        fetch:function(data){
            for(var _m_ in _M_){
                /**
                if(data[_m_]){
                    _M_[_m_].model=data[_m_];
                    _M_[_m_].lock=true;//解锁
                }
                *///以上垃圾代码已经注释
                _M_[_m_].lock=!!( _M_[_m_].model= data[_m_] || undefined )
            }
        },
        refresh:function(){
            for(var _m_ in _M_){
                /**
                if(_M_[_m_].lock){
                    if(_M_[_m_].render!=undefined){
                        _M_[_m_].render();
                        _M_[_m_].lock=false;//上锁
                    }
                }*///以上的垃圾代码已经注释
                _M_[_m_].lock&&_M_[_m_].render&&_M_[_m_].render();
            }
        }
    };
    if(!noGlobal){
        window.ModuleDriver=window.$md=_D_;
    }
    return _D_;
}))