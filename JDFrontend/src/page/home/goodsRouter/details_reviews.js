import React , {useState , useEffect} from 'react'
import { getGoodsReviews } from '../../../assets/js/libs/request';
import { localParam  , lazyImg} from '../../../assets/js/utils/utils';
import config from '../../../assets/js/conf/config'
import UpRefresh from '../../../assets/js/libs/uprefresh';
import _ from 'lodash'
import '../../../assets/css/common/goods/details_reviews.css'

const DetailsReviews = (props) => {
    let copyGid = props.location.search !== ''?localParam(props.location.search).search.gid : '',
        curPage = 1,
        offsetBottom = 100;
    //添加一个状态用来存储评论数据
    const [aReviews , setAReviews] = useState([])
    //添加一个状态用来保存评论总数
    const [iReviewsTotal , setIReviewsTotal] = useState(0);
    //获取评价数据
    useEffect(() =>{
        let isUnmounted = false,
            url = config.baseUrl + '/api/home/reviews/index?gid=' + copyGid + '&token=' + config.token + '&page=1';
        try{
            const getReviewsDatas = async() => {
                try{
                    const res = await getGoodsReviews(url);
                    if(res.code === 200 && !isUnmounted){
                        setAReviews(_.get(res , ['data'] , []));
                        setIReviewsTotal(_.get(res , ['pageinfo','total'] , 0));
                        let maxPage = _.get(res , ['pageinfo','pagenum'],0);
                        getReviews(maxPage);
                    }
                }catch(err){
                    console.log('请求商品规格属性数据出错' , err)
                }
            }
            getReviewsDatas();
        }catch(err){
            console.log('请求更多评论数据出错' , err)
        }
        return () => {
            isUnmounted = true;
        }
    } , [])// eslint-disable-line react-hooks/exhaustive-deps
    //分页方法
    const getReviews = (maxPage) =>{
        new UpRefresh({"curPage" : curPage , 'maxPage' : maxPage  , 'offsetBottom' : offsetBottom} , curPage => {
            const dataScorllPage = async() =>{
                try{
                    //这里用字面量模板``好像不能请求,只能写成''加引号好的字符串形式
                    const res = await getGoodsReviews(config.baseUrl + '/api/home/reviews/index?gid=' + copyGid + '&token=' + config.token + '&page=' + curPage);
                    // console.log('res',res)
                    //用扩展运算符进行浅拷贝来修改状态(写成这样的箭头函数形式的,并且返回一个我们需要的值,不会触发React Hook useEffect has missing dependencies:data这个警告,这里如果添加一个data依赖的话,会出现问题)
                    if(res.code === 200){
                        setAReviews(aReviews => [...aReviews ,  ...(_.get(res , ['data'] , []))]);
                    }else{
                        setAReviews([]); 
                    }
                }catch(err){
                    console.log('请求更多评论数据出错' , err);
                }
            }
            dataScorllPage();
        })
    }
    useEffect(()=> {
        lazyImg();
    },[aReviews])
    return (
        <div className='page3'>
            <div className='reviews-main2'>
                <div className='reviews-title2'>商品评价({iReviewsTotal})</div>
                <div className='reviews-wrap2'>
                    {
                        aReviews.length > 0?
                        aReviews.map((item , index) => {
                            return(
                                <div className='reviews-list' key={index}>
                                    <div className='uinfo'>
                                        <div className='head'><img src={require('../../../assets/images/common/lazyImg.jpg').default} alt={item.nickname} data-echo={item.head}></img></div>
                                        <div className='nickname'>{item.nickname}</div>
                                    </div>
                                    <div className='reviews-content'>{item.content}</div>
                                    <div className='reviews-date'>{item.times}</div>
                                </div>
                            )
                        }):<div className='null-item'>没有相关评价</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default DetailsReviews