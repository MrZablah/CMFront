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
			this.getData();
		}
    },
	methods:{
		getData(){
			this.$Api.file.get().then((res) => {
				this.$store.dispatch('setFiles', res);
			});
			this.$Api.club.get().then((res) => {
				this.$store.dispatch('setClubs', res);
			});
		}
	},
	created(){
		if(this.isLogin){
			this.getData();
		}
  	},
	components: {
		navbar
	}
}
</script>
