<template>
    <b-container fluid>
        <b-row>
            <b-col md="6" class="space space-pl">
                <b-form-group horizontal label="Filter" class="mb-0">
                    <b-input-group>
                        <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
                        <b-input-group-append>
                            <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
            </b-col>
            <b-col md="6" class="space space-pr">
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
                <template slot="actions" slot-scope="row">
                    <b-button size="sm" variant="primary" @click="openModalPreview(row.item, $event.target)"><icons :icon="['fas', 'eye']"></icons></b-button>
                    <b-button v-if="isAdmin" size="sm" variant="secondary" @click="editImg(row.item.id)" class="btn_space"><icons :icon="['fas', 'file-edit']"></icons></b-button>
                    <btnDownload v-if="isAdmin" :id="row.item.id" :pathName="row.item.pathName" :name="row.item.name"/>
                    <b-button v-if="isAdmin" size="sm" variant="danger" @click="openModalDelete(row.item, $event.target)" class="btn_space-last">
                        <icons :icon="['fa', 'trash']"></icons>
                    </b-button>
                </template>
            </b-table>
        </b-row>
        <b-row align-h="center">
            <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0"/>
        </b-row>
        <!-- Info modal -->
        <b-modal id="modal" @hide="resetModal(modal)" :title="modal.title" ok-only>
            <pre>
                <b-img :src="modal.img" fluid alt="Image preview" />
            </pre>
        </b-modal>
        <!-- Warning modal -->
        <b-modal id="deleteModal"
            centered 
            @hide="resetModal(modalDel)" 
            :title="modalDel.title"
            size="md"
            header-bg-variant="danger"
            header-text-variant="light">
            
            <p class="modalD_text">{{modalDel.msg}}</p>
            
            <div slot="modal-footer" class="w-100">
                <b-btn size="sm" class="float-right" variant="danger" @click="deleteFile">Delete</b-btn>
                <b-btn size="sm" class="float-right mr-1" variant="secondary" @click="hideModalDelete">Close</b-btn>
            </div>
        </b-modal>
    </b-container>
</template>

<script>
import btnDownload from "./BtnDownload";
export default {
    props:{
        Files: {
            type: Array,
            required: true
        }
    },
    data () {
        return {
            isAdmin: this.$store.getters.getIsAdmin,
            currentPage: 1,
            perPage: 10,
            totalRows: this.fileRows,
            pageOptions: [ 10, 20, 50, 100, ],
            filter: null,
            modal: { title: '', img: null },
            modalDel: { title: '', msg: '', id: null },
            fields: [
                {
                    key: 'name',
                    label: 'Name',
                    sortable: true
                },
                {
                    key: 'extension',
                    label: 'Extension',
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
                    tdClass: 'center_row',
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
        deleteFile(id){
            this.$snotify.async('Deleting File...', () => new Promise((resolve, reject) => {
                this.$Api.file.delete(this.$axios, this.modalDel.id).then(res => {
                    this.$store.dispatch('deleteFile', this.modalDel.id);
                    this.hideModalDelete();
                    return resolve({
                        title: 'SUCCESS!',
                        body: 'File Deleted!',
                        config: {
                            closeOnClick: true,
                            timeout: 2000
                        }
                    });
                }).catch((err) => {
                    reject({
                        title: 'ERROR!',
                        body: "Can't delete file.",
                        config: {
                            closeOnClick: true
                        }
                    })
                });
            }));
        },
        onFiltered (filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },
        resetModal(modal) {
            modal.title = '';
            modal.msg = '';
            modal.img = null;
            modal.id = null;
        },
        openModalPreview(item, button) {
            this.modal.title = `Name: ${item.name}`;
            this.modal.img = item.thumbUrl;
            this.$root.$emit('bv::show::modal', 'modal', button);
        },
        openModalDelete(item, button) {
            this.modalDel.title = 'Delete Item Confirmation';
            this.modalDel.msg = `Are you sure you want to delete item with name: ${item.name}?`;
            this.modalDel.id = item.id;
            this.$root.$emit('bv::show::modal', 'deleteModal', button);
        },
        hideModalDelete(){
            this.$root.$emit('bv::hide::modal','deleteModal');
        },
        editImg(id){
            this.$router.push(this.isAdmin ? '/Files/' + id : '/');
        }
    },
    components: {
        btnDownload
    }
}
</script>

<style lang="scss">
.custom_row{
    cursor: pointer;
}
.modalD_text{
    font-size: 1.5rem;
    color: #202020;
}
.center_row{
    text-align: unset;
    @include mediaQ(940px){
        text-align: center;
    }
}
.btn_space{
    margin: 4px 1px 4px 0;
    @include mediaQ(823px){
        margin: 0 4px 0 4px;
    }
    &-last{
        margin: 4px 0 0 0;
        @include mediaQ(940px){
            margin: 0 0 0 4px;
        }
    }
}
.space{
    @include mediaQ(768px){
        margin-bottom: 4px;
        margin-top: 4px;
    }
    &-pr{
        @include mediaQ(768px){
            padding-right: 0;
        }
    }
    &-pl{
        @include mediaQ(768px){
            padding-left: 0;
        }
    } 
}
</style>
