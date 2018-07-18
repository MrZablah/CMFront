<template>
    <b-container fluid>
        <b-row>
            <b-col md="6" class="my-1 pl-0">
                <b-form-group horizontal label="Filter" class="mb-0">
                    <b-input-group>
                        <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
                        <b-input-group-append>
                            <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
            </b-col>
            <b-col md="6" class="my-1 pr-0">
                <b-form-group horizontal label="Per page" class="mb-0">
                    <b-form-select :options="pageOptions" v-model="perPage" />
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-table responsive striped hover dark 
                :items="Files" 
                :fields="fields"
                :per-page="perPage" 
                :filter="filter"
                @filtered="onFiltered"
                :current-page="currentPage"
                sort-by="name">
                <template slot="tags" slot-scope="row">
                    {{row.item.tags.map(e => e.name).join(", ")}}
                </template>
                <template slot="companies" slot-scope="row">
                    {{row.item.companies.map(e => e.name).join(", ")}}
                </template>
                <template slot="clubs" slot-scope="row">
                    {{row.item.clubs.map(e => e.name).join(", ")}}
                </template>
                <template slot="actions" slot-scope="row" class="justify-content-center">
                    <b-button size="sm" variant="primary" @click="openModal(row.item, $event.target)">Preview</b-button>
                    <b-button size="sm" variant="danger" @click="editImg(row.item.id)" class="btn-space">Edit</b-button>
                    <b-button size="sm" variant="success" @click="downloadFile(row.item)">Dowload</b-button>
                </template>
            </b-table>
        </b-row>
        <b-row align-h="center">
            <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0"/>
        </b-row>
        <!-- Info modal -->
        <b-modal id="modal" @hide="resetModal" :title="modal.title" ok-only>
            <pre>
                <b-img :src="modal.img" fluid alt="Responsive image" />
            </pre>
        </b-modal>
    </b-container>
</template>

<script>
const downloadjs = require("downloadjs");
export default {
    props:{
        Files: {
            type: Array,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            currentPage: 1,
            perPage: 10,
            totalRows: this.fileRows,
            pageOptions: [ 10, 20, 50, 100, ],
            filter: null,
            modal: { title: '', img: null },
            fields: [
                {
                    key: 'name',
                    label: 'Name',
                    sortable: true
                },
                {
                    key: 'tags',
                    label: 'Tags',
                    sortable: true
                },
                {
                    key: 'companies',
                    label: 'Companies',
                    sortable: true
                },
                {
                    key: 'clubs',
                    label: 'Clubs',
                    sortable: true
                },
                {
                    key: 'actions',
                    label: 'Actions',
                    sortable: false
                }
            ]
        }
    },
    computed:{
        fileRows(){
            return this.Files.length;
        }
    },
    methods: {
        onFiltered (filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },
        resetModal() {
            this.modal.title = '';
            this.modal.img = null;
        },
        openModal(item, button) {
            this.modal.title = `Name: ${item.name}`
            this.modal.img = item.thumbUrl
            this.$root.$emit('bv::show::modal', 'modal', button)
        },
        editImg(id){
            this.$router.push(this.isAdmin ? '/Admin/Files/' + id : '/');
        },
        downloadFile(item){
            this.$snotify.async('Downloading File...', () => new Promise((resolve, reject) => {
                this.$Api.downloadFile(this.$axios, item.id).then(res => {
                    let newName = this.$Utils.newName(item.pathName, item.name);
                    let type = res.headers['content-type'].toLowerCase();
                    downloadjs(res.data, newName, type);
                    return resolve({
                        title: 'SUCCESS!',
                        body: 'File downloaded!',
                        config: {
                        closeOnClick: true
                        }
                    });
                }).catch((err) => {
                    reject({
                        title: 'ERROR!',
                        body: "Can't download file.",
                        config: {
                        closeOnClick: true
                        }
                    })
                });
            }));
        }
    }, 
}
</script>

<style lang="scss">
.custom_row{
    cursor: pointer;
}
.btn-space{
    margin: 4px 0 4px 0;
    @include mediaQ(576px){
        margin: 0 4px 0 4px;
    }
}
</style>
