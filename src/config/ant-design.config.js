import { DatePicker, Select, Pagination, Table, Button, Input, Menu, Icon, Layout, Tag, Divider } from 'ant-design-vue'; //按需引入ant-design-vue

const components = {
	DatePicker,
	Select,
	Pagination,
	Table,
	Button,
	Input,
	Menu,
	Icon,
	Layout,
	Tag,
	Divider,
};

const ComponentsHandler = {
	install(Vue) {
		Object.keys(components).forEach(key => Vue.use(components[key]));
	},
};

export default ComponentsHandler;
