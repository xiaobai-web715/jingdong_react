import React , {useState , useEffect} from 'react'
import config from '../../../assets/js/conf/config'
import { setDelCart } from '../../../actions/delCartAction'
import { setCheckItem } from '../../../actions/checkItemAction'
import { setAllChecked } from '../../../actions/allCheckedAction'
import { setIncAmount } from '../../../actions/incAmountAction'
import { setDecAmount } from '../../../actions/decAmountAction'
import { setChangeAmount } from '../../../actions/changeAmountAction'
import {useSelector , useDispatch} from 'react-redux'
import Subheader from '../../../components/header/subheader'
import '../../../assets/css/common/cart/cartIndex.css'

const CartIndex = (props) => {
    const {aCartData , total} = useSelector(state => state.cartRedux)
    //点击删除删除购物车的商品
    const dispatch = useDispatch();
    //定义一个状态来存储全选是否亮起
    const [bAllCheck , setBAllCheck] = useState(true)
    //删除购物车列表商品
    const delItem = (index) => {
        if(aCartData.length > 0){
            dispatch(setDelCart({index : index}))
        }
        isAllChecked();
    }
    //选择商品
    const checkItem = (index , checked) => {
        if(aCartData.length > 0){
            dispatch(setCheckItem({index , checked}))
            isAllChecked();
        }
    }
    useEffect(() => {
        //初始挂载的时候执行一下检测商品是否选中的方法(商品列表中的checked的状态已经在点击选择商品时候改变并存储到了localStrage里面了)
        isAllChecked();
    } , [])// eslint-disable-line react-hooks/exhaustive-deps
    //商品是否全部选中了
    const isAllChecked = () => {
        let bCheck = true;
        if(aCartData.length > 0){
            for(let key in aCartData){
                if(!aCartData[key].checked){
                    //里面只要有一个checked状态是false就说明没有全部选中
                    //将状态修改false
                    bCheck = false;
                    setBAllCheck(false);
                    break;
                }
            }
            if(bCheck){
                setBAllCheck(true);
            }
        }else{
            //这里是没有数据的时候将状态变成false来关闭全选的显示状态
            setBAllCheck(false);
        }
    }
    //点击全选按钮触发改变的方法
    const allChecked = (checked) => {
        if(aCartData.length > 0){
            //然后通过dispatch传到redux里面去修改所有商品列表的checked的状态
            dispatch(setAllChecked({checked}))
            isAllChecked();
        }
    }
    //增加商品数量
    const incAmount = (index) => {
        if(aCartData.length > 0){
            //通过dispatch传到redux里面去修改所有商品列表的数量的状态
            dispatch(setIncAmount({index}));
        }
    }
    //减少商品的数量
    const decAmount = (index) => {
        if(aCartData.length > 0){
            dispatch(setDecAmount({index}));
        }
    }
    //手动修改商品的数量
    const changeAmount = (e , index) =>{
        if(aCartData.length > 0){
            let iAmount = 1;
            if(e.target.value !== ''){
                iAmount = e.target.value.replace(/[a-zA-Z]|[\u4e00-\u9fa5]|[#|*|,|+|;]/g , '')
                if(iAmount === ''){
                    iAmount = 1;
                }
            }
            dispatch(setChangeAmount({index , amount :iAmount}));
        }
    }
    //点击跳转到结算页面
    const goBalance = () => {
        //购物车商品被勾选(也就是总价有的时候)
        if(total > 0){
            props.history.push(config.path + 'balance/index')
        }
    }
    return (
        <div>
            <Subheader title='购物车' right-text=''></Subheader>
            <div className='cart-main'>
                {
                    aCartData.length > 0 ?
                    aCartData.map((item , index) => {
                        return(
                            <div className='cart-list' key={index}>
                                <div className={item.checked?'select-btn active' : 'select-btn'} onClick={checkItem.bind(null , index , !item.checked)}></div>
                                <div className='image-wrap'>
                                    <div className='image'><img src={item.img} alt={item.title}></img></div>
                                    <div className='del' onClick={delItem.bind(null , index)}>删除</div>
                                </div>
                                <div className='goods-wrap'>
                                    <div className='goods-title'>{item.title}</div>
                                    <div className='goods-attr'>
                                        {
                                            item.attrs.length > 0?
                                            item.attrs.map((item , index) => {
                                                return(
                                                    <span key={index}>{item.title}:{
                                                        item.param.length > 0 ?
                                                        item.param.map((item , index) => {
                                                            return(
                                                                <React.Fragment key={index}>{item.title}</React.Fragment>
                                                            )
                                                        }):''
                                                    }</span>
                                                )
                                            }):''
                                        }
                                    </div>
                                    <div className='buy-wrap'>
                                        <div className='price'>￥{item.price}</div>

                                            <div className='amount-input-wrap'>
                                                <div className={item.amount > 1?'dec':'dec active'} onClick={decAmount.bind(null , index)}>-</div>
                                                <div className='amount-input'><input type='tel' value={item.amount} onChange={(e) => changeAmount(e , index)}></input></div>
                                                <div className='inc' onClick={incAmount.bind(null , index)}>+</div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }):<div className='null-item' style={{marginTop : '2.4rem'}}>您好没有选购商品!</div>
                }
            </div>
            <div className='orderend-wrap'>
                <div className='select-area'>
                    <div className='select-wrap' onClick={allChecked.bind(null , !bAllCheck)}>
                        <div className={bAllCheck?'select-btn active':'select-btn'}></div>
                        <div className='select-text'>全选</div>
                    </div>
                    <div className='total'>合计:<span>￥{total}</span></div>
                </div>
                <div className={total > 0 ?'orderend-btn' : 'orderend-btn disable'} onClick={goBalance.bind(null)}>去结算</div>
            </div>
        </div>
    )
}

export default CartIndex
