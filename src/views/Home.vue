<template>
	<a-layout id="components-layout-demo-custom-trigger" class="screen-xxl ant-layout-has-sider">
		<a-layout-sider v-model="collapsed" width="256px" collapsible>
			<sideBar v-if="hasSideBar" :collapsed="collapsed"></sideBar>
		</a-layout-sider>
		<a-layout>
			<a-layout-header style="background: #fff; padding: 0; display: flex; align-items: center">
				<topBar>
					<div slot="menu-btn">
						<a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
							<a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
						</a-button>
					</div>
				</topBar>
			</a-layout-header>
			<a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px', overflowY: 'scroll' }">
				<router-view></router-view>
			</a-layout-content>
		</a-layout>
	</a-layout>
</template>

<script>
import TopBar from '../components/common/TopBar';
import SideBar from '../components/common/SideBar';

export default {
	name: 'Home',
	components: {
		TopBar,
		SideBar,
	},
	data() {
		return {
			hasSideBar: true, //true有  false无 根据router中meta  sidebar属性
			collapsed: false,
		};
	},
	beforeRouteEnter(to, from, next) {
		// 注意，在路由进入之前，组件实例还未渲染，所以无法获取this实例，只能通过vm来访问组件实例
		next(vm => {
			vm.hasSideBar = to.meta.sideBar;
		});
	},
	watch: {
		$route(value) {
			// console.log(value)
			this.hasSideBar = value.meta.sideBar ? true : false;
		},
	},
	mounted() {},
	methods: {
		// 显示隐藏菜单
		toggleCollapsed() {
			this.collapsed = !this.collapsed;
		},
	},
};
</script>

<style scoped lang="less">
.ant-layout /deep/ .ant-layout-header {
	height: 88px;
}

.ant-layout {
	height: 100vh;
	// flex-direction: row;
}

#components-layout-demo-custom-trigger .trigger {
	font-size: 18px;
	line-height: 64px;
	padding: 0 24px;
	cursor: pointer;
	transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
	color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
	height: 32px;
	background: rgba(255, 255, 255, 0.2);
	margin: 16px;
}
</style>
