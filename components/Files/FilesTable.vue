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
                    <b-button size="sm" variant="primary" @click="openModal(row.item, $event.target)"><icons :icon="['fas', 'eye']"></icons></b-button>
                    <b-button size="sm" variant="secondary" @click="editImg(row.item.id)" class="btn_space"><icons :icon="['fas', 'file-edit']"></icons></b-button>
                    <btnDownload :id="row.item.id" :pathName="row.item.pathName" :name="row.item.name"/>
                    <btnDelete :id="row.item.id" class="btn_space-last"/>
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
import btnDownload from "./BtnDownload";
import btnDelete from "./BtnDelete";
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
        }
    },
    components: {
        btnDownload,
        btnDelete
    }
}
</script>

<style lang="scss">
.custom_row{
    cursor: pointer;
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
