
<template>
	<div class="members">
		<h1 class="subheading grey--text">Mitgliederverzeichnis</h1>
		<!-- Toolbar with search, filter and buttons for view change-->
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
						v-model="searchUser"
						prepend-inner-icon="mdi-magnify"
						clearable
						hide-details
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
						clearable
						hide-details
						color="grey darken-2"
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
						clearable
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

		<!-- view 1: cards -->
		<div class="py-3"  v-if="toggle_exclusive==1">
		<v-row dense>
        <v-col
          v-for="(member,index) in member_filtered"
          :key="index"
          cols="12" 
          sm="6" 
        >
          <v-card>
            <v-list two-line dense>
					<v-list-item :key="index">
					<!-- if no image error show avatar  -->
					<v-list-item-avatar v-if="!imgError" size="72">
						<img 
						:src="member.avatarURL"
						:alt="member.name"
						@error="onImgError()"/>
					</v-list-item-avatar>
					<!-- else show initials  -->
					<v-list-item-avatar v-else color="red darken-4 white--text" size="62">
						{{initials(member)}}
					</v-list-item-avatar>

					<v-list-item-content>
						<v-list-item-title>
							<span v-if="member.titel">{{member.titel}}</span> 
							{{member.vorname}} {{member.nachname}} {{member.namensziffer}} 
							<span v-if="member.status">({{member.status}})</span>
						</v-list-item-title>
						<v-list-item-subtitle v-if="member.email"><v-icon x-small>mdi-email</v-icon> {{member.email}}</v-list-item-subtitle>
						<v-list-item-subtitle v-if="member.telefonprivat"><v-icon x-small>mdi-phone-classic</v-icon> {{member.telefonprivat}}</v-list-item-subtitle>
						<v-list-item-subtitle v-if="member.mobilprivat"><v-icon x-small>mdi-cellphone</v-icon> {{member.mobilprivat}}</v-list-item-subtitle>
						
					</v-list-item-content>
					<v-spacer></v-spacer>
					<v-list-item-action>
              

              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>

             
            </v-list-item-action>

				</v-list-item>
			</v-list>

          </v-card>
        </v-col>
      </v-row>
  </div>

	<!-- view 2: table -->
	<div class="py-4" v-if="toggle_exclusive==2">
		<v-data-table
		:headers="member_list_headers"
		:items="member_filtered"
		:sort-by="['nachname', 'vorname']"
		:sort-desc="[false, true]"
		:items-per-page=50
		:show-group-by=true
		multi-sort
		class="elevation-1"
		></v-data-table>
	</div>

	<!-- view 3: photo cards -->
	<div class="py-1" v-if="toggle_exclusive==3">
		
		<v-row>
			<v-col cols="12" sm="6"  md="4" lg="3"   v-for="(member,index) in member_filtered" :key="index">
				<v-card>

					<v-img
						class="white--text align-end"
						:src="member.avatarURL"
						height="350px"
						>
						
					</v-img>
					<v-card-title>{{member.titel}} {{member.vorname}} {{member.nachname}} ({{member.status}})</v-card-title>
					<v-card-subtitle class="pb-0">Aktiv seit: {{member.eintritt}}</v-card-subtitle>

					<v-card-text class="text--primary">
						<div>Geburtstag: {{member.geburtstag}}</div>

						<div>Ortsgruppe: {{member.ortsgruppe}}</div>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>	
	</div>

	<!-- view 4: google map -->
	<div class="py-1" >
		<div class="google-map" id="map_canvas"></div>
	</div>

  <v-btn @click="tester">load</v-btn>


	</div>
	
</template>

<script>
// @ is an alias to /src
import firebase from '@/firebase/init'
let db=firebase.firestore()
let storage=firebase.storage().ref()


export default {
	name: 'members',
	data(){
		return{
		imgError:false,
		toggle_exclusive: 1,
		// variable to hold search field value
		searchUser: '',
		// dropdown
		filter_items:['Status','Semester','Ortsgruppe','Geburtstag'],
		filter_values:null,
		subfilter_values: [],
		
		// column selection for table view
		member_list_headers: [
			{ text: 'Titel', value: 'titel' },
			{ text: 'Name', value: 'nachname' },
			{ text: 'Vorname', value: 'vorname' },
			{ text: 'Status', value: 'status' },
			{ text: 'Eintritt', value: 'eintritt' },
			{ text: 'Geburtstag', value: 'geburtstag' }
        ],
		member_list:[],
		lat:50,
		lng:8

	}
	},
	computed:{
		member_filtered() {
			let result = this.member_list.filter(user=>user.dbstatus=="aktiv");
			if (this.searchUser) {
				result = this.member_list.filter(user => 
					user.nachname.toLocaleLowerCase().includes(this.searchUser.toLocaleLowerCase()) ||
					user.vorname.toLocaleLowerCase().includes(this.searchUser.toLocaleLowerCase()) 
				);	
			}
			return result
			},

		subfilter_items(){
			let item_list=null
			switch (this.filter_values) {
				case 'Ortsgruppe':
					item_list=['Berlin','Frankfurt','Freiburg','Harz','München','Nord','Rhein-Ruhr','Stuttgart','Ortsgruppenlos']
					break;
				case 'Status':
					item_list=['aF','aB','iaB','AH','CK','BS']
					break;
				case 'Semester':
					item_list=this.subfilter_items_semester
					break;
				case 'Geburtstag':
					item_list=['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember']
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
			for( var i in this.member_filtered ){
				if( typeof(unique[this.member_filtered[i].eintritt]) == "undefined"){
					distinct.push(this.member_filtered[i].eintritt);
				}
			unique[this.member_filtered[i].eintritt] = 0;
			}
			distinct=distinct.sort()
			for(var j in distinct){
				console.log(distinct[j])
				distinct[j]=this.get_semester(distinct[j])
				console.log(distinct[j])
			}
			return distinct
		},
		
		
		},
	methods:{
		initials(member_list){
			let initials=member_list.vorname.substring(0,1)+member_list.nachname.substring(0,1)
			return initials
		},
		get_semester(semester_id){
			let semester=null
			if(semester_id.substring(5,7)=='ws'){
				semester='WS '+ semester_id.substring(0,4) + '/' + (parseInt(semester_id.substring(0,4))+1)
			}
			else if(semester_id.substring(5,7)=='ss'){
				semester='SS '+ semester_id.substring(0,4)
			}
			return semester

		},
		onImgError() {
			this.imgError = true;
		},
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
		this.renderMap()
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
