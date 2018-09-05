<template>
    <b-navbar toggleable="md" type="dark" variant="dark" fixed="top" :sticky="true">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand to="/">CM</b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav v-if="isLogin">
				<b-nav-item-dropdown text="Files">
					<b-dropdown-item to="/Files" exact>View</b-dropdown-item>
					<b-dropdown-item v-if="isAdmin" to="/Files/Add" exact>Add</b-dropdown-item>
                </b-nav-item-dropdown>
				
				<b-nav-item-dropdown text="Clubs">
					<b-dropdown-item to="/Clubs" exact>View</b-dropdown-item>
					<b-dropdown-item v-if="isAdmin" to="/Clubs/Add" exact>Add</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                
                <!-- <b-nav-form v-if="isLogin">
                    <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
                    <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                </b-nav-form> -->

                <!-- <b-nav-item-dropdown id="drop" text="Lang" right v-if="isLogin">
                    <b-dropdown-item href="#" :class="{'active':lng=='en'}">EN</b-dropdown-item>
                    <b-dropdown-item href="#" :class="{'active':lng=='es'}">ES</b-dropdown-item>
                </b-nav-item-dropdown> -->

                <b-nav-item-dropdown right v-if="isLogin">
                    <template slot="button-content">
                        <em>Admin</em>
                    </template>
                    <b-dropdown-item @click.prevent="logout">Signout</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-btn size="sm" class="my-2 my-sm-0 ml-2" variant="success" @click="login" v-if="!isLogin">Login</b-btn>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
export default {
    data() {
        return {
            isLogin: this.$store.getters.IS_LOGIN,
            isAdmin: this.$store.getters.IS_ADMIN,
            lng: 'en'
        }
    },
    watch:{
        '$store.getters.IS_LOGIN'(isLogin){
            this.isLogin = isLogin;
        },
        '$store.getters.IS_ADMIN'(IsAdmin){
            this.isAdmin = IsAdmin;
        }
    },
    methods:{
        logout(){
            this.$store.dispatch('LOGOUT');
        },
		login(){
			this.$Api.auth.login();
		}
    },
	created(){
		this.$store.dispatch('AUTO_LOGIN');
	}
}
</script>