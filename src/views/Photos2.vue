<template>
  <div class="photos">
	<h1 class="subheading grey--text">Photos 2 - VueGallery</h1>
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

		


 <v-row dense ref="imageContainer" class="mx-0">
	<v-col cols=12 lg="3" md="4" sm="6" v-for="(imageItem, i) in images" :key="i">
		<slot name="thumbnail" :imageItem="imageItem" :itemIndex="i" :clickThumbnail="clickThumbnail">
			<v-card>
				<v-hover v-slot="{ hover }">
					<v-img
						:src="imageItem.url"
						@click="clickThumbnail(i)"
						class="image-thumbnail"
						max-height="300px"
					>
					<v-expand-transition>
						<v-row v-if="hover" class="ma-0 image-title-background">
							<v-col class="text-truncate ma-2">
								{{imageItem.semester}} | {{imageItem.album}}
							</v-col>
							<v-col class="flex-shrink-1 flex-grow-0 d-inline-flex" >
								<v-btn v-if="deletable" icon @click="clickDelete(i)" fab small>
									<v-icon>mdi-delete</v-icon>
								</v-btn>
							</v-col>
						</v-row>
					</v-expand-transition>
					</v-img>
				</v-hover>
			</v-card>
		</slot>
	</v-col>
	<slot name="lightbox" :imageLinks="imageLinks" :selectedImageIndex="selectedImageIndex"
		:closeGallery="closeGallery" :imageSlide="imageSlide">
		<gallery :images="imageLinks" :index="selectedImageIndex" @close="closeGallery" @onslideend="imageSlide"/>
	</slot>
</v-row>


		
  </div>
</template>

<script>
// @ is an alias to /src
import VueGallery from 'vue-gallery';

export default {
	name: 'photos',
  
	components: { 
		'gallery': VueGallery
	},
  data(){
		return{
			overlay: false,
			dialog: false,
			semester: null,
			album: null,
			deletable: false,
			selectedImageIndex:null,
			images: [
				{
				id: 1,
				semester: "WS 2004/2005",
				album: "Weihnachtsessen",
				url: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/k-mueller-abschied-v-53be/thumbs/phoca_thumb_l_img_0942.jpg",
				alt: "haha"
				},
				{
				id: 2,
				semester: "WS 2004/2005",
				album: "Weihnachtsessen",
				url: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/k-mueller-abschied-v-53be/thumbs/phoca_thumb_l_img_0946.jpg",
				alt: "hoho"
				},
				{
				id: 3,
				semester: "WS 2004/2005",
				album: "Weihnachtsessen",
				url: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/j-eckert-weihnachts-1f33/thumbs/phoca_thumb_l_2014-12-20_101_tma%20weihnachtsesse_eck.jpg",
				alt: "hehe"
				},
				{
				id: 4,
				semester: "WS 2004/2005",
				album: "Ankneipe",
				url: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/k-mueller-abschied-v-53be/thumbs/phoca_thumb_l_img_0946.jpg",
				alt: "ffff"
				},
				{
				id: 5,
				semester: "WS 2004/2005",
				album: "Ankneipe",
				url: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/k-mueller-abschied-v-53be/thumbs/phoca_thumb_l_img_0942.jpg",
				alt: "haha"
				},
				{
				id: 6,
				semester: "WS 2004/2005",
				album: "Ankneipe",
				url: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/k-mueller-abschied-v-53be/thumbs/phoca_thumb_l_img_0946.jpg",
				alt: "hoho"
				},
				{
				id: 7,
				semester: "WS 2004/2005",
				album: "Ankneipe",
				url: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/k-mueller-abschied-v-53be/thumbs/phoca_thumb_l_img_0942.jpg",
				alt: "hehe"
				},
				{
				id: 8,
				semester: "WS 2004/2005",
				album: "Ankneipe",
				url: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/k-mueller-abschied-v-53be/thumbs/phoca_thumb_l_img_0946.jpg",
				alt: "ffff"
				},
				{
				id: 9,
				semester: "WS 2004/2005",
				album: "Ankneipe",
				url: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/k-mueller-abschied-v-53be/thumbs/phoca_thumb_l_img_0946.jpg",
				alt: "ffff"
				}
			]
		}
  },
  computed: {
    //get array of links only
    imageLinks () {
      return this.images.map(imageItem => {
        return imageItem.url
      })
    }
  },
  methods: {
    clickThumbnail (index) {
      this.selectedImageIndex = index
    },
    closeGallery () {
      this.selectedImageIndex = null
    },
    imageSlide ({ index }) {
      this.$emit('imageViewed', this.imageItems[index])
    },
  },
 
}
</script>
<style scoped>
	.rounded-card{
    border-radius:10px;
}

.image-title-background {
    background-color: white;
    opacity: 0.7;
  }
</style>
