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
	data(){
		return{
			isLogin: this.$store.getters.getLogin,
		}
	},
	watch:{
        '$store.getters.getLogin'(isLogin){
            this.isLogin = isLogin;
			this.getFiles();
		}
    },
	methods:{
		getFiles(){
			this.$Api.file.get().then((res) => {
				this.$store.dispatch('setFiles', res);
			});
		}
	},
	created(){
		if(this.isLogin){
			this.getFiles();
		}
  	},
	components: {
		navbar
	}
}
</script>
