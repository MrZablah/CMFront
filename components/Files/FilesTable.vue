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
                @row-clicked="rowClick"
                tbody-tr-class="custom_row"
                sort-by="name">
                <template slot="tags" slot-scope="data">
                    {{data.item.tags.map(e => e.name).join(", ")}}
                </template>
                <template slot="companies" slot-scope="data">
                    {{data.item.companies.map(e => e.name).join(", ")}}
                </template>
                <template slot="clubs" slot-scope="data">
                    {{data.item.clubs.map(e => e.name).join(", ")}}
                </template>
            </b-table>
        </b-row>
        <b-row align-h="center">
            <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0"/>
        </b-row>
    </b-container>
</template>

<script>
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
                    key: 'description',
                    label: 'Description',
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
        rowClick(record, index){
            this.$router.push(this.isAdmin ? '/Admin/Files/' + record.id : '/');
        }
    },
    
}
</script>

<style lang="scss">
.custom_row{
    cursor: pointer;
}
</style>
