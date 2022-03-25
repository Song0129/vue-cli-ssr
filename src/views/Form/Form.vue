<template>
	<div>
		myForm12
		<a-button @click="getData">点击获取数据</a-button>
		<div style="height: 2000px; width: 100%">
			<a-table :columns="columns" :data-source="listData" :rowKey="record => record.id">
				<a slot="name" slot-scope="text">{{ text }}</a>
				<span slot="customTitle"><a-icon type="smile-o" /> Name</span>
			</a-table>

			<a-table :columns="columnsOne" :data-source="dataOne">
				<a slot="name" slot-scope="text">{{ text }}</a>
				<span slot="customTitle"><a-icon type="smile-o" /> Name</span>
				<span slot="tags" slot-scope="tags">
					<a-tag v-for="tag in tags" :key="tag" :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
						{{ tag.toUpperCase() }}
					</a-tag>
				</span>
				<span slot="action" slot-scope="text, record">
					<a>Invite 一 {{ record.name }}</a>
					<a-divider type="vertical" />
					<a>Delete</a>
					<a-divider type="vertical" />
					<a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>
				</span>
			</a-table>
		</div>
	</div>
</template>

<script>
const columnsOne = [
	{
		dataIndex: "name",
		key: "name",
		slots: { title: "customTitle" },
		scopedSlots: { customRender: "name" },
	},
	{
		title: "Age",
		dataIndex: "age",
		key: "age",
	},
	{
		title: "Address",
		dataIndex: "address",
		key: "address",
	},
	{
		title: "Tags",
		key: "tags",
		dataIndex: "tags",
		scopedSlots: { customRender: "tags" },
	},
	{
		title: "Action",
		key: "action",
		scopedSlots: { customRender: "action" },
	},
];

const dataOne = [
	{
		key: "1",
		name: "John Brown",
		age: 32,
		address: "New York No. 1 Lake Park",
		tags: ["nice", "developer"],
	},
	{
		key: "2",
		name: "Jim Green",
		age: 42,
		address: "London No. 1 Lake Park",
		tags: ["loser"],
	},
	{
		key: "3",
		name: "Joe Black",
		age: 32,
		address: "Sidney No. 1 Lake Park",
		tags: ["cool", "teacher"],
	},
];
export default {
	name: "Form",
	data() {
		return {
			dataOne,
			columnsOne,
			columns: [
				{
					dataIndex: "id",
					key: "id",
					slots: { title: "customTitle" },
					scopedSlots: { customRender: "id" },
				},
				{
					title: "image",
					dataIndex: "image",
					key: "image",
				},
				{
					title: "link",
					dataIndex: "link",
					key: "link",
				},
			],
			listData: null,
		};
	},
	created() {
		this.getData();
	},
	mounted() {},
	computed: {},
	methods: {
		async getData() {
			let res = await this.$axios.get("https://song.api.only0129.top/slides");
			console.log("res", res);

			this.listData = res.data;
		},
	},
};
</script>

<style scoped lang="less">
* {
	color: @c1;
}
</style>
