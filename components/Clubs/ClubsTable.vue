<template>
	<b-container fluid>
        <b-row class="pb-2">
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
                :items="Clubs" 
                :fields="fields"
                :per-page="perPage" 
                :filter="filter"
                @filtered="onFiltered"
                :current-page="currentPage"
                sort-by="name">
                <template slot="types" slot-scope="row">
                    {{ row.item.types | nameSpaced | limitWords }}
                </template>
                <template slot="regions" slot-scope="row">
                    {{ row.item.regions | nameSpaced | limitWords }}
                </template>
                <template slot="countries" slot-scope="row">
                    {{ row.item.regions | nameChildSpaced('countries') | limitWords }}
                </template>
                <template slot="actions" slot-scope="row">
                    <b-button v-if="isAdmin" size="sm" variant="secondary" @click="editClub(row.item.id)" class="btn_space"><icons :icon="['fas', 'file-edit']"></icons></b-button>
                    <b-button v-if="isAdmin" size="sm" variant="danger" @click="openModalDelete(row.item, $event.target)" class="btn_space-last">
                        <icons :icon="['fa', 'trash']"></icons>
                    </b-button>
                </template>
            </b-table>
        </b-row>
        <b-row align-h="center">
            <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0"/>
        </b-row>
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
                <b-btn size="sm" class="float-right" variant="danger" @click="deleteClub">Delete</b-btn>
                <b-btn size="sm" class="float-right mr-1" variant="secondary" @click="hideModalDelete">Close</b-btn>
            </div>
        </b-modal>
    </b-container>
</template>

<script>
export default {
	props:{
		Clubs: {
			type: Array,
			required: true
		}
	},
	data(){
		return{
			isAdmin: this.$store.getters.IS_ADMIN,
            currentPage: 1,
            perPage: 10,
            totalRows: this.fileRows,
            pageOptions: [ 10, 20, 50, 100, ],
            filter: null,
            modalDel: { title: '', msg: '', id: null },
            fields: [
                {
                    key: 'name',
                    label: 'Name',
                    sortable: true
                },
                {
                    key: 'url',
                    label: 'Club Url',
                    sortable: false
                },
                {
                    key: 'types',
                    label: 'Types',
                    sortable: true
                },
                {
                    key: 'regions',
                    label: 'Regions',
                    sortable: true
                },
                {
                    key: 'countries',
                    label: 'Countries',
                    sortable: false
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
	watch:{
        '$store.getters.GET_CLUBS'(clubs){
            this.clubs = clubs;
		}
    },
	methods:{
		onFiltered (filteredItems) {
			// Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },
		deleteClub(id){
            this.$snotify.async('Deleting Club...', () => new Promise((resolve, reject) => {
                this.$Api.club.delete(this.modalDel.id).then(res => {
                    this.$store.dispatch('DELETE_CLUB', this.modalDel.id);
                    this.hideModalDelete();
                    return resolve({
                        title: 'SUCCESS!',
                        body: 'Club Deleted!',
                        config: {
                            closeOnClick: true,
                            timeout: 2000
                        }
                    });
                }).catch((err) => {
                    reject({
                        title: 'ERROR!',
                        body: "Can't delete club.",
                        config: {
                            closeOnClick: true
                        }
                    })
                });
            }));
        },
		editClub(id){
            this.$router.push(this.isAdmin ? '/Clubs/' + id : '/');
        },
		resetModal(modal) {
            modal.title = '';
            modal.msg = '';
            modal.id = null;
        },
		openModalDelete(item, button) {
            this.modalDel.title = 'Delete Item Confirmation';
            this.modalDel.msg = `Are you sure you want to delete item with name: ${item.name}?`;
            this.modalDel.id = item.id;
            this.$root.$emit('bv::show::modal', 'deleteModal', button);
        },
        hideModalDelete(){
            this.$root.$emit('bv::hide::modal','deleteModal');
        }
	}
}
</script>

<style lang="scss" scoped>
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
