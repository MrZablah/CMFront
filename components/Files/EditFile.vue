<template>
    <!-- @reset.prevent="onReset" -->
    <b-form @submit.prevent="onSubmit" v-if="show">
      <b-form-group 
            :invalid-feedback="invalidFeedbackName"
            :state="!$v.form.name.$error"
            id="fileNameGroup"
            label="Name:"
            label-for="name">
        <b-form-input id="name"
            type="text"
            :state="!$v.form.name.$error ? null : false"
            v-model="$v.form.name.$model">
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
            v-model="$v.form.description.$model">
        </b-form-input>
      </b-form-group>
      <b-form-group 
            :invalid-feedback="invalidFeedbackTag"
            :state="!$v.tag.$error"
            id="fileTagsGroup"
            label="Tags:"
            label-for="tag">
        <b-badge class="custom_badge select_badge" 
            variant="warning" 
            v-for="tag in file.tags" 
            :key="tag.id" 
            @click.prevent="deleteTag(tag.name)">
                {{tag.name}}
            </b-badge>
        <b-input-group>
            <b-form-input id="tag"
                type="text"
                :state="!$v.tag.$error ? null : false"
                v-model="$v.tag.$model">
            </b-form-input>
            <b-input-group-append>
                <b-btn @click="addTag()">Add</b-btn>
            </b-input-group-append>
        </b-input-group>
        <b-tooltip target="tag" title="You can delete tags by click on them!"></b-tooltip>
      </b-form-group>
      <b-form-group 
            :invalid-feedback="invalidFeedbackCompanie"
            :state="!$v.companie.$error"
            id="fileCompaniesGroup"
            label="Companies:"
            label-for="companie">
        <b-badge class="custom_badge select_badge" 
            variant="dark" 
            v-for="companie in file.companies" 
            :key="companie.id" 
            @click.prevent="deleteCompanie(companie.name)">
                {{companie.name}}
            </b-badge>
        <b-input-group>
            <b-form-input id="companie"
                type="text"
                :state="!$v.companie.$error ? null : false"
                v-model="$v.companie.$model">
            </b-form-input>
             <b-input-group-append>
                <b-btn @click="addCompanie()">Add</b-btn>
            </b-input-group-append>
        </b-input-group>
        <b-tooltip target="companie" title="You can delete companies by click on them!"></b-tooltip>
      </b-form-group>
      <b-button type="submit" variant="primary" class="float-right mt-1">Submit</b-button>
      <!-- <b-button type="reset" variant="danger" class="float-right mr-1">Reset</b-button> -->
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
                name: null,
                description: this.file.description,
                tags: this.file.tags,
                companies: this.file.companies,
                clubs: this.file.clubs,
            },
            tag: "",
            companie: "",
            show: true
        }
    },
    methods: {
        onSubmit () {
            if(this.$Utils.isEmptyOrSpaces(this.form.name))
                delete this.form.name;
            
            console.log(this.form);
            this.$snotify.async('Editing File...', () => new Promise((resolve, reject) => {
                this.$Api.file.edit(this.$axios, this.form, this.file.id).then(res => {
                    console.log(res);
                    return resolve({
                        title: 'SUCCESS!',
                        body: 'File edited!',
                        config: {
                            closeOnClick: true
                        }
                    });
                }).catch((err) => {
                    reject({
                        title: 'ERROR!',
                        body: "Can't edit file.",
                        config: {
                            closeOnClick: true
                        }
                    })
                });
            }));
        },
        // onReset () {
        //     /* Reset our form values */
        //     this.form.name = '';
        //     /* Trick to reset/clear native browser form validation state */
        //     this.show = false;
        //     this.$nextTick(() => { this.show = true, this.$v.$reset() });
        // },
        deleteTag(tagName){
            if(this.checkTagExist(tagName))
                return;

            this.file.tags = this.file.tags.filter(t => t.name !== tagName);
            this.form.tags = this.file.tags;
            return;
        },
        addTag(){
            if(!this.checkTagExist(this.tag))
                return;

            this.file.tags.push({name: this.tag});
            return;
        },
        checkTagExist(tagName){
            var tagExist = this.file.tags.find(t => t.name.toLowerCase() == tagName.toLowerCase());
            if(!tagExist)
                return true;
            
            return false;
        },
        deleteCompanie(companieName){
            if(this.checkCompanieExist(companieName))
                return;

            this.file.companies = this.file.companies.filter(c => c.name !== companieName);
            this.form.companies = this.file.companies;
            return;
        },
        addCompanie(){
            if(!this.checkCompanieExist(this.companie))
                return;

            this.file.companies.push({name: this.companie});
            return;
        },
        checkCompanieExist(companieName){
            var companieExist = this.file.companies.find(c => c.name.toLowerCase() == companieName.toLowerCase());
            if(!companieExist)
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
        },
        companie:{
            maxLength: maxLength(15),
            unique(value){
                if (value === '') 
                    return true;

                return new Promise((res, rej) => {
                    if(this.checkCompanieExist(value))
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

            return "Tag field error!";
        },
        invalidFeedbackCompanie () {
            if(!this.$v.companie.maxLength)
                return "Companie can't be larger than 15 characters";

            if(!this.$v.companie.unique)
                return "Companie can't be the same as another companie";

            return "Companie field error!";
        }
    }
}
</script>

<style lang="scss" scoped>
    .select_badge{
        cursor: pointer;
    }
</style>


