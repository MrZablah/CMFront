<template>
    <b-navbar toggleable="md" type="dark" variant="dark">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand href="/">CM</b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav v-if="isLogin">
                <b-nav-item href="#">Link</b-nav-item>
                <b-nav-item href="#" disabled>Disabled</b-nav-item>
            </b-navbar-nav>
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                
                <b-nav-form v-if="isLogin">
                    <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
                    <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                </b-nav-form>

                <b-nav-item-dropdown id="drop" text="Lang" right v-if="isLogin">
                    <b-dropdown-item href="#">EN</b-dropdown-item>
                    <b-dropdown-item href="#">ES</b-dropdown-item>
                </b-nav-item-dropdown>

                <b-nav-item-dropdown right v-if="isLogin">
                    <!-- Using button-content slot -->
                    <template slot="button-content">
                    <em>User</em>
                    </template>
                    <b-dropdown-item href="#">Profile</b-dropdown-item>
                    <b-dropdown-item href="#">Signout</b-dropdown-item>
                </b-nav-item-dropdown>

                <b-btn size="sm" class="my-2 my-sm-0 ml-2" variant="success" v-b-modal.modal-center v-if="!isLogin">Login</b-btn>
                <!-- Modal Component -->
                <b-modal id="modal-center" centered title="Login" :hide-footer="true">
                    <Login :showReset="false"/>
                </b-modal>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
import Login from '~/components/Login';
export default {
    data() {
        return {
            isLogin: false
        }
    },
    methods:{
        
    },
    components: {
        Login,
    }
}
</script>