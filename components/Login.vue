<template>
    <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
        <b-form-group label="Username:" label-for="username">
            <b-form-input id="username"
                        type="email"
                        v-model="form.username"
                        required
                        placeholder="Enter username">
            </b-form-input>
            <b-form-invalid-feedback id="username">
                <!-- This will only be shown if the preceeding input has an invalid state -->
                Enter a valid email.
            </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="Password:" label-for="password">
            <b-form-input id="password"
                        type="password"
                        v-model="form.password"
                        required
                        placeholder="Enter password">
            </b-form-input>
            <b-form-invalid-feedback id="password">
                <!-- This will only be shown if the preceeding input has an invalid state -->
                Enter a valid password.
            </b-form-invalid-feedback>
        </b-form-group>
        
        <div class="float-right">
            <b-button type="reset" variant="danger" class="mr-2" v-if="showReset">Reset</b-button>
            <b-button type="submit" variant="primary">Submit</b-button>
        </div>
    </b-form>
</template>

<script>
export default {
    props: {
        showReset: {
            type: Boolean,
            default: true 
        },
    },
    data() {
        return {
            form: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        onSubmit (evt) {
            this.$store.dispatch('LOGIN', this.form).then((res) => {
                // console.log('success',res);
                this.$root.$emit('bv::hide::modal','modalLogin')
            });
        },
        onReset (evt) {
            this.form.username = '';
            this.form.password = '';
        }
    }
}
</script>

