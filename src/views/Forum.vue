<template>
  <div class="forum">
    <h1 class="subheading grey--text">Diskussionsforum</h1>

    <v-data-iterator
      :items="topics"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
		<template v-slot:header>
			<v-toolbar height="79">
				<v-text-field
					v-model="search"
					prepend-inner-icon="mdi-magnify"
					clearable
					hide-details
					outlined
					color="grey darken-1"
					label="Search"
				></v-text-field>

				<template v-if="$vuetify.breakpoint.smAndUp">
					<div class="mx-2"></div>
					<v-btn-toggle
						v-model="sortDesc"
						mandatory
					>
						<v-btn
							depressed
							:value="false"
						>
							<v-icon>mdi-arrow-up</v-icon>
						</v-btn>
						<v-btn
							depressed
							:value="true"
						>
							<v-icon>mdi-arrow-down</v-icon>
						</v-btn>
					</v-btn-toggle>
				</template>
				<div class="mx-3"></div>
				<v-btn rounded large color="indigo" dark >
					<v-icon left >mdi-message-plus</v-icon>  
					<span v-if="$vuetify.breakpoint.mdAndUp">Neuen Beitrag erstellen</span>
					<span v-else>Neu</span>
				</v-btn>
				
			</v-toolbar>
		</template>

		<template v-slot:default="props">
			<v-row class="my-5">
				<v-col
					v-for="item in props.items"
					:key="item.created_date"
					cols="12"
				>
					<v-card @click="forumViewPost(item.id)">
						
						<v-list-item>
							<v-list-item-avatar color="red darken-4 white--text" size="62">AO</v-list-item-avatar>
							<v-list-item-content>
								<v-list-item-title class="headline">{{item.subject}}</v-list-item-title>
								<v-list-item-subtitle>von {{item.created_by}} am {{item.created_date}}</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
						<v-card-text>
							{{item.content.slice(0, 500)}}
						</v-card-text>

						<v-card-actions>
							<v-icon class="mx-2">mdi-thumb-up</v-icon> {{item.likes}}
							<div class="mx-3"></div>
							<v-icon class="mx-2">mdi-message-processing</v-icon> {{item.replies}} Antworten

							<v-spacer></v-spacer>

							<v-btn text color="deep-purple accent-4">
								LESEN
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>
		</template>

      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                text
                color="primary"
                class="ml-2"
                v-bind="attrs"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span
            class="mr-4
            grey--text"
          >
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="mr-1"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="ml-1"
            @click="nextPage"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>

	
	

  </div>
</template>

<script>
// @ is an alias to /src

export default {
	name: 'forum',

	data(){
		return{
			showPost: false,
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
					content: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet",
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

			itemsPerPageArray: [4, 8, 12],
			search: '',
			filter: {},
			sortDesc: false,
			page: 1,
			itemsPerPage: 4,
			sortBy: 'created_date',
			
			
		}
  },
  computed: {
      numberOfPages () {
        return Math.ceil(this.topics.length / this.itemsPerPage)
      },
  },
  methods: {
      nextPage () {
        if (this.page + 1 <= this.numberOfPages) this.page += 1
      },
      formerPage () {
        if (this.page - 1 >= 1) this.page -= 1
      },
      updateItemsPerPage (number) {
        this.itemsPerPage = number
      },
      forumViewPost(id){
		console.log(id)
		this.$router.push('/forum/'+id)
      },
	tester(){
		console.log("test")
	}
    },

 
}
</script>
