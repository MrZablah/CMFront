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
			isLogin: this.$store.getters.IS_LOGIN,
		}
	},
	watch:{
        '$store.getters.IS_LOGIN'(isLogin){
            this.isLogin = isLogin;
			this.getData();
		}
    },
	methods:{
		getData(){
			this.$Api.file.get().then((res) => {
				this.$store.dispatch('SET_FILES', res);
			});
			this.$Api.club.get().then((res) => {
				this.$store.dispatch('SET_CLUBS', res);
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
