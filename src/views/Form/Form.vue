<template>
	<div>
		myForm
		<a-button @click="getData">点击获取数据</a-button>
		<div style="height: 2000px; width: 300px">
			<a-table :columns="columns" :data-source="listData" :rowKey="record => record.id"> </a-table>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Form',
	data() {
		return {
			columns: [
				{
					dataIndex: 'id',
					key: 'id',
					slots: { title: 'customTitle' },
					scopedSlots: { customRender: 'name' },
				},
				{
					title: 'image',
					dataIndex: 'image',
					key: 'image',
				},
				{
					title: 'link',
					dataIndex: 'link',
					key: 'link',
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
			let res = await this.$axios.get('https://song-api.only0129.top/slides');
			console.log('res', res);

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
