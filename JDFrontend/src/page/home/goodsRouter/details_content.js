import React , {useState , useEffect}from 'react'
import {getDetails} from '../../../assets/js/libs/request'
import { localParam } from '../../../assets/js/utils/utils';
import config from '../../../assets/js/conf/config'
import _ from 'lodash'
import '../../../assets/css/common/goods/details_content.css'

const DetailsContent = (props) => {
    let copyGid = props.location.search !== ''?localParam(props.location.search).search.gid : '';
    const [bodys , setBodys] = useState('');
    useEffect(() => {
        let url = config.baseUrl + '/api/home/goods/info?gid=' + copyGid + '&type=details&token=' + config.token,
            isUnmounted = false;
        try{
            const getDetailsDatas = async() => {
                const res = await getDetails(url);
                // console.log(res)
                if(res.code === 200 && !isUnmounted){
                    setBodys(_.get(res , ['data' , 'bodys'] , ''));
                }
            }
            getDetailsDatas();
        }catch(err){
            console.log('请求商品详情数据出错' , err);
        }
        return() => {
            isUnmounted = true;
        }
    } , [])// eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div className='page2'>
            {/* react里面可以将传输的文本中的DOM元素生效 */}
            <div className='content' dangerouslySetInnerHTML={{__html:bodys}}></div>
        </div>
    )
}

export default DetailsContent