//事务 开始的时候 做某些事 结束的时候再做某些事
const perform = (anymethod, wrappers) => {
    wrappers.forEach(wrap => {
        wrap.initilizae();
    })
    anymethod();
    wrappers.forEach(wrap => {
        wrap.close();
    })
}
perform(() => {
    console.log('说话')
}, [{
        initilizae() {
            console.log('你好')
        },
        close() {
            console.log('再见')
        }
    },
    {
        initilizae() {
            console.log('你好1')
        },
        close() {
            console.log('再见2')
        }
    }
])