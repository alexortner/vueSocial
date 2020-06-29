
<template>
	<div class="members">
		<h1 class="subheading grey--text">Mitgliederverzeichnis</h1>

		<!-- ------------------------------------------------------------------
		Toolbar with search, filter and view change
		------------------------------------------------------------------- -->
		
		<v-row >
			<v-col
			>
				<v-toolbar  height="79">
				<v-text-field
						label="Suche"
						v-model="search_value"
						prepend-inner-icon="mdi-magnify"
						append-outer-icon="mdi-filter-plus"
						clearable
						hide-details
						outlined
						color="grey darken-1"
						@click:append-outer="show_filter=!show_filter"
						>
				</v-text-field>
				<div class="mx-5"></div>
				<v-tooltip top open-delay="400">
					<template v-slot:activator="{ on }">
						<v-btn :value="1" v-on="on" icon class="d-none d-sm-flex" @click="toggle_view='list'" retain-focus-on-click>
							<v-icon>mdi-view-list</v-icon>
						</v-btn>
					</template>
					<span>Listen Ansicht</span>
				</v-tooltip>
				<v-tooltip top open-delay="400">
					<template v-slot:activator="{ on }">
						<v-btn :value="2" v-on="on" icon class="d-none d-sm-flex" @click="toggle_view='photo'" retain-focus-on-click>
							<v-icon>mdi-image</v-icon>
						</v-btn>
					</template>
					<span>Bilder Ansicht</span>
				</v-tooltip>
				<v-tooltip top open-delay="400">
					<template v-slot:activator="{ on }">
						<v-btn :value="3" v-on="on" icon class="d-none d-sm-flex" @click="toggle_view='map'" retain-focus-on-click>
							<v-icon>mdi-earth</v-icon>
						</v-btn>
					</template>
					<span>Karten Ansicht</span>
				</v-tooltip>
				<div class="mx-5"></div>
				<v-tooltip top open-delay="400">
					<template v-slot:activator="{ on }">
						<v-btn :value="4" v-on="on" icon class="d-none d-sm-flex">
							<v-icon>mdi-cloud-download</v-icon>
						</v-btn>
					</template>
					<span>Download Excel</span>
				</v-tooltip>


				<v-menu offset-y nudge-bottom=18>
					<template v-slot:activator="{ on }">
						
						<v-btn icon class="d-sm-none" v-on="on">
							<v-icon>mdi-dots-vertical</v-icon>
						</v-btn>
					</template>
					<v-list>
						<v-list-item @click="toggle_view='list'">
							<v-list-item-icon>
								<v-icon>mdi-view-list</v-icon>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title>Listen Ansicht</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
						<v-list-item @click="toggle_view='photo'">
							<v-list-item-icon>
								<v-icon>mdi-image</v-icon>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title>Bilder Ansicht</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
						<v-list-item @click="toggle_view='map'">
							<v-list-item-icon>
								<v-icon>mdi-earth</v-icon>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title>Karten Ansicht</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
						<v-list-item>
							<v-list-item-icon>
								<v-icon>mdi-cloud-download</v-icon>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title>Download als Excel</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list>
				</v-menu>
				
				
				
				
				
			</v-toolbar>
			<v-card 
				v-if="show_filter"
				class="my-1 py-3"
			>
				<v-list>
					<v-list-item>
						<v-select
									label="Filter wählen"
									v-model="filter_values"
									:items="filter_items"
									:menu-props="{ offsetY: true }"
									outlined
									hide-selected
									color="grey darken-2"
									offset-y
									@change="subfilter_values=[]"
								></v-select>
						</v-list-item>
					<v-list-item v-if="filter_values">
						<v-select 
									:label="subfilter_label"
									v-model="subfilter_values"
									:items="subfilter_items"
									:menu-props="{ offsetY: true }"
									chips
									deletable-chips
									multiple
									outlined
									color="grey darken-2"
								></v-select>
						</v-list-item>
				</v-list>

				<v-card-actions class=px-4>
					<v-btn  @click="clean_filter"><v-icon left>mdi-filter-remove</v-icon> Alle Filter Entfernen</v-btn>
				</v-card-actions>
			</v-card>

			</v-col>
			<!--
			<v-col 
				cols="12"
				justify="center"
				md="auto"
				sm="auto"
				lg="auto"
			> <center>
				<v-btn-toggle 
						center
						v-model="toggle_exclusive" 
						mandatory>

						<v-tooltip top open-delay="800">
							<template v-slot:activator="{ on }">
								<v-btn :value="1" v-on="on">
									<v-icon>mdi-account-box-multiple</v-icon>
								</v-btn>
							</template>
							<span>Kontaktkarten</span>
						</v-tooltip>

						<v-tooltip top open-delay="800">
							<template v-slot:activator="{ on }">
								<v-btn :value="2" v-on="on">
									<v-icon>mdi-table-large</v-icon>
								</v-btn>
							</template>
							<span>Tabelle</span>
						</v-tooltip>

						<v-tooltip top open-delay="800">
							<template v-slot:activator="{ on }">
								<v-btn :value="3" v-on="on">
									<v-icon>mdi-image</v-icon>
								</v-btn>
							</template>
							<span>Photos</span>
						</v-tooltip>

						<v-tooltip top open-delay="800">
							<template v-slot:activator="{ on }">
								<v-btn :value="4" v-on="on">
									<v-icon>mdi-google-maps</v-icon>
								</v-btn>
							</template>
							<span>Landkarte</span>
						</v-tooltip>
						<v-tooltip top open-delay="800">
							<template v-slot:activator="{ on }">
								<v-btn :value="5" v-on="on">
									<v-icon>mdi-cloud-download</v-icon>
								</v-btn>
							</template>
							<span>Download</span>
						</v-tooltip>

					</v-btn-toggle>
					</center>
			</v-col> -->
		</v-row>

		
	


		<!-- ------------------------------------------------------------------
			call the child compoents to show the data
		------------------------------------------------------------------- -->

		<!-- view 1: cards -->
		<div class="py-3"  v-if="toggle_view=='list'">
			<ViewMembersCard :member_filtered="member_filtered"></ViewMembersCard>
		</div>

		<!-- view 2: table -->
		<div class="py-4" v-if="toggle_view=='table'">
			<ViewMembersTable :member_filtered="member_filtered"></ViewMembersTable>
		</div>

		<!-- view 3: photo cards -->
		<div class="py-1" v-if="toggle_view=='photo'">
			<ViewMembersPhoto :member_filtered="member_filtered"></ViewMembersPhoto>	
		</div>

		<!-- view 4: google map -->
		<div class="py-1" v-if="toggle_view=='map'">
			<ViewMembersMap></ViewMembersMap>
		</div>

		<v-btn @click="tester">test </v-btn>
		
		
	</div>	
</template>

<script>
// @ is an alias to /src
import {DataConversion} from '@/components/mixins/MixinMethods.js'
import ViewMembersCard from '@/components/members/ViewMembersCard'
import ViewMembersTable from '@/components/members/ViewMembersTable'
import ViewMembersPhoto from '@/components/members/ViewMembersPhoto'
import ViewMembersMap from '@/components/members/ViewMembersMap'


import firebase from '@/firebase/init'
let db=firebase.firestore()
let storage=firebase.storage().ref()


export default {
	name: 'members',
	mixins: [DataConversion],
	components:{
		ViewMembersCard,
		ViewMembersTable,
		ViewMembersPhoto,
		ViewMembersMap
	},
	//{EditMember},
	data(){
		return{
		show_filter:false,
		imgError:false,
		toggle_view: "list",
		// variable to hold search field value
		search_value: '',
		// dropdown
		filter_items:['Status','Semester','Ortsgruppe','Geburtstag'],
		filter_values: null,
		subfilter_values: [],
		member_list:[],
		lat:50,
		lng:8

	}
	},
	computed:{
		member_active(){
			// filter out active members only
			var data_filter_active = this.member_list.filter(user=>user.dbstatus=="aktiv")
			return data_filter_active
		},
		member_filtered() {

			var result=null
			// filter only active members
			var data_filter_active = this.member_active
			// apply filter if a value is entered inthe search field orthe selection fields
			if (this.search_value || this.subfilter_values.length>0) {

				// first apply search field filter
				var data_filter_search=null
				if(this.search_value){
					data_filter_search=data_filter_active.filter(user => 
						user.nachname.toLocaleLowerCase().includes(this.search_value.toLocaleLowerCase()) ||
						user.vorname.toLocaleLowerCase().includes(this.search_value.toLocaleLowerCase()) 
					)
				} else {
					data_filter_search=data_filter_active
				}
				//console.log(data_filter_search)
				// then apply select filter 
				var data_select_filter=[]
				if(this.subfilter_values.length>0){
					

					for (var sub_result of data_filter_search) {
						// Case status search
						if(this.filter_values=='Status'){
							for (var status_filter of this.subfilter_values) {
								if(sub_result.status.toLocaleLowerCase()==status_filter.toLocaleLowerCase()){
									data_select_filter.push(sub_result)
								}
							}
						}
						// Case semester search
						else if(this.filter_values=='Semester'){
							for (var semester_filter of this.subfilter_values) {
								if(sub_result.eintritt==semester_filter){
									data_select_filter.push(sub_result)
								}
							}
						}
						// Case ortsgruppen search
						else if(this.filter_values=='Ortsgruppe'){
							for (var ortsgruppen_filter of this.subfilter_values) {
								if(sub_result.ortsgruppe.toLocaleLowerCase()==ortsgruppen_filter.toLocaleLowerCase()){
									data_select_filter.push(sub_result)
								}
							}
						}
						// Case Geburtsjahr search
						else if(this.filter_values=='Geburtstag'){
							for (var geburtstag_filter of this.subfilter_values) {
								if(sub_result.geburtstag.substring(5,7)==geburtstag_filter){
									data_select_filter.push(sub_result)
								}
							}
						}
						else{
							data_select_filter=data_filter_search
						}
					}


				}
				else {
					data_select_filter=data_filter_search
				}
				
				
				result=data_select_filter
			// return everything if no search or filter selected
			} else {
				result=data_filter_active
			}
			
			return result
			

		},

		subfilter_items(){
			let item_list=null
			switch (this.filter_values) {
				case 'Ortsgruppe':
					item_list=this.ortsgruppen_list_items
					break;
				case 'Status':
					item_list=this.status_list_items
					break;
				case 'Semester':
					item_list=this.subfilter_items_semester
					break;
				case 'Geburtstag':
					item_list=this.geburstag_list_items
					break;

			} 
			
			return item_list
		},
		subfilter_label(){
			let label=null
			switch (this.filter_values) {
				case 'Ortsgruppe':
					label='Ortsgruppe wählen'
					break;
				case 'Status':
					label='Status wählen'
					break;
				case 'Semester':
					label='Semester wählen'
					break;
				case 'Geburtstag':
					label='Geburtstag wählen'
					break;

			} 
			return label
		},
		subfilter_items_semester(){
			var unique = {};
			var distinct = [];
			for( var i in this.member_active ){
				if( typeof(unique[this.member_active[i].eintritt]) == "undefined"){
					distinct.push(this.member_active[i].eintritt);
				}
			unique[this.member_active[i].eintritt] = 0;
			}
			distinct=distinct.sort()
			for(var j in distinct){
				distinct[j]={text: this.get_semester(distinct[j]), value: distinct[j]}
			}
			return distinct
		},
		
		
		},
	methods:{

		json_initial_loader(){
			this.member_list.forEach(function(obj) {
				let slug=obj.vorname+'-'+obj.nachname
				//console.log(slug)

				let ref=db.collection('members').doc(slug)
				ref.set(obj)
				.catch((error)=> {
					console.log("Error adding document: ", error);
				});
			});
		},
		renderMap(){
			console.log('start render')
			console.log(google.maps)
			const map = new google.maps.Map(document.getElementById("map_canvas"), {
				center: {lat: 50, lng: 8},
				zoom: 6,
				maxZoom: 15,
				minZoom: 3,
				streetViewControl:false 
			})
		},
		clean_filter(){
			console.log('clean filter')
			this.show_filter=false
			this.filter_values=null
			this.subfilter_values=[]
		},

		tester(){
			console.log("Test Funktion")
			console.log(this.subfilter_values)
		
		}

	},
	mounted(){
		//this.renderMap()
	},
	// get all member data and avatarURL from firebase
	created(){
    db.collection('members').get()
    .then(snapshot => {
		snapshot.forEach(doc =>{
			storage.child('avatars').child(doc.data().avatar).getDownloadURL()
			.then(resp=>{
				
				let userDetails=doc.data()
				userDetails.id=doc.id
				userDetails.avatarURL=resp
				//console.log(userDetails)
				this.member_list.push(userDetails)
			})
			.catch(err => {
				console.log(err)
			})
			
      })
    })
    
  }
	

 
}
</script>
<style>
.google-map{
	width: 100%;
	height: 100%;
	margin:0 auto;
	background: #fff;
	position: relative; 
	z-index: -1
}
</style>
