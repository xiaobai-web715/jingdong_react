import React , {useState , useEffect} from 'react'
import _ from 'lodash';
import config from '../../../assets/js/conf/config';
import { getGoods} from '../../../assets/js/libs/request';
//图片懒加载
import { lazyImg , localParam } from '../../../assets/js/utils/utils';
//iscroll滑动效果
import IScroll from '../../../assets/js/libs/iscroll';
import '../../../assets/css/common/goods/item.css';

const Item = (props) => {
    // console.log('props' , props);
    const [uid , setUid] = useState('');
    // console.log('uid' , uid);
    const [dataGoods , setDataGoods] = useState([]);
    let scrollTarget = null;
    //获取uid
    useEffect(()=> {
        let isUnmounted = false;
        const uidNew = localParam(props.location.search);
        // console.log('uidNew' , uidNew);
        if(!isUnmounted){
            setUid(_.get(uidNew , ['search' , 'cid'] , ''))
        }
        return () => {
            isUnmounted = true;
        }
    },[props])
    //根据不同的参数cid来获取不同的商品数据
    useEffect(() =>{
        let isUnmounted = false;
        const getDataGoods = async() => {
            try{
                const res = await getGoods(config.baseUrl + `/api/home/category/show?cid=${uid}&token=` + config.token);
                if(res.code === 200){
                    if(!isUnmounted){
                        setDataGoods(_.get(res , ['data'] , []));
                    }
                }else{
                    // 他这里还有一个201状态的情况
                    if(!isUnmounted){
                        setDataGoods([]);
                    }
                }
                // console.log('res' , res);
            }catch(err){
                console.log('请求商品数据出错了' , err);
            }
        }
        getDataGoods();
        return () => {
            isUnmounted = true;
        }
    },[uid])
    //商品部分也实现iscroll滑动效果
    useEffect(() => {
        scrollTarget.addEventListener('touchmove' , function(e){
            e.preventDefault();
        } , false)
        let scroll = new IScroll (scrollTarget , {
            scrollX : false,
            scrollY : true,
            preventDefault : false,
        })
        //这里是给iscroll绑定一个滑动监听函数,当滑动结束的时候触发图片懒加载
        scroll.on('scrollEnd' , ()=>{
            lazyImg();
        })
        lazyImg()
    } , [dataGoods])// eslint-disable-line react-hooks/exhaustive-deps
    //点击跳转
    const goPage = (pUrl) => {
        props.history.push(config.path + pUrl);
    }
    return (
        <div ref={div => scrollTarget = div} className='goods-content-main'>
            {/* 这里加也是为了满足那iscroll要求的3层模式,要不就会报错 */}
            <div>
            {
                dataGoods.length > 0 ?(
                    dataGoods.map((item , index) => {
                        return (
                            <div className='goods-wrap' key={index}>
                                <div className = 'classify-name'>{item.title}</div>
                                <div className = 'goods-items-wrap'>
                                    {
                                        _.get(item , ['goods'] , []) != null?(
                                            _.get(item , ['goods'] , []).map((item , index) => {
                                                return(
                                                    <div className = 'items' key={index} onClick={goPage.bind(null , 'goods/details/item?gid=' + item.gid)}>
                                                        <img src={require('../../../assets/images/common/lazyImg.jpg').default} data-echo={item.image} alt={item.title}></img>
                                                        <div className='title'>{item.title}</div>
                                                    </div>
                                                )
                                            })
                                        ):""
                                    }
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div className='null-item'>没有相关数据!</div>
                )
            }
            </div>
        </div>
    )
}

export default Item
