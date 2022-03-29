<template>
	<div class="container">
		<div>
			<img src="../../assets/logo.png" alt="" />
			<h1 class="title">About</h1>
			<div class="links">
				<a href="https://vuejs.org/" target="_blank" rel="noopener noreferrer" class="button--green"> Documentation </a>
			</div>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
	margin: 0 auto;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
}

.title {
	font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
		sans-serif;
	display: block;
	font-weight: 300;
	font-size: 100px;
	color: #35495e;
	letter-spacing: 1px;
}

.subtitle {
	font-weight: 300;
	font-size: 42px;
	color: #526488;
	word-spacing: 5px;
	padding-bottom: 15px;
}

.links {
	padding-top: 15px;
}
</style>
