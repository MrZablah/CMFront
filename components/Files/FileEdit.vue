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
            :placeholder="file.name"
            :state="!$v.form.name.$error ? null : false"
            v-model="$v.form.name.$model">
        </b-form-input>
        <b-tooltip target="name" title="if leave blank name will not change."></b-tooltip>
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
            :invalid-feedback="invalidFeedback('tag')"
            :state="!$v.tag.$error"
            id="fileTagsGroup"
            label="Tags:"
            label-for="tag">
        <b-badge class="custom_badge select_badge" 
            variant="warning" 
            v-for="tag in file.tags" 
            :key="tag.id" 
            @click.prevent="deleteIndex(tag.name, 'tags')">
                {{tag.name}} <icons class="deleteIcon" :icon="['fas', 'times']"/>
            </b-badge>
        <b-input-group>
            <b-form-input id="tag"
                type="text"
                :state="!$v.tag.$error ? null : false"
                v-model="$v.tag.$model">
            </b-form-input>
            <b-input-group-append>
                <b-btn @click="addIndex('tag', 'tags')">Add</b-btn>
            </b-input-group-append>
        </b-input-group>
        <b-tooltip target="tag" title="You can delete tags by click on them!"></b-tooltip>
      </b-form-group>
      <b-form-group 
            :invalid-feedback="invalidFeedback('companie')"
            :state="!$v.companie.$error"
            id="fileCompaniesGroup"
            label="Companies:"
            label-for="companie">
        <b-badge class="custom_badge select_badge" 
            variant="dark" 
            v-for="companie in file.companies" 
            :key="companie.id" 
            @click.prevent="deleteIndex(companie.name, 'companies')">
                {{companie.name}} <icons class="deleteIcon" :icon="['fas', 'times']"/>
            </b-badge>
        <b-input-group>
            <b-form-input id="companie"
                type="text"
                :state="!$v.companie.$error ? null : false"
                v-model="$v.companie.$model">
            </b-form-input>
             <b-input-group-append>
                <b-btn @click="addIndex('companie', 'companies')">Add</b-btn>
            </b-input-group-append>
        </b-input-group>
        <b-tooltip target="companie" title="You can delete companies by click on them!"></b-tooltip>
      </b-form-group>
      <b-form-group 
            :invalid-feedback="invalidFeedback('club')"
            :state="!$v.club.$error"
            id="fileClubsGroup"
            label="Clubs:"
            label-for="clubs">
        <b-badge class="custom_badge select_badge" 
            variant="light" 
            v-for="clubs in file.clubs" 
            :key="clubs.id" 
            @click.prevent="deleteIndex(clubs.name, 'clubs')">
                {{clubs.name}} <icons class="deleteIcon" :icon="['fas', 'times']"/>
            </b-badge>
        <b-input-group>
            <!-- <b-form-input id="clubs"
                type="text"
                :state="!$v.club.$error ? null : false"
                v-model="$v.club.$model">
            </b-form-input> -->
            <b-form-select id="clubs"
                      :options="clubs.map(e => e.name)"
                      :state="!$v.club.$error ? null : false"
                      v-model="$v.club.$model">
            </b-form-select>
            <b-input-group-append>
                <b-btn @click="addIndex('club', 'clubs')">Add</b-btn>
            </b-input-group-append>
        </b-input-group>
        <b-tooltip target="clubs" title="You can delete clubs by click on them!"></b-tooltip>
      </b-form-group>
      <b-button type="submit" :disabled="$v.$invalid" variant="primary" class="float-right mt-1">Submit</b-button>
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
        clubs: {
            type: Array,
            required: true
        }
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
            club: "",
            show: true
        }
    },
    methods: {
        onSubmit () {
            if(this.$Utils.isEmptyOrSpaces(this.form.name))
                delete this.form.name;
            
            console.log(this.form);
            this.$snotify.async('Editing File...', () => new Promise((resolve, reject) => {
                this.$Api.file.edit(this.form, this.file.id).then(res => {
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
        deleteIndex(name, fileIndex){
            if(this.checkExistIndex(name, fileIndex))
                return;

            this.file[fileIndex] = this.file[fileIndex].filter(t => t.name !== name);
            this.form[fileIndex] = this.file[fileIndex];
            return;
        },
        addIndex(index, fileIndex){
            if(!this.checkExistIndex(this[index], fileIndex))
                return;

            this.file[fileIndex].push({name: this[index]});
            this[index] = "";
            return;
        },
        checkExistIndex(name, fileIndex){
            var exist = this.file[fileIndex].find(f => f.name.toLowerCase() == name.toLowerCase());
            if(!exist)
                return true;
            
            return false;
        },
        invalidFeedback (index) {
            if(!this.$v[index].maxLength)
                return `${index.replace(/([A-Z]+)*([A-Z][a-z])/g, "$1 $2")} can't be larger than ${this.$v[index]} characters`;

            if(!this.$v[index].unique)
                return `${index.replace(/([A-Z]+)*([A-Z][a-z])/g, "$1 $2")} can't be the same as another ${index}`;

            return `${index.replace(/([A-Z]+)*([A-Z][a-z])/g, "$1 $2")} field error!`;
        },
    },
    validations: {
		form:{
            name:{
                maxLength: maxLength(25),
                unique(value) {
                    if (value === '') 
                        return true;

                    return new Promise((res, rej) => {
                        var fileExist = this.$store.getters.EXIST_FILE_NAME(value);
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
                    if(this.checkExistIndex(value, 'tags'))
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
                    if(this.checkExistIndex(value, 'companies'))
                        return res(true);
                    return rej(false);
                });
            }
        },
        club:{
            maxLength: maxLength(15),
            unique(value){
                if (value === '') 
                    return true;

                return new Promise((res, rej) => {
                    if(this.checkExistIndex(value, 'clubs'))
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
        }
    }
}
</script>

<style lang="scss" scoped>
    .select_badge{
        cursor: pointer;
        margin: 0px 1px;

        &:first-of-type{
            margin: 0px 1px 0px 0px;
        }
    }
    .deleteIcon{
        color: #ef0000;
        background-color: #ffffffb0;
        border: 1px solid #ffffff00;
        border-radius: 8px;
        width: 1rem;
        height: 1rem;
        box-shadow: -1px 1px 1px 0px #4c4c4cd6;
        transition: all .5s;

        &:hover{
            background-color: unset;
            border: unset;
            box-shadow: unset;
        }
    }
</style>


