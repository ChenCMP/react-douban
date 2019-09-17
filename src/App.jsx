//项目的根组件
import React from 'react'

//导入路由组件，启动路由
//HashRouter标签在网站中用一个就行
import {HashRouter,Route,Link} from 'react-router-dom'
//导入需要的ant design组件
import { Layout, Menu} from 'antd';
const { Header, Content, Footer } = Layout;
//导入模块化的样式
import styles from './css/app.scss'
//导入相关的路由组件
import HomeContainer from './components/home/HomeContainer.jsx'
import AboutContainer from './components/about/AboutContainer.jsx'
import MovieContainer from './components/movie/MovieContainer.jsx'

export default class App extends React.Component{
	constructor(props){
		super(props)
		this.state={}
	}
	
	componentWillMount(){
	//	console.log(window.location.hash.split('/')[1]){/*当前是哪个页面刷新还是哪个页面*/}
	}
	
	render(){
		return<HashRouter>
		 <Layout className="layout" style={{height:'100%'}}>
		 {/*头部区域*/}
    <Header>
      <div className={styles.logo} />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[window.location.hash.split('/')[1]]} 
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="home">
				 <Link to="/home">首页</Link>
				</Menu.Item>
        <Menu.Item key="movie">
				 <Link to="/movie/in_theaters/1">电影</Link>
				</Menu.Item>
        <Menu.Item key="about">
				 <Link to="/about">关于</Link>
				</Menu.Item>
      </Menu>
    </Header>
		{/*中间内容区域*/}
    <Content style={{ backgroundColor:'#fff',fles:'1'}}>      
     <Route path="/home" component={HomeContainer}></Route>
		 <Route path="/movie" component={MovieContainer}></Route>
		 <Route path="/about" component={AboutContainer}></Route>
    </Content>
		{/*底部区域*/}
    <Footer style={{ textAlign: 'center' }}>CMP ©2019 Created by SenDao</Footer>
  </Layout>
		</HashRouter>
	}
}