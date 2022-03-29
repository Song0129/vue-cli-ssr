<template>
	<div class="leftNav">
		<div class="logo">
			<a href="/" class="router-link-active">
				<h1 v-if="!collapsed">
					<svg
						t="1597989581210"
						class="icon"
						viewBox="0 0 1024 1024"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						p-id="4448"
						width="30"
						height="30"
					>
						<path
							d="M218.112 64h583.296L1024 384.768 509.76 960 0 384.768 218.112 64z m286.08 504.192l-252.48-287.36-86.72 91.968 339.2 366.464 329.28-366.464-77.184-91.968-252.096 287.36z"
							fill="#fff"
							p-id="4449"
						></path>
					</svg>
					<span class="title" :title="title">{{ title }}</span>
				</h1>
				<h1 :class="{ small: collapsed }" v-if="collapsed">
					<svg
						t="1597989581210"
						class="icon"
						viewBox="0 0 1024 1024"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						p-id="4448"
						width="30"
						height="30"
					>
						<path
							d="M218.112 64h583.296L1024 384.768 509.76 960 0 384.768 218.112 64z m286.08 504.192l-252.48-287.36-86.72 91.968 339.2 366.464 329.28-366.464-77.184-91.968-252.096 287.36z"
							fill="#fff"
							p-id="4449"
						></path>
					</svg>
				</h1>
			</a>
		</div>
		<a-menu :default-selected-keys="['1']" :default-open-keys="['sub1']" mode="inline" theme="dark" :inline-collapsed="collapsed">
			<template v-for="menu in menuList">
				<a-menu-item v-if="!menu.children.length" :key="menu.id" @click="menuClick(menu)">
					<a-icon :type="menu.icon" />
					<span>{{ menu.name }}</span>
				</a-menu-item>
				<a-sub-menu v-else :key="menu.id">
					<span slot="title"
						><a-icon type="mail" /><span>{{ menu.name }}</span></span
					>
					<a-menu-item v-for="inMenu in menu.children" :key="inMenu.id" @click="menuClick(menu)">
						<a-icon :type="menu.icon" />
						<span>{{ inMenu.name }}</span>
					</a-menu-item>
				</a-sub-menu>
			</template>
		</a-menu>
	</div>
</template>

<script>
export default {
	name: "SideBar",
	components: {},
	props: {
		collapsed: {
			typeof: Boolean,
			default: true,
		},
	},
	data() {
		return {
			vm: this,
			logo: require("../../assets/images/process-white.png"),
			title: "Vue-Study",
			menuList: [
				{ id: 0, name: "Form", url: "/form", icon: "smile", children: [] },
				{
					id: 1,
					name: "About",
					url: "/about",
					icon: "smile",
					children: [{ id: 1, name: "About", url: "/about", icon: "smile" }],
				},
				// {id: 10, name: "myDrag", url: "/myDrag", icon: "smile", children: []},
				// {id: 2, name: "jQueryDrag", url: "/jQueryDrag", icon: "star", children: []},
				// {id: 3, name: "DND", url: "/dnd", icon: "switcher", children: []},
				// {id: 4, name: "DND-demo", url: "/dnd-demo", icon: "block", children: []},
				// {id: 6, name: "PwdTest", url: "/pwdTest", icon: "number", children: []},
				// {id: 7, name: "Upload", url: "/upload", icon: "user", children: []},
				// {id: 8, name: "scroll", url: "/scroll", icon: "user", children: []},
				// {id: 9, name: "slotTest", url: "/slotTest", icon: "user", children: []},
			],
		};
	},
	created() {},
	mounted() {
		document.addEventListener("visibilitychange", function () {
			// console.log( document.visibilityState );
			// console.log(document.hidden);
		});
	},
	computed: {},
	methods: {
		// 显示隐藏菜单
		toggleCollapsed() {
			this.collapsed = !this.collapsed;
		},

		// 菜单点击
		menuClick(item) {
			let route = { path: item.url };

			if (this.$route.path !== item.url) {
				this.$router.push(route).catch(() => {});
			}
		},
	},
};
</script>

<style scoped lang="less">
.leftNav {
	height: 100%;

	.logo {
		height: 88px;
		display: flex;
		align-items: center;
		justify-content: center;

		h1 {
			color: #fff;
			font-size: 26px;
			display: flex;
			align-items: center;
			justify-content: center;

			.title {
				display: inline-block;
				width: 160px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.icon {
				margin-right: 10px;
			}
		}

		h1.small {
			color: #00ccff;

			.icon {
				margin-right: 0;
			}
		}
	}
}
</style>
