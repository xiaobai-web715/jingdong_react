import React , {useState , useEffect} from 'react'
import {useSelector , useDispatch} from  'react-redux'
import { safeAuth , localParam} from '../../../assets/js/utils/utils'
import {request} from '../../../assets/js/libs/request'
import config from '../../../assets/js/conf/config'
import _ from 'lodash'
import Subheader from '../../../components/header/subheader'
import { Toast } from 'antd-mobile'
import '../../../assets/css/common/user/myorder/add_review.css'

const AddReview = (props) => {
    const [services , setServices] = useState([])
    const [content , setContent] = useState('')
    const dispatch = useDispatch(null)
    const {uid , authToken} = useSelector(state => state.loginRedux)
    let isSubmit = true;
    useEffect(() => {
        safeAuth(uid , authToken , props , dispatch)
    } , [])// eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        let isUnmounted = false
        //获取星级选项数据
        const getData = async() => {
            let url = config.baseUrl + '/api/home/reviews/service?token=' + config.token;
            const res = await request(url)
            if(res.code === 200 && !isUnmounted){
                let services = [..._.get(res , ['data'] , [])]
                for(let i = 0 ; i < services.length ; i++){
                    services[i].scores = [
                        {
                            checked : false,
                            score : 1
                        },
                        {
                            checked : false,
                            score : 2
                        },
                        {
                            checked : false,
                            score : 3
                        },
                        {
                            checked : false,
                            score : 4
                        },
                        {
                            checked : false,
                            score : 5
                        }
                    ]
                }
                setServices(services)
            }
        }
        getData()
        return () => {
            isUnmounted = true;
        }
    } , [])
    //选择评价分数
    const selectScore = (index , _index) => {
        let copyServices = [...services];
        //因为涉及到要重新选择星星个数的问题,这里可以在触发这个函数的时候先把所有的星星都变成灰色，然后再执行下面的for循环
        for(let i = 0 ; i < copyServices[index].scores.length ; i++){
            copyServices[index].scores[i].checked = false;
        }
        for(let i = 0 ; i <= _index ; i++){
            copyServices[index].scores[i].checked = true;
        }
        setServices(copyServices)
    }
    //提交评价
    const submitSave = () => {
        if(isSubmit){
            isSubmit = false;
            let rsdata = [];
            for(let i = 0 ; i < services.length ; i++){
                let isChecked = false;
                for(let j = 0 ; j < services[i].scores.length ; j++){
                    if(services[i].scores[j].checked){
                        isChecked = true;
                        break;
                    }
                }
                if(!isChecked){
                    Toast.info(`请选择${services[i].title}评价` , 2)
                    isSubmit = true;
                    return;
                }
            }
            if(content.match(/^\s*$/)){
                Toast.info(`请输入评价内容` , 2 , () => {
                    isSubmit = true;
                })
                return;
            }
            //组装评价数据
            for(let i = 0 ; i < services.length ; i++){
                let score = 0;
                for(let j = 0 ; j < services[i].scores.length ; j++){
                    if(!services[i].scores[j].checked){
                        score = services[i].scores[j-1].score
                        break;
                    }else if(j === services[i].scores.length - 1){
                        score = services[i].scores[j].score
                    }
                }
                rsdata.push({
                    gid : props.location.search ? localParam(props.location.search).search.gid : '981541541',
                    myid : uid,
                    rsid : services[i].rsid,
                    score,
                })
            }
            let data = {
                uid,
                gid : props.location.search ? localParam(props.location.search).search.gid : '981541541',  //这里之所以这样来写是因为我没办法通过后台来设置需要评价的订单
                ordernum :  props.location.search ? localParam(props.location.search).search.ordernum : '681199615',
                content,
                rsdata : JSON.stringify(rsdata),
            }
            let url = config.baseUrl + '/api/home/reviews/add?token=' + config.token;
            request(url , 'post' , data).then(res => {
                if(res.code === 200){
                    Toast.info(res.data , 2 , () => {
                        props.history.goBack();
                    })
                }else{
                    Toast.info(res.data , 2 , () => {
                        isSubmit = true;
                    })
                }
            })
        }
    }
    return (
        <div className='addReview_page'>
            <Subheader title='评价'></Subheader>
            <div className='main'>
                {
                    services.length > 0 ?
                    services.map((item , index) => {
                        return (
                            <ul className='service' key={index}>
                                <li>{item.title}</li>
                                <li>
                                    {
                                        item.scores.length > 0 ?
                                        item.scores.map((_item , _index) => {
                                            return(
                                                <div className={_item.checked ? 'stars active' : 'stars'} key={_index}onClick={selectScore.bind(null , index , _index)}></div>
                                            )
                                        }) : ''
                                    }
                                </li>
                            </ul>
                        )
                    }):''
                }
                <div className='content-wrap'>
                    <textarea placeholder='来分享你的消费感受吧！' onChange={(e) => {
                        setContent(e.target.value)
                    }}></textarea>
                </div>
                <input type='submit' className='submit' onClick={submitSave}></input>
            </div>
        </div>
    )
}

export default AddReview
