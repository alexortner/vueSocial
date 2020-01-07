<template>
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
							<v-list-item-subtitle v-if="member.email">
								<v-icon x-small>mdi-email</v-icon> {{member.email}}
							</v-list-item-subtitle>
							<v-list-item-subtitle v-if="member.telefonprivat">
								<v-icon x-small>mdi-phone-classic</v-icon> {{member.telefonprivat}}
							</v-list-item-subtitle>
							<v-list-item-subtitle v-if="member.mobilprivat">
								<v-icon x-small>mdi-cellphone</v-icon> {{member.mobilprivat}}
							</v-list-item-subtitle>	
						</v-list-item-content>
						<v-spacer></v-spacer>
						<v-list-item-action>
							<EditMember :member="member"></EditMember>

							<v-btn icon>
								<v-icon>mdi-delete</v-icon>
							</v-btn>
						</v-list-item-action>
					</v-list-item>
				</v-list>
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
		EditMember
	},
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


