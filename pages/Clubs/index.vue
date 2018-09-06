<template>
    <b-container fluid>
        <b-row class="clubs__container custom_view_container">
            <ClubsTable :Clubs="loadedClubs()"/>
        </b-row>
    </b-container>
</template>

<script>
import ClubsTable from "~/components/Clubs/ClubsTable";
export default {
	methods: {
        loadedClubs(){
            return this.$store.getters.GET_CLUBS;
        }
    },
    components: {
		ClubsTable
    }
}
</script>

<style lang="scss" scoped>
.clubs__container{
	margin-top: 10px;
}
</style>

