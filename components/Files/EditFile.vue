<template>
    <b-form @submit.prevent="onSubmit" @reset.prevent="onReset" v-if="show">
      <b-form-group 
            :invalid-feedback="invalidFeedbackName"
            :state="!$v.form.name.$error"
            id="fileNameGroup"
            label="Name:"
            label-for="name">
        <b-form-input id="name"
            type="text"
            :state="!$v.form.name.$error ? null : false"
            v-model="$v.form.name.$model"
            :placeholder="file.name">
        </b-form-input>
      </b-form-group>
      <b-form-group 
            :invalid-feedback="invalidFeedbackDescription"
            :state="!$v.form.description.$error"
            id="fileDescriptionGroup"
            label="Description:"
            label-for="description">
        <b-form-input id="description"
            type="text"
            :state="!$v.form.description.$error ? null : false"
            v-model="$v.form.description.$model"
            :placeholder="file.description">
        </b-form-input>
      </b-form-group>
      <b-form-group 
            :invalid-feedback="invalidFeedbackTag"
            :state="!$v.tag.$error"
            id="fileTagsGroup"
            label="Tag:"
            label-for="tag">
        <b-badge class="custom_badge" variant="secondary" v-for="tag in file.tags" :key="tag.id">{{tag.name}}</b-badge>
        <b-form-input id="tag"
            type="text"
            :state="!$v.tag.$error ? null : false"
            @keyup.enter.native="addTag()"
            v-model="$v.tag.$model">
        </b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary" class="float-right">Submit</b-button>
      <b-button type="reset" variant="danger" class="float-right mr-1">Reset</b-button>
    </b-form>
</template>

<script>
import { required, maxLength } from 'vuelidate/lib/validators';
export default {
    props: {
        file: {
            type: Object,
            required: true
        },
    },
    data () {
        return {
            form: {
                name: '',
                description: '',
                tags: []
            },
            tag: '',
            show: true
        }
    },
    methods: {
        onSubmit () {
            console.log(this.form);
        },
        onReset () {
            /* Reset our form values */
            this.form.name = '';
            /* Trick to reset/clear native browser form validation state */
            this.show = false;
            this.$nextTick(() => { this.show = true, this.$v.$reset() });
        },
        addTag(){
            if(!this.checkTagExist(this.tag))
                return;

            this.file.tags.push({name: this.tag});
            this.form.tags.push({name: this.tag});
            // console.log(this.form);
            return;
        },
        checkTagExist(tagName){
            var tagExist = this.file.tags.find(t => t.name == tagName);
            if(!tagExist)
                return true;
            
            return false;
        }
    },
    validations: {
		form:{
            name:{
                maxLength: maxLength(25),
                unique(value) {
                    if (value === '') 
                        return true;

                    return new Promise((res, rej) => {
                        var fileExist = this.$store.getters.existFileByName(value);
                        // console.log(fileExist);
                        if (!fileExist) {
                            res(true);
                        }
                        rej(false);
                    });
                }
            },
            description:{
                maxLength: maxLength(100)
            },
        },
        tag:{
            maxLength: maxLength(10),
            unique(value){
                if (value === '') 
                    return true;

                return new Promise((res, rej) => {
                    if(this.checkTagExist(value))
                        return res(true);
                    return rej(false);
                });
            }
        }
	},
    computed: {
        invalidFeedbackName () {
            if(!this.$v.form.name.maxLength)
                return "File name can't be larger than 25 characters";

            if(!this.$v.form.name.unique)
                return "File name can't be the same as another file name";

            return "Name is a required field!";
        },
        invalidFeedbackDescription () {
            if(!this.$v.form.description.maxLength)
                return "File description can't be larger than 100 characters";

            return "Description is a required field!";
        },
        invalidFeedbackTag () {
            if(!this.$v.tag.maxLength)
                return "Tag can't be larger than 10 characters";

            if(!this.$v.tag.unique)
                return "Tag can't be the same as another tag";

            return "Tag is a required field!";
        }
    }
}
</script>

