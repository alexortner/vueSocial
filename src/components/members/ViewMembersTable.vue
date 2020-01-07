<template>
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
</template>	
<script>
export default {
	name: 'ViewMembersTable',
	props: {
		member_filtered: Array
	},
	data(){
		return{
			// column selection for table view
			member_list_headers: [
				{ text: 'Titel', value: 'titel' },
				{ text: 'Name', value: 'nachname' },
				{ text: 'Vorname', value: 'vorname' },
				{ text: 'Status', value: 'status' },
				{ text: 'Eintritt', value: 'eintritt' },
				{ text: 'Geburtstag', value: 'geburtstag' }
			],
		}
	}
}
</script>


