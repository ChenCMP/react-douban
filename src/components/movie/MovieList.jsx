import React from 'react'

//导入ui组件（加载动画）Pagination:分页组件
import { Spin, Alert,Pagination } from 'antd';

//导入fetch-jsonp
import fetchJSONP from 'fetch-jsonp'

//导入电影框
import MovieItem from './MovieItem.jsx'

export default class MovieList extends React.Component{
	constructor(props){
		super(props)
		this.state={
			movies:[],//电影列表
			nowPage:parseInt(props.match.params.page)||1,//当前展示第几页的数据
			pageSize:12,//每页显示多少条数据
			total: 0,//当前电影分类下总共有多少条数据
			isloading:true,//true表示正在加载数据
      movieType:props.match.params.type,//保存一下要获取的电影类型
		}
	}
	
	componentWillMount(){
		/*setTimeout(()=>{
			this.setState({
				isloading:false //当数据截取回来，把isloading加载设置为false，加载完成
			})
		},1000)*/
		this.loadMovieListByTypeAndPage()
	}
	
	//组件将要接受新的属性
	componentWillReceiveProps(nextProps){
		//console.log(nextProps.match);
		//每当地址栏变化的时候，重置state中的参数项，重置完成之后，可以重新发起数据请求
		this.setState({
			isloading:true,//又要重新加载电影数据
			nowPage:parseInt(nextProps.match.params.page)||1,//要获取第几页数据
			movieType:nextProps.match.params.type,//电影类型
		},function(){
			this.loadMovieListByTypeAndPage()
		})
	}

	render(){
		return<div>
		 {this.renderList()} 
		</div>
	}
	
	//根据电影类型和页码，获取电影数据
	loadMovieListByTypeAndPage=()=>{
		//注意：默认的window.fetch受到跨域限制（http和localhost地址不同），无法使用
		  //这时候我们使用第三方包fetch-jsonp来发生jsonp请求，它的用法和浏览器内置的fetch完全兼容
		/*fetch('https://api.douban.com/v2/movie/in_theaters')
		 .then(response=>response.json())
		 .then(data=>{
			 console.log(data);
		 })*/
		 
		 //开始获取数据的索引
		/* const start =this.state.pageSize*(this.state.nowPage-1)
		 //const url='http://api.douban.com/v2/movie/${this.state.movieType}?start=${start}&count=${this.state.pageSize})?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=10'
		 //const url='http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=10'
		 const url='http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=${start}&count=${this.state.pageSize}'
		 fetchJSONP(url)
		  .then(response=>response.json())
			.then(data=>{
				console.log(data);
				this.setState({
					isloading:false,//将loading隐藏
					movies:data.subjects,//为电影列表重新赋值
					total:data.total//把总条数保存到state上
				})
			})*/
			
			const data=require('../test-data/'+this.state.movieType+'.json')
			setTimeout(()=>{
				this.setState({
					isloading:false,//将loading隐藏
					movies:data.subjects,//为电影列表重新赋值
					total:data.total//把总条数保存到state上
				})
			},1000)
	}
	
	
	//渲染电影列表的方法
	renderList=()=>{
		if(this.state.isloading){//正在加载中
			return<Spin tip="Loading...">
        <Alert
         message="正在请求电影列表"
         description="精彩内容，马上呈现"
         type="info"
        />
      </Spin>
		}else{//加载完成
		  return<div>
			  <div style={{display:'flex',flexWrap:'wrap'}}>
			   {this.state.movies.map(item=>{
			  	 return<MovieItem {...item} key={item.id} history={this.props.history}></MovieItem>
			   })}
			  </div>
				{/*分页*/}
			  <Pagination defaultCurrent={this.state.nowPage} pageSize={this.state.pageSize} 
				 total={this.state.total} onChange={this.pageChanged} />
			</div>
			
		}
	}
	
	//当页码改变的时候，加载一页新的数据
	pageChanged=(page)=>{
		//由于我们手动使用BOM对象（location—），实现了跳转，这样不好，最好使用路由的方法，进行编程式导航
		//window.location.href='/#/movie/'+this.state.movieType+'/'+page  
		//使用react-router-dom实现编程式导航
		
	  this.props.history.push('/movie/'+this.state.movieType+'/'+page)
	}
}