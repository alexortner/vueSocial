
<template>
	<div class="members">
		<h1 class="subheading grey--text">Mitgliederverzeichnis</h1>
		<!-- ------------------------------------------------------------------
			Toolbar with search, filter and buttons to call the different views
		------------------------------------------------------------------- -->
		<v-card class="my-3 px-3 elevation-5" >
			<v-row >
				<!-- Search input form-->
				<v-col 
					cols="12"
					order=3
					align="center"

					sm="3"
					order-sm=1
					>

					<v-text-field
						label="Namen suchen"
						v-model="search_value"
						prepend-inner-icon="mdi-magnify"
						clearable
						hide-details
						dense
						color="grey darken-2">
					</v-text-field>
					
				</v-col>
				<!-- select form for ortsgruppe filter-->
				<v-col
					cols="12"
					order=2
					align="center"

					sm="2"
					order-sm=2>
					<v-select
						label="Filter wählen"
						v-model="filter_values"
						:items="filter_items"
						small-chips
						deletable-chips
						hide-details
						color="grey darken-2"
						dense
					></v-select>
				</v-col>
				<v-col
					cols="12"
					order=2
					align="center"

					sm="4"
					order-sm=3>
					<v-select v-if="filter_values"
						:label="subfilter_label"
						v-model="subfilter_values"
						:items="subfilter_items"
						small-chips
						dense
						deletable-chips
						single-line
						hide-details
						multiple
						color="grey darken-2"
					></v-select>
				</v-col>

				<v-col
					cols="12"
					order=1
					align="end"
					sm="3" 
					order-sm=4
				>
					<v-card flat>
				<v-btn-toggle 
						center
						v-model="toggle_exclusive" 
						mandatory>

						<v-tooltip top open-delay="800">
							<template v-slot:activator="{ on }">
								<v-btn :value="1" v-on="on">
									<v-icon>mdi-account-card-details</v-icon>
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
					</v-card>
				</v-col>
			</v-row>
		</v-card>

		<!-- ------------------------------------------------------------------
			call the chield compoents to show the data
		------------------------------------------------------------------- -->

		<!-- view 1: cards -->
		<div class="py-3"  v-if="toggle_exclusive==1">
			<ViewMembersCard :member_filtered="member_filtered"></ViewMembersCard>
		</div>

		<!-- view 2: table -->
		<div class="py-4" v-if="toggle_exclusive==2">
			<ViewMembersTable :member_filtered="member_filtered"></ViewMembersTable>
		</div>

		<!-- view 3: photo cards -->
		<div class="py-1" v-if="toggle_exclusive==3">
			<ViewMembersPhoto :member_filtered="member_filtered"></ViewMembersPhoto>	
		</div>

		<!-- view 4: google map -->
		<div class="py-1" v-if="toggle_exclusive==4">
			<ViewMembersMap></ViewMembersMap>
		</div>

		<v-btn @click="tester">load</v-btn>

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
		imgError:false,
		toggle_exclusive: 1,
		// variable to hold search field value
		search_value: '',
		// dropdown
		filter_items:['Status','Semester','Ortsgruppe','Geburtstag'],
		filter_values:null,
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

		tester(){
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
