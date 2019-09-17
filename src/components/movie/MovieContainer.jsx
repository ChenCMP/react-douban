import React from 'react'
//布局相关的组件
import { Layout, Menu, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
//导入路由组件，启动路由
import {Route,Link,Switch} from 'react-router-dom'
//导入右侧需要的组件
import MovieList from './MovieList.jsx'

import MovieDetail from './MovieDetail.jsx'


export default class MovieContainer extends React.Component{
	constructor(props){
		super(props)
		this.state={}
	}
	render(){
		return <Layout style={{height:'100%'}}>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={[window.location.hash.split('/')[2]]}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="in_theaters/">{/*路由的切换*/}
					 <Link to="/movie/in_theaters/1">正在热映</Link>
					</Menu.Item>
          <Menu.Item key="coming_soon">
					 <Link to="/movie/coming_soon/1">即将上映</Link>
					</Menu.Item>
          <Menu.Item key="top250">
					 <Link to="/movie/top250/1">Top250</Link>
					</Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ paddingLeft: '1px' }}>
        <Content
          style={{
            background: '#fff',
            padding: 10,
            margin: 0,
            minHeight: 280,
          }}
        >
				{/*注意:哪怕为路由启用了exact精确匹配,也会从上到下把所以路由规则匹配一遍*/}
				{/*使用路由中的Switch组件,能够指定,如果前面的路由规则优先匹配到了,则放弃匹配后续的路由规则*/}
				 <Switch>
				   <Route exact path="/movie/detail/:id" component={MovieDetail}></Route>
				   <Route exact path="/movie/:type/:page" component={MovieList}></Route>  
				 </Switch>
				</Content>
      </Layout>
    </Layout>
	}
} 