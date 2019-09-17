import React from 'react'
//导入返回按钮组件
import { Button, Icon ,Spin, Alert} from 'antd';

import fetchJSONP from 'fetch-jsonp'

export default class MovieDetail extends React.Component{
	constructor(props){
		super(props)
		this.state={
			info:{},//电影信息对象
			isloading:true//正在加载中
		}
	}
	//电影列表详细信息链接：https://douban.uieee.com/v2/movie/subject/id
	componentWillMount(){
		fetchJSONP(' https://douban.uieee.com/v2/movie/subject/'+
		 this.props.match.params.id)
		  .then(res=>res.json())
			.then(data=>{
				this.setState({
					info:data,
					isloading:false
				})
			})
		
	}
	
	render(){
		return<div> 
		 <Button type="primary" onClick={this.goBack}>
        <Icon type="left" />
        返回电影列表页面
     </Button>
		{this.renderInfo()}
		</div>
	}
	//实现返回按钮功能
	goBack=()=>{
		this.props.history.go(-1)
	}
	
	renderInfo=()=>{
		if(this.state.isloading){
			return<Spin tip="Loading...">
        <Alert
         message="正在请求电影数据"
         description="精彩内容，马上呈现"
         type="info"
        />
      </Spin>
		}else{
			return<div>
			  <div style={{textAlign:'center'}}>
				 <h1 style={{fontWeight:'bold'}}>{this.state.info.title}</h1>
         <img src={this.state.info.images.large} alt="" />
				</div>
			  <p style={{textIndent:'2em',lineHeight:2}}>{this.state.info.summary}</p>			
			</div>
			
		}
	}
} 