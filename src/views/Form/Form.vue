<template>
	<div>
		myForm
		<a-button @click="getData">点击获取数据</a-button>
		<div style="height: 2000px; width: 300px"></div>
	</div>
</template>

<script>
export default {
	name: 'Form',
	data() {
		return {};
	},
	created() {},
	mounted() {},
	computed: {},
	methods: {
		getData() {
			this.$axios.get('http://localhost:8008/api1/students');
		},
	},
};
</script>

<style scoped lang="less">
* {
	color: @c1;
}
</style>
