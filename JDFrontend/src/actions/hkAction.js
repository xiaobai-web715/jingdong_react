//对获取action的方法进行分装,这样就可以不用直接写在dispatch里面
export const setHistoryKeywords = data =>(
    {
        type:'addHk',
        data : data,
    }
)