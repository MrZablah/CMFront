<template>
  <b-container class="mt-3">
      <b-jumbotron v-if="isOnline" header="Content Manager"
          lead="Content Manager for Digi">
        <p>This might help keeping track of content</p>
      </b-jumbotron>
      <b-jumbotron v-if="!isOnline" class="offlineMessage" header="Content manager is currently offline...">
        <p> please try again later.</p>
      </b-jumbotron>
  </b-container>
</template>

<script>
export default {
	data(){
		return {
			isOnline: this.$store.getters.IS_ONLINE
		}
	},
	watch:{
        '$store.getters.IS_ONLINE'(isOnline){
            this.isOnline = isOnline;
        }
    },
}
</script>

<style>
.offlineMessage{
	color: red;
	text-align: center;
}
</style>

