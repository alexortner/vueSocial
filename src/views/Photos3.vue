<template>
  <div class="photos">
	<h1 class="subheading grey--text">Photos 3 - CoolLightBox</h1>

		<!-- ------------------------------------------------------------------
			Toolbar with search, filter and buttons to call the different views
		------------------------------------------------------------------- -->
		
		<v-row class="ma-0 pa-0">
			<!-- Search input form-->
			<v-col 
				class="ma-0 px-1"
				>

				<v-text-field

					label="Suche nach Semester, Jahr oder Veranstaltung"
					v-model="search_value"
					prepend-inner-icon="mdi-magnify"
					clearable
					hide-details
					solo-inverted
					color="grey darken-1">
				</v-text-field>
				
			</v-col>
			<v-col 
				md="auto"
				class="ma-0 mx-4 px-0"
				align="right"
			>
				
				<v-btn rounded large color="indigo" dark><v-icon left large>mdi-plus</v-icon> Bilder hochladen</v-btn>
			</v-col>
		</v-row>
		

		


 <v-row dense ref="imageContainer" class="mx-0">
	<v-col cols=12 lg="3" md="4" sm="6" v-for="(imageItem, i) in images" :key="i">
		<slot name="thumbnail" :imageItem="imageItem" :itemIndex="i" :clickThumbnail="clickThumbnail">
			<v-card>
				<v-responsive :aspect-ratio="1/1">
				<v-hover v-slot="{ hover }">
					<v-img
						:src="imageItem.url"
						@click="clickThumbnail(i)"
						class="image-thumbnail"
						height="100%"
						aspect-ratio=1
						:cover="true"
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
			</v-responsive>
			</v-card>
		</slot>
	</v-col>
	<slot name="lightbox" :imageLinks="imageLinks" :selectedImageIndex="selectedImageIndex"
		:closeGallery="closeGallery" :imageSlide="imageSlide">
		<!--<gallery :images="imageLinks" :index="selectedImageIndex" @close="closeGallery" @onslideend="imageSlide"/>-->
		<coollightbox 
			:items="images" 
			:index="selectedImageIndex"
			:useZoomBar="true"
			@close="selectedImageIndex = null">
  </coollightbox>
	</slot>
</v-row>

<h1>To Do</h1>
	<ul>
		<li>Bilder in Cloud</li>
		<li>Meta Daten Item list in Firestore</li>
		<li>Infinite Scroll Lazy Load</li>
		<li>Search auf firebase direkt</li>
		<li>Upload Viele Bilder mit Semester und Tags</li>
		<li>Migration auf Cloud</li>




	</ul>

		
  </div>
</template>

<script>
// @ is an alias to /src
import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'

export default {
	name: 'photos',
  
	components: { 
		coollightbox: CoolLightBox
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
				src: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/k-mueller-abschied-v-53be/thumbs/phoca_thumb_l_img_0942.jpg",
				alt: "haha"
				},
				{
				id: 2,
				semester: "WS 2004/2005",
				album: "Weihnachtsessen",
				url: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/k-mueller-abschied-v-53be/thumbs/phoca_thumb_l_img_0946.jpg",
				src: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/k-mueller-abschied-v-53be/thumbs/phoca_thumb_l_img_0946.jpg",
				alt: "hoho"
				},
				{
				id: 3,
				semester: "WS 2004/2005",
				album: "Weihnachtsessen",
				url: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/j-eckert-weihnachts-1f33/thumbs/phoca_thumb_l_2014-12-20_101_tma%20weihnachtsesse_eck.jpg",
				src: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/k-mueller-abschied-v-53be/thumbs/phoca_thumb_l_img_0946.jpg",
				alt: "hehe"
				},
				{
				id: 4,
				semester: "WS 2004/2005",
				album: "Ankneipe",
				url: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/k-mueller-abschied-v-53be/thumbs/phoca_thumb_l_img_0946.jpg",
				src: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/k-mueller-abschied-v-53be/thumbs/phoca_thumb_l_img_0946.jpg",
				alt: "ffff"
				},
				{
				id: 5,
				semester: "WS 2004/2005",
				album: "Ankneipe",
				url: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/k-mueller-abschied-v-53be/thumbs/phoca_thumb_l_img_0942.jpg",
				src: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/k-mueller-abschied-v-53be/thumbs/phoca_thumb_l_img_0946.jpg",
				alt: "haha"
				},
				{
				id: 6,
				semester: "WS 2004/2005",
				album: "Ankneipe",
				url: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/k-mueller-abschied-v-53be/thumbs/phoca_thumb_l_img_0946.jpg",
				src: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/k-mueller-abschied-v-53be/thumbs/phoca_thumb_l_img_0946.jpg",
				alt: "hoho"
				},
				{
				id: 7,
				semester: "WS 2004/2005",
				album: "Ankneipe",
				url: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/k-mueller-abschied-v-53be/thumbs/phoca_thumb_l_img_0942.jpg",
				src: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/k-mueller-abschied-v-53be/thumbs/phoca_thumb_l_img_0946.jpg",
				alt: "hehe"
				},
				{
				id: 8,
				semester: "WS 2004/2005",
				album: "Ankneipe",
				url: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/k-mueller-abschied-v-53be/thumbs/phoca_thumb_l_img_0946.jpg",
				src: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/k-mueller-abschied-v-53be/thumbs/phoca_thumb_l_img_0946.jpg",
				alt: "ffff"
				},
				{
				id: 9,
				semester: "WS 2004/2005",
				album: "Ankneipe",
				url: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/k-mueller-abschied-v-53be/thumbs/phoca_thumb_l_img_0946.jpg",
				src: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/k-mueller-abschied-v-53be/thumbs/phoca_thumb_l_img_0946.jpg",
				alt: "ffff"
				},
				{
				id: 10,
				semester: "SS 2014",
				album: "Haus-Hütten Wanderung",
				url: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/p-rode-hahue-wand-2e73/thumbs/phoca_thumb_l_dsc_0178.jpg",
				src: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/p-rode-hahue-wand-2e73/thumbs/phoca_thumb_l_dsc_0178.jpg",
				alt: "ffff"
				},
				{
				id: 11,
				semester: "SS 2014",
				album: "Haus-Hütten Wanderung",
				url: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/p-rode-hahue-wand-2e73/thumbs/phoca_thumb_l_dsc_0199.jpg",
				src: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/p-rode-hahue-wand-2e73/thumbs/phoca_thumb_l_dsc_0199.jpg",
				alt: "ffff"
				},
				{
				id: 12,
				semester: "SS 2014",
				album: "Haus-Hütten Wanderung",
				url: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/p-rode-hahue-wand-2e73/thumbs/phoca_thumb_l_dsc_0228.jpg",
				src: "http://www.markomanno-albertia.de/TMA2/images/phocagallery/p-rode-hahue-wand-2e73/thumbs/phoca_thumb_l_dsc_0228.jpg",
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
