<template>
  <div class="photos">
	<h1 class="subheading grey--text">Photos</h1>
		<!-- ------------------------------------------------------------------
			Toolbar with search, filter and buttons to call the different views
		------------------------------------------------------------------- -->
		<v-card class="my-3 px-3 elevation-5" >
			<v-row >
				<!-- Search input form-->
				<v-col 
					cols="12"
					sm="6"
					md="4"

					align="center"
					
					>

					<v-select
						label="Semester wählen"
						v-model="filter_values"
						:items="filter_items"
						hide-details
						color="grey darken-2"
						dense
					></v-select>
					
				</v-col>
				<!-- select form for ortsgruppe filter-->
				<v-col
					cols="12"
					sm="6"
					md="4"
					align="center"
					>
					<v-select
						label="Album wählen"
						v-model="filter_values"
						:items="filter_items"
						hide-details
						color="grey darken-2"
						dense
					></v-select>
				</v-col>
			</v-row>
		</v-card>

		<v-card class="my-3 px-3 elevation-5" >
			<v-row
				class="mb-6"
				no-gutters
				>
				<v-col
					cols="12"
					md="3"
					sm="6"
					v-for="n in 6"
					:key="n"
					>
						<v-card
							class="pa-2"
							tile
							outlined
						>
							col
						</v-card>
				</v-col>
			</v-row>
		</v-card>


		<v-dialog
			v-model="dialog"
		>
			<v-card>
				<v-card-actions>
					Semester - Album
					<v-spacer></v-spacer>
					<v-btn icon @click="dialog = false">
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</v-card-actions>

			<v-carousel hide-delimiters>
				<v-carousel-item
					v-for="(item,i) in images"
					:key="i"
					:src="item.url"
				>
				</v-carousel-item>
			</v-carousel>

			</v-card>
		</v-dialog>

      <v-card>
        <v-container fluid>
          <v-row>
            <v-col
				v-for="image in images"
				:key="image"
				class="d-flex"
				cols="12"
				sm="6"
				md="4"
				lg="3"

            >
              <v-card shaped class="rounded-card">
                <v-img
                  :src="image.url"
                  :lazy-src="image.url"
                  aspect-ratio="1"
                  class="grey lighten-2"
                  @click.stop="dialog = true"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
  </div>
</template>

<script>
// @ is an alias to /src
//import { Stack, StackItem } from "vue-stack-grid";

export default {
  name: 'photos',
  
 // components: { 
 //   Stack, 
 //   StackItem 
  //},
  data(){
		return{
			overlay: false,
			dialog: false,
			semester: null,
			album: null,
			images: [
				{
				id: 1,
				semester: "Wintersemester 2004/2005",
				url: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/k-mueller-abschied-v-53be/thumbs/phoca_thumb_l_img_0942.jpg",
				alt: "haha"
				},
				{
				id: 2,
				semester: "Wintersemester 2004/2005",
				url: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/k-mueller-abschied-v-53be/thumbs/phoca_thumb_l_img_0946.jpg",
				alt: "hoho"
				},
				{
				id: 3,
				semester: "Wintersemester 2004/2005",
				url: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/j-eckert-weihnachts-1f33/thumbs/phoca_thumb_l_2014-12-20_101_tma%20weihnachtsesse_eck.jpg",
				alt: "hehe"
				},
				{
				id: 4,
				semester: "Wintersemester 2004/2005",
				url: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/k-mueller-abschied-v-53be/thumbs/phoca_thumb_l_img_0946.jpg",
				alt: "ffff"
				},
				{
				id: 5,
				semester: "Wintersemester 2004/2005",
				url: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/k-mueller-abschied-v-53be/thumbs/phoca_thumb_l_img_0942.jpg",
				alt: "haha"
				},
				{
				id: 6,
				semester: "Wintersemester 2004/2005",
				url: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/k-mueller-abschied-v-53be/thumbs/phoca_thumb_l_img_0946.jpg",
				alt: "hoho"
				},
				{
				id: 7,
				semester: "Wintersemester 2004/2005",
				url: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/k-mueller-abschied-v-53be/thumbs/phoca_thumb_l_img_0942.jpg",
				alt: "hehe"
				},
				{
				id: 8,
				semester: "Wintersemester 2004/2005",
				url: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/k-mueller-abschied-v-53be/thumbs/phoca_thumb_l_img_0946.jpg",
				alt: "ffff"
				},
				{
				id: 9,
				semester: "Wintersemester 2004/2005",
				url: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/k-mueller-abschied-v-53be/thumbs/phoca_thumb_l_img_0946.jpg",
				alt: "ffff"
				}
			]
		}
  }
 
}
</script>
<style scoped>
	.rounded-card{
    border-radius:10px;
}
</style>
