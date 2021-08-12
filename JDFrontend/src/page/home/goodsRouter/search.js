//这个是搜索加载的页面
//这个页面也是要加载到路由里面的
import React , {useState , useEffect} from 'react'
import '../../../assets/css/common/goods/search.css'
import IScroll from '../../../assets/js/libs/iscroll'

const Search = () => {
    const [screenMove , setScreenMove] = useState('');
    const [bMask , setBMask] = useState(false);
    //当点击筛选出现操作面板时,禁止滚动条的滑动效果
    //当点击筛选的时候触发操作面板动画效果
    const showScreen = () => {
        //这是目前我所能想到的绑定监听事件的方式,不知道函数组件有没有和类组件一样的ref可以使用
        // touchmove是滑动事件,当这俩个DOM元素出现时会触发禁止效果
        document.getElementById('mask').addEventListener('touchmove' , function(e){
            e.preventDefault();
        } , false)
        document.getElementById('screen').addEventListener('touchmove' , function(e){
            e.preventDefault();
        } , false)
        setBMask(true);
        setScreenMove('move');
    }
    //点击触发控制面板退出效果
    const hideScreen = () => {
        setBMask(false);
        setScreenMove('unmove')
    }
    //IScroll使用
    useEffect(() => {
        new IScroll('#screen' ,{
            scrollX : false,
            scrollY : true,
            preventDefault : false,
        });
    } , [])
    return (
        <div className='search-page'>
            <div className='search-top'>
                <div className='search-header2'>
                    <div className='search-back'></div>
                    <div className='search-wrap2'>
                        <div className='search-icon2'></div>
                        <div className='search-text2'>请输入您的宝贝名称</div>
                    </div>
                    <div className='screen-btn2' onClick={showScreen.bind(null)}>筛选</div>
                </div>
                <div className='order-main'>
                    <div className='order-item'>
                        <div className='order-text active'>综合</div>
                        <div className='order-icon up'></div>
                        <ul className='order-menu hide'>
                            <li className='active'>综合</li>
                            <li>价格从低到高</li>
                            <li>价格从高到低</li>
                        </ul>
                    </div>
                    <div className='order-item'>
                        <div className='order-text'>销量</div>
                    </div>
                </div>
            </div>
            {/* 产品列表 */}
            <div className='goods-main2'>
                <div className='goods-list2'>
                    <div className='image'><img src='' alt=''></img></div>
                    <div className='goods-content2'>
                        <div className='goods-title2'>你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢</div>
                        <div className='goods-price'>￥118</div>
                        <div className='goods-sales'>销量<span>100</span>件</div>
                    </div>
                </div>
                <div className='goods-list2'>
                    <div className='image'><img src='' alt=''></img></div>
                    <div className='goods-content2'>
                        <div className='goods-title2'>你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢</div>
                        <div className='goods-price'>￥118</div>
                        <div className='goods-sales'>销量<span>100</span>件</div>
                    </div>
                </div>
                <div className='goods-list2'>
                    <div className='image'><img src='' alt=''></img></div>
                    <div className='goods-content2'>
                        <div className='goods-title2'>你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢</div>
                        <div className='goods-price'>￥118</div>
                        <div className='goods-sales'>销量<span>100</span>件</div>
                    </div>
                </div>
                <div className='goods-list2'>
                    <div className='image'><img src='' alt=''></img></div>
                    <div className='goods-content2'>
                        <div className='goods-title2'>你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢</div>
                        <div className='goods-price'>￥118</div>
                        <div className='goods-sales'>销量<span>100</span>件</div>
                    </div>
                </div>
                <div className='goods-list2'>
                    <div className='image'><img src='' alt=''></img></div>
                    <div className='goods-content2'>
                        <div className='goods-title2'>你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢</div>
                        <div className='goods-price'>￥118</div>
                        <div className='goods-sales'>销量<span>100</span>件</div>
                    </div>
                </div>
                <div className='goods-list2'>
                    <div className='image'><img src='' alt=''></img></div>
                    <div className='goods-content2'>
                        <div className='goods-title2'>你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢</div>
                        <div className='goods-price'>￥118</div>
                        <div className='goods-sales'>销量<span>100</span>件</div>
                    </div>
                </div>
                <div className='goods-list2'>
                    <div className='image'><img src='' alt=''></img></div>
                    <div className='goods-content2'>
                        <div className='goods-title2'>你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢</div>
                        <div className='goods-price'>￥118</div>
                        <div className='goods-sales'>销量<span>100</span>件</div>
                    </div>
                </div>
                <div className='goods-list2'>
                    <div className='image'><img src='' alt=''></img></div>
                    <div className='goods-content2'>
                        <div className='goods-title2'>你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢你说啥名字好呢</div>
                        <div className='goods-price'>￥118</div>
                        <div className='goods-sales'>销量<span>100</span>件</div>
                    </div>
                </div>
            </div>
            {/* 点击筛选产生的背景色,并通过事件监听禁用滑动效果 */}
            <div id='mask' className={bMask?'mask':'mask hide'} onClick={hideScreen.bind(null)}></div>
            {/* 点击筛选产生的控制面板 */}
            <div id='screen' className={'screen ' + screenMove}>
                <div>
                    <div className='attr-wrap'>
                        <div className='attr-title-wrap'>
                            <div className='attr-name'>分类</div>
                            <div className='attr-icon up'></div>
                        </div>
                        <div className='item-wrap'>
                            <div className='item active'>潮流女装</div>
                            <div className='item'>潮流女装</div>
                            <div className='item'>潮流女装</div>
                            <div className='item'>潮流女装</div>
                            <div className='item'>潮流女装</div>
                        </div>
                    </div>
                    <div style={{width:'100%' , height:'1px' , backgroundColor:'#EFEFEF'}}></div>
                    <div className='attr-wrap'>
                        <div className='attr-title-wrap'>
                            <div className='attr-name'>价格区间</div>
                            <div className='price-wrap'>
                                <div className='price-input'><input type='tel' placeholder='最低价'></input></div>
                                <div className='price-line'></div>
                                <div className='price-input'><input type='tel' placeholder='最高价'></input></div>
                            </div>
                            <div className='attr-icon up'></div>
                        </div>
                        <div className='item-wrap'>
                            <div className='item'>1-50</div>
                            <div className='item'>51-99</div>
                            <div className='item'>100-300</div>
                            <div className='item'>301-1000</div>
                            <div className='item'>1001-4000</div>
                            <div className='item'>4001-9999</div>
                        </div>
                    </div>
                    <div style={{width:'100%' , height:'0.6rem' , backgroundColor:'#EFEFEF'}}></div>
                    <div className='attr-wrap'>
                        <div className='attr-title-wrap'>
                            <div className='attr-name'>品牌</div>
                            <div className='attr-icon up'></div>
                        </div>
                        <div className='item-wrap'>
                            <div className='item active'>李宁</div>
                            <div className='item'>阿迪达斯</div>
                            <div className='item'>耐克</div>
                        </div>
                    </div>
                    <div style={{width:'100%' , height:'1px' , backgroundColor:'#EFEFEF'}}></div>
                    <div className='attr-wrap'>
                        <div className='attr-title-wrap'>
                            <div className='attr-name'>衣长</div>
                            <div className='attr-icon up'></div>
                        </div>
                        <div className='item-wrap'>
                            <div className='item active'>长款</div>
                            <div className='item'>中长款</div>
                            <div className='item'>短款</div>
                        </div>
                    </div>
                    <div style={{width:'100%' , height:'1px' , backgroundColor:'#EFEFEF'}}></div>
                    <div className='attr-wrap'>
                        <div className='attr-title-wrap'>
                            <div className='attr-name'>衣长</div>
                            <div className='attr-icon up'></div>
                        </div>
                        <div className='item-wrap'>
                            <div className='item active'>长款</div>
                            <div className='item'>中长款</div>
                            <div className='item'>短款</div>
                        </div>
                    </div>
                    <div style={{width:'100%' , height:'1px' , backgroundColor:'#EFEFEF'}}></div>
                    <div className='attr-wrap'>
                        <div className='attr-title-wrap'>
                            <div className='attr-name'>衣长</div>
                            <div className='attr-icon up'></div>
                        </div>
                        <div className='item-wrap'>
                            <div className='item active'>长款</div>
                            <div className='item'>中长款</div>
                            <div className='item'>短款</div>
                        </div>
                    </div>
                    <div style={{width:'100%' , height:'1px' , backgroundColor:'#EFEFEF'}}></div>
                    <div className='attr-wrap'>
                        <div className='attr-title-wrap'>
                            <div className='attr-name'>衣长</div>
                            <div className='attr-icon up'></div>
                        </div>
                        <div className='item-wrap'>
                            <div className='item active'>长款</div>
                            <div className='item'>中长款</div>
                            <div className='item'>短款</div>
                        </div>
                    </div>
                    <div style={{width:'100%' , height:'1px' , backgroundColor:'#EFEFEF'}}></div>
                    <div className='attr-wrap'>
                        <div className='attr-title-wrap'>
                            <div className='attr-name'>衣长</div>
                            <div className='attr-icon up'></div>
                        </div>
                        <div className='item-wrap'>
                            <div className='item active'>长款</div>
                            <div className='item'>中长款</div>
                            <div className='item'>短款</div>
                        </div>
                    </div>
                    <div style={{width:'100%' , height:'1px' , backgroundColor:'#EFEFEF'}}></div>
                    <div className='attr-wrap'>
                        <div className='attr-title-wrap'>
                            <div className='attr-name'>衣长</div>
                            <div className='attr-icon up'></div>
                        </div>
                        <div className='item-wrap'>
                            <div className='item active'>长款</div>
                            <div className='item'>中长款</div>
                            <div className='item'>短款</div>
                        </div>
                    </div>
                    <div style={{width:'100%' , height:'1px' , backgroundColor:'#EFEFEF'}}></div>
                    <div className='attr-wrap'>
                        <div className='attr-title-wrap'>
                            <div className='attr-name'>衣长</div>
                            <div className='attr-icon up'></div>
                        </div>
                        <div className='item-wrap'>
                            <div className='item active'>长款</div>
                            <div className='item'>中长款</div>
                            <div className='item'>短款</div>
                        </div>
                    </div>
                    <div style={{width:'100%' , height:'1px' , backgroundColor:'#EFEFEF'}}></div>
                    <div className='attr-wrap'>
                        <div className='attr-title-wrap'>
                            <div className='attr-name'>衣长</div>
                            <div className='attr-icon up'></div>
                        </div>
                        <div className='item-wrap'>
                            <div className='item active'>长款</div>
                            <div className='item'>中长款</div>
                            <div className='item'>短款</div>
                        </div>
                    </div>
                    <div style={{width:'100%' , height:'1px' , backgroundColor:'#EFEFEF'}}></div>
                    {/* 这里添加一个DOM元素给界面撑起来,让最下面的可以成功显示 */}
                    <div style={{width:'100%' , height:'2rem'}}></div>
                </div>
                {/* 底部信息栏 */}
                <div className='handel-wrap'>
                    <div className='item'>共<span>16</span>件</div>
                    <div className='item reset'>全部重置</div>
                    <div className='item sure'>确定</div>
                </div>
            </div>
        </div>
    )
}

export default Search
