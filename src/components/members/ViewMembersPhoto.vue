<template>
	<v-row>
		<v-col cols="12" sm="6"  md="4" lg="3"   v-for="(member,index) in member_filtered" :key="index">
			<v-card>

				<v-img
					class="white--text align-end"
					:src="member.avatarURL"
					height="250px"
					>
					
				</v-img>
				<v-card-title>{{member.titel}} {{member.vorname}} {{member.nachname}} ({{member.status}})</v-card-title>
				<v-card-subtitle class="pb-0">Aktiv seit: {{get_semester(member.eintritt)}}</v-card-subtitle>

				<v-card-text class="text--primary">
					<div>Geburtstag: {{member.geburtstag}}</div>

					<div>Ortsgruppe: {{member.ortsgruppe}}</div>
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
</template>	
<script>
import {DataConversion} from '@/components/mixins/MixinMethods.js'
import EditMember from '@/components/members/EditMember'
export default {
	name: 'ViewMembersCard',
	mixins: [DataConversion],
	components:{
	},
	//{EditMember},
	props: {
		member_filtered: Array
	},
	data(){
		return{
			imgError:false
		}
	}
}
</script>


