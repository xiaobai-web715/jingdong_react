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
    //获取uid
    useEffect(()=> {
        const uidNew = localParam(props.location.search);
        // console.log('uidNew' , uidNew);
        setUid(_.get(uidNew , ['search' , 'cid'] , ''))
    },[props])
    //根据不同的参数cid来获取不同的商品数据
    useEffect(() =>{
        const getDataGoods = async() => {
            try{
                const res = await getGoods(config.baseUrl + `/api/home/category/show?cid=${uid}&token=` + config.token);
                if(res.code === 200){
                    setDataGoods(_.get(res , ['data'] , []));
                }else{
                    // 他这里还有一个201状态的情况
                    setDataGoods([]);
                }
                // console.log('res' , res);
            }catch(err){
                console.log('请求商品数据出错了' , err);
            }
        }
        getDataGoods();
    },[uid])
    //商品部分也实现iscroll滑动效果
    useEffect(() => {
        document.getElementById('scroll-goods').addEventListener('touchmove' , function(e){
            e.preventDefault();
        } , false)
        let scroll = new IScroll ('#scroll-goods' , {
            scrollX : false,
            scrollY : true,
            preventDefault : false,
        })
        //这里是给iscroll绑定一个滑动监听函数,当滑动结束的时候触发图片懒加载
        scroll.on('scrollEnd' , ()=>{
            lazyImg();
        })
        lazyImg()
    } , [dataGoods])
    return (
        <div id='scroll-goods' className='goods-content-main'>
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
                                                    <div className = 'items' key={index}>
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
