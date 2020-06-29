<template>
	<nav>
		<v-app-bar app color="indigo darken-3" dark clipped-left @click="$router.go(-1)">
			<v-app-bar-nav-icon>
				<v-icon>mdi-arrow-left</v-icon> 
			</v-app-bar-nav-icon>
			
		</v-app-bar>


	</nav>
  
</template>

<script>
// @ is an alias to /src

export default {

	name: 'Navbar',
	data(){
		return{
			
			
		}
	},
	methods: {
		tester(){
		console.log("test")
	}
	}
}
</script>
<style>

</style>

