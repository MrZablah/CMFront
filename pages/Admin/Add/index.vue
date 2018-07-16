<template>
    <b-container>
        <h1>Upload File</h1>
        <b-form @submit="onSubmit" @reset="onReset">
            <b-form-group
                label="Upload a file:"
                label-for="file">
                <b-form-file
                    id="file"
                    v-model="file" 
                    :state="Boolean(file)" 
                    placeholder="Choose a file..." 
                    accept=".jpeg, .jpg, .png, .gif, .mp3, mp4" 
                    required>
                </b-form-file>
            </b-form-group>
            <b-form-group
                label="Your Name:"
                label-for="fileName">
                <b-form-input 
                    id="fileName"
                    type="text"
                    v-model="fileName"
                    required
                    placeholder="Enter name">
                </b-form-input>
            </b-form-group>
            <b-row align-h="end">
                <b-button type="reset" variant="danger">Reset</b-button>
                <b-button type="submit" variant="primary" class="ml-1 mr-3">Submit</b-button>
            </b-row>
        </b-form>
    </b-container>
</template>

<script>
export default {
    data(){
        return {
            file: null,
            fileName: null,
            progressBar: 0
        }
    },
    methods: {
        onSubmit (evt) {
            evt.preventDefault();
            alert(JSON.stringify(this.form));
        },
        onReset (evt) {
            evt.preventDefault();
            /* Reset our form values */
            this.form.email = '';
            this.form.name = '';
            this.form.food = null;
            this.form.checked = [];
            /* Trick to reset/clear native browser form validation state */
            this.show = false;
            this.$nextTick(() => { this.show = true });
        }
    }
}
</script>

