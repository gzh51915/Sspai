import React, {useEffect,useState} from 'react';
import MyBreadcrumb from "../../conponents/my-Breadcrumb";
import {bannerRequest} from "../../api/request";
import {Empty} from 'antd'

   const  Banner =  () => {
       const [bannerList,setbannerList] = useState([])
        useEffect(  ()=>{
            (async function  f(bannerRequest) {
                    const result = await  bannerRequest()
                    setbannerList(result.data)
                }
            )(bannerRequest)
        },[bannerRequest])
        if(bannerList.length){
            return (
                <div>
                    <MyBreadcrumb list={['首页','首页管理','轮播图管理']}/>
                </div>
            );
        }else {
            return <Empty />
        }

}

export default Banner;