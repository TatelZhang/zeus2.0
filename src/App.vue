<template>
	<div id="app">
		<router-view/>
	</div>
</template>
<script>
export default {
	name: 'app'
}
</script>
<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		height: 100%;
		font-size: 14px;
	}
	.margin-10{
		margin-left: 10px;
		margin-right: 10px;
	}
	.margin-left-10 {
		margin-left: 10px;
	}
	.margin-right-10 {
		margin-right: 10px;
	}
	input[type=number]{
    	-moz-appearance:textfield;
	}
	input[type=number]::-webkit-inner-spin-button,
	input[type=number]::-webkit-outer-spin-button{
		-webkit-appearance: none;
		margin: 0;
	}
</style>
