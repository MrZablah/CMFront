<template>
    <div>
		<Navbar/>
        <nuxt/>
    </div>
</template>

<script>
import Navbar from '~/components/Navbar';

export default {
	components: {
		Navbar
	},
	created(){
    	this.$Api.getFiles(this.$axios).then((res) => {
			this.$store.dispatch('setFiles', res);
		});
  	}
}
</script>
