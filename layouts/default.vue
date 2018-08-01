<template>
    <div>
		<navbar/>
        <nuxt/>
		<vue-snotify/>
    </div>
</template>

<script>
import navbar from '~/components/Navbar';

export default {
	components: {
		navbar
	},
	created(){
    	this.$Api.file.get(this.$axios).then((res) => {
			this.$store.dispatch('setFiles', res);
		});
  	}
}
</script>
