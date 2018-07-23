<template>
    <div>
		<Navbar/>
        <nuxt/>
		<vue-snotify/>
    </div>
</template>

<script>
import Navbar from '~/components/Navbar';

export default {
	components: {
		Navbar
	},
	created(){
    	this.$Api.file.get(this.$axios).then((res) => {
			this.$store.dispatch('setFiles', res);
		});
  	}
}
</script>
