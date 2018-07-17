<template>
    <b-container>
        <h1>Upload File</h1>
        <b-col>
            <b-progress v-if="showBar" :value="progressBar" variant="info" striped :animated="true" class="mb-2"></b-progress>
        </b-col>
        <b-form v-if="show" @submit="onSubmit" @reset="onReset">
            <b-form-group
                :invalid-feedback="invalidFeedbackFile"
                :state="!$v.file.$error"
                label="Choose a file:"
                label-for="file">
                <b-form-file
                    id="file"
                    :state="!$v.file.$error ? null : false"
                    v-model="$v.file.$model"
                    placeholder="Choose a file..." 
                    accept=".jpeg, .jpg, .png, .gif, .mp3, .mp4"
                    required>
                </b-form-file>
            </b-form-group>
            <b-form-group
                :invalid-feedback="invalidFeedbackFileName"
                :state="!$v.fileName.$error"
                label="Your Name:"
                label-for="fileName">
                <b-form-input
                    :state="!$v.fileName.$error ? null : false"
                    id="fileName"
                    type="text"
                    v-model="$v.fileName.$model"
                    placeholder="Enter file name"
                    required>
                </b-form-input>
            </b-form-group>
            <b-row align-h="end">
                <b-button type="reset" variant="danger">Reset</b-button>
                <b-button type="submit" variant="primary" class="ml-1 mr-3" :disabled="$v.$invalid">Submit</b-button>
            </b-row>
        </b-form>
    </b-container>
</template>

<script>
import { required, maxLength } from 'vuelidate/lib/validators';

// Custom vuelidate
// const uniqueName = (val) => files.filter(file=> file.name == val).length == 0;

export default {
    data(){
        return {
            file: '',
            fileName: '',
            show: true,
            showBar: false,
            progressBar: 0
        }
    },
    validations: {
		fileName: {
			required,
			maxLength: maxLength(25)
		},
		file: {
			required,
            unique: val => {
				if(val === '') 
					return true;

                return new Promise((res, rej) => {
                    var ext = val.name.substring(val.name.lastIndexOf('.') + 1).toLowerCase();
                    if(ext == 'jpg' || ext == 'jpeg' || ext == 'png' || ext == 'gif' || ext == 'mp3' || ext == 'mp4'){
                        res(true);
                    }else{
                        rej(false);
                    }
                });
			}
		}
	},
    methods: {
        onSubmit (evt) {
            evt.preventDefault();
            this.progressBar = 0;
            this.showBar = true;
            this.$Api.uploadFile(this.$axios, this.file, this.fileName, this.updateProgressBarValue).then((res) => {
                this.progressBar = 100;
                this.showBar = false;
                this.$store.dispatch('addNewFile', res);
                this.$snotify.success('File Upload and save successfully.', 'Succes!');
                // console.log('Succes!!', res);
            }).catch((err) => {
                this.progressBar = 100;
                this.showBar = false;
                this.$snotify.error(err.response.data, 'Error!');
                // console.log('We got an error', err.response);
            });
        },
        onReset (evt) {
            evt.preventDefault();
            /* Reset our form values */
            this.file = '';
            this.fileName = '';
            /* Trick to reset/clear native browser form validation state */
            this.show = false;
            this.$nextTick(() => { this.show = true });
        },
        updateProgressBarValue(val){
            this.progressBar = val;
        }
    },
    computed: {
        invalidFeedbackFileName () {
            if(!this.$v.fileName.maxLength)
                return "File name can't be larger than 25 characters";

            // if(!this.$v.fileName.unique)
            //     return "File name can't be the same as another file name";

            return "Name is a required field and has to be unique!";
        },
        invalidFeedbackFile(){
            if(!this.$v.file.unique)
                return "File Extension not valid. Valid extencions: JPG, JPEG, GIF, PNG, MP3 and MP4";

            return "Invalid File";
        }
    },
}
</script>

