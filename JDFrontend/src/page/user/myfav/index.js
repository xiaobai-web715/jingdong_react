import React , {useEffect , useState}from 'react'
import {useDispatch , useSelector} from 'react-redux'
import {safeAuth , lazyImg} from '../../../assets/js/utils/utils'
import config from '../../../assets/js/conf/config'
import {request} from '../../../assets/js/libs/request'
import Subheader from '../../../components/header/subheader'
import UpRefresh from '../../../assets/js/libs/uprefresh';
import { Modal, Toast } from 'antd-mobile'
import _ from 'lodash'
import '../../../assets/css/common/user/myfav/index.css'

const MyfavIndex = (props) => {
    const [datas , setDatas] = useState([])
    const dispatch = useDispatch(null)
    const {uid , authToken} = useSelector(state => state.loginRedux)
    let obj = {isUnmounted : false};
    //分页方法
    let curPage = 1,
    offsetBottom = 100;
    const getReviews = (maxPage , obj) =>{
        new UpRefresh({"curPage" : curPage , 'maxPage' : maxPage  , 'offsetBottom' : offsetBottom} , curPage => {
            const dataScorllPage = async() =>{
                try{
                    //这里用字面量模板``好像不能请求,只能写成''加引号好的字符串形式
                    const res = await request(config.baseUrl + 'api/user/fav/index?uid=' + uid + '&token=' + config.token + '&page=' + curPage);
                    if(res.code === 200 && !obj.isUnmounted){
                        setDatas(datas => [...datas ,  ...(_.get(res , ['data'] , []))]);
                    }
                }catch(err){
                    console.log('请求更多评论数据出错' , err);
                }
            }
            dataScorllPage();
        })
    }
    const getData = async(obj) => {
        let url = config.baseUrl + 'api/user/fav/index?uid=' + uid + '&token=' + config.token + '&page=1'
        let res = await request(url)
        if(res.code === 200 && !obj.isUnmounted){
            getReviews(_.get(res , ['pageinfo','pagenum'],0) , obj)
            setDatas(_.get(res , ['data'] , []))
        }
    }
    useEffect(() => {
        safeAuth(uid , authToken , props , dispatch)
        getData(obj)
        return () => {
            obj.isUnmounted = true;
        }
    } , [])// eslint-disable-line react-hooks/exhaustive-deps
    //删除收藏
    const delFav = (index , fid) => {
        Modal.alert('', '确认要删除吗?', [
            { text: '取消', onPress: () => {}, style: 'default' },
            { text: '确认', onPress: () => {
                let url = config.baseUrl + '/api/user/fav/del?uid=' + uid + '&fid=' +  fid + '&token=' + config.token
                request(url , 'post').then(res => {
                    if(res.code===200){
                        Toast.info('删除成功' , 2)
                        setTimeout(() => {props.history.goBack()} , 1)
                        props.history.push(config.path + 'transfer')
                        // let copyDatas = [...datas]
                        // copyDatas.splice(index , 1)
                        // setDatas(copyDatas)
                    }
                })
            }},
        ]);
    }
    useEffect(() => {
        lazyImg()
    } , [datas])
    //点击购买跳转到商品详情页
    const pushPage = url => {
        props.history.push(config.path + url)
    }
    return (
        <div className='myfav-page'>
            <Subheader title='我的收藏'></Subheader>
            <div className='main'>
                <div className='goods-info'>
                    {
                        datas.length > 0 ?
                        datas.map((item , index) => {
                            return (
                                <div className='goods-list' key={index}>
                                    <div className='image'>
                                        <img src={require('../../../assets/images/common/lazyImg.jpg').default} alt={item.title} data-echo={item.image}></img>
                                    </div>
                                    <div className='title'>{item.title}</div>
                                    <div className='price'>￥{item.price}</div>
                                    <div className='btn-wrap'>
                                        <div className='btn' onClick={pushPage.bind(null , 'goods/details/item?gid='+item.gid)}>购买</div>
                                        <div className='btn' onClick={delFav.bind(null , index , item.fid)}>删除</div>
                                    </div>
                                </div> 
                            )
                        }) : ''
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default MyfavIndex
