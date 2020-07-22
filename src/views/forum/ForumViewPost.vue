<template>
	<div class="forum">
		<!-- header back button
		<v-row>
			<v-col>
				<v-btn @click=forumView()>
					<v-icon>mdi-arrow-left</v-icon> Zurück
				</v-btn>
				<v-spacer></v-spacer>
				<v-btn rounded large color="indigo" dark >
					<v-icon left >mdi-message-plus</v-icon>  
					<span v-if="$vuetify.breakpoint.smAndUp">Neuen Beitrag erstellen</span>
					<span v-else>Neu</span>
				</v-btn>
			</v-col>
		</v-row> -->
		<!-- post header -->
		<v-row>
			<v-col>	
				<v-card>
					<v-list-item>
						<v-list-item-content>
							<v-list-item-title class="headline">Semesterantritsskneipe über blaue Berge hinweg</v-list-item-title>
							<v-list-item-subtitle>von Alex Meier vor 2 Tagen</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>

					<v-card-actions>
						<v-icon class="mx-2">mdi-thumb-up</v-icon> 4
						<div class="mx-3"></div>
						<v-icon class="mx-2">mdi-message-processing</v-icon> 6 Antworten

					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
		
		<!-- post replies -->
		<v-row>
			<v-col cols=2 sm="auto">	
				<v-avatar
					class="profile"
					color="grey"
					size="62"	
				>
					<v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
				</v-avatar>
			</v-col>
			<v-col>
				<v-card>
					<v-card-subtitle><b>Alex Meier</b> vor 2 Tagen</v-card-subtitle>
					<v-card-text>{{topics[0].content}} </v-card-text>
					<v-card-actions>
						<v-icon class="mx-2">mdi-thumb-up</v-icon> 4
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>	
		<v-row>
			<v-col cols=2 sm="auto">	
				<v-avatar
					class="profile"
					color="grey"
					size="62"	
				>
					<v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
				</v-avatar>
			</v-col>
			<v-col>
				<v-card>
					<v-card-subtitle><b>Alex Meier</b> vor 2 Tagen</v-card-subtitle>
					<v-card-text>{{topics[1].content}} </v-card-text>
					<v-card-actions>
						<v-icon class="mx-2">mdi-thumb-up</v-icon> 4
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>

		<v-row>
			<v-col cols=2 sm="auto">	
				<v-avatar
					class="profile"
					color="grey"
					size="62"	
				>
					<v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
				</v-avatar>
			</v-col>
			<v-col>
				<v-card>
					<v-card-subtitle><b>Alex Meier</b> vor 2 Tagen</v-card-subtitle>
					<v-card-text>{{topics[0].content}} </v-card-text>
					<v-card-actions>
						<v-icon class="mx-2">mdi-thumb-up</v-icon> 4
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>

		<!--<v-footer
			fixed
		>
		<quillEditor
       v-model="content"
       :options="editorOption">
  </quillEditor>
	</v-footer>-->
	<v-row>
			<v-col cols=2 sm="auto">	
				<v-avatar
					class="profile"
					color="grey"
					size="62"	
				>
					<v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
				</v-avatar>
			</v-col>
			<v-col>
				<v-card color="grey lighten-3">
					<v-card-title>Antworten:
					</v-card-title>
					
   
					<v-card-text>
						<!--
						<v-btn-toggle
							multiple
							
						>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn
									v-on="on"
									>
									<v-icon>mdi-format-title</v-icon>
								</v-btn>
							</template>
							<span>Titel</span>
						</v-tooltip>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn
									v-on="on"
									>
									<v-icon size=15>mdi-format-title</v-icon>
								</v-btn>
							</template>
							<span>Subtitel</span>
						</v-tooltip>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn
									v-on="on"
									>
									<v-icon>mdi-format-bold</v-icon>
								</v-btn>
							</template>
							<span>Fett</span>
						</v-tooltip>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn
									v-on="on"
									>
									<v-icon>mdi-format-italic</v-icon>
								</v-btn>
							</template>
							<span>Kursiv</span>
						</v-tooltip>
						
						

						</v-btn-toggle>

						<v-btn-toggle
							class="mx-2"
							multiple
						>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn
									v-on="on"
									>
									<v-icon>mdi-emoticon-happy-outline</v-icon>
								</v-btn>
							</template>
							<span>Emoticon einfügen</span>
						</v-tooltip>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn
									v-on="on"
									>
									<v-icon>mdi-image</v-icon>
								</v-btn>
							</template>
							<span>Bild einfügen</span>
						</v-tooltip>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn
									v-on="on"
									>
									<v-icon>mdi-link-variant</v-icon>
								</v-btn>
							</template>
							<span>Link einfügen</span>
						</v-tooltip>
						
						</v-btn-toggle>
					-->
					<!--
					<vue-editor v-model="content" :editor-toolbar="customToolbar"/>-->

					<peditor v-model="content"></peditor>
					</v-card-text>
					
					<v-card-actions>
						<v-btn rounded color="primary" dark class="mx-3 mb-2 "><v-icon>mdi-content-save</v-icon> speichern</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>

		<!--
		<v-row	>
			<v-col >
				<v-card width=100%>
				Antworten:
				<editor v-model="content">
				</editor>
			</v-card>
			</v-col>
		</v-row>
	-->
	

		</div>
</template>

<script>
// @ is an alias to /src
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

//import { quillEditor } from 'vue-quill-editor'
import SuperSimpleEditor from '@/components/SuperSimpleEditor'
//import { VueEditor } from 'vue2-editor'
export default {
	components: {
            //wysiwyg,
            //quillEditor
            peditor : SuperSimpleEditor,
            //VueEditor
            //ckeditor: CKEditor.component,
        },
	data(){
		return{
			content:'deine Antwort ...',
			customToolbar : [
						['bold'],
						['link', 'image']
					],
            editorOption: {
				modules: {
					toolbar: [
						[{ 'size': ['small', false, 'large'] }],
						['bold', 'italic'],
						[{ 'list': 'ordered'}, { 'list': 'bullet' }],
						['link', 'image']
					],
					history: {
						delay: 1000,
						maxStack: 50,
						userOnly: false
					},
					
					modules: ['Toolbar' ]
					}
			},
			topics: [
				{	
					id:1,
					subject: "Semesterantritsskneipe",
					content: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet",
					created_by: "Alex Ortner",
					created_date: "2020-06-18",
					likes: 5,
					replies: 7
				},
				{
					id:2,
					subject: "Haus-Hüttenwanderung 2020",
					content: "Lorem ipsum dolor sit amet",
					created_by: "Mike Krüger",
					created_date: "2020-06-15",
					likes: 22,
					replies: 1
				},
				{
					id:3,
					subject: "Stiftungsfest 2020",
					content: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet",
					created_by: "Mike Hans",
					created_date: "2020-04-15",
					likes: 22,
					replies: 1
				},
				{
					id:4,
					subject: "Haus-Hüttenwanderung 2019",
					content: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet",
					created_by: "Mike Krüger",
					created_date: "2019-06-01",
					likes: 22,
					replies: 1
				},
				{
					id:5,
					subject: "Haus-Hüttenwanderung 2018",
					content: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet",
					created_by: "Mike Krüger",
					created_date: "2018-06-15",
					likes: 22,
					replies: 1
				}
			],
	}
  },
  methods: {
		forumView(){
			this.$router.push('/forum/')
		},

		handleImageAdded(file, Editor, cursorLocation, resetUploader){
			console.log("TEST")
			console.log(file)
		}
	
    }
}
</script>

<style lang="css">
@import "~vue2-editor/dist/vue2-editor.css";

/* Import the Quill styles you want */
@import '~quill/dist/quill.core.css';
@import '~quill/dist/quill.bubble.css';
@import '~quill/dist/quill.snow.css';

.ql-toolbar.ql-snow {
    border: 0px solid #ccc;}
</style>
