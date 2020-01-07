export const DataConversion ={
	data(){
		return{
		status_list_items : ['aF','aB','iaB','AH','CK','BS'],
		bund_list_items : [
			'T! Markomanno-Abertia',
			'T! Alsatia',
			'T! Asciburgia Würzburg',
			'AT! Eberhardina-Markomannia',
			'L! Hansea auf dem Wels',
			'FtV! Hohenstaufen Aalen',
			'T! Philippina-Saxonia',
			'L! Rhenania Jena',
			'L! Teutonia Bonn',
			'L! Tyrol'
			],
		ortsgruppen_list_items : ['Berlin','Frankfurt','Freiburg','Harz','München','Nord','Rhein-Ruhr','Stuttgart','Ortsgruppenlos'],
		titel_items: ['Dr.','Prof.','Dr. Dr.','Prof. Dr.'],
		authLevels_items: ['Benutzer','Admin','Super-Admin'],
		geburstag_list_items : [
			{text: 'Januar', value: '01'},
			{text: 'Februar',value: '02'},
			{text: 'März',value: '03'},
			{text: 'April',value: '04'},
			{text: 'Mai',value: '05'},
			{text: 'Juni',value: '06'},
			{text: 'Juli',value: '07'},
			{text: 'August',value: '08'},
			{text: 'September',value: '09'},
			{text: 'Oktober',value: '10'},
			{text: 'November',value: '11'},
			{text: 'Dezember',value: '12'}]
		}
	},
	methods: {
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
		initials(member_list){
			let initials=member_list.vorname.substring(0,1)+member_list.nachname.substring(0,1)
			return initials
		},
		onImgError() {
			this.imgError = true;
		},

	}
}