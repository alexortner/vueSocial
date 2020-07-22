<template>
  <div class="events">
    <h1> Tester Vue</h1>
    <h3>Test LinkPreview Parser</h3>
	<!--<link-prevue 
		url="https://www.record-evolution.de">
    </link-prevue>-->
    <div id="loader-container" v-if="!response && validUrl">
      <slot name="loading">
        <v-progress-circular indeterminate color="grey" class="spinner"></v-progress-circular>
      </slot>
    </div>
    <div v-if="response">
      <slot :img="response.image" :title="response.title" :description="response.description" :url="url">
        <v-card
          flat
          max-width="444"
        >
          <v-img
            v-if="validImg===true && response.image!=='' "
            :src="response.image"
            height="200px"
            v-on:error="validImg=false"
          ></v-img>

          <v-card-title>
            {{response.title}}
          </v-card-title>

          <v-card-subtitle>
            {{response.description}}
          </v-card-subtitle>
          <v-spacer></v-spacer>
          <v-card-actions>
            
          </v-card-actions>
        </v-card>
      </slot>
    </div>
    <link-prevue url="http://www.markomanno-albertia.de">
    </link-prevue>
  </div>
</template>

<script>
// @ is an alias to /src
import LinkPrevue from '@/components/LinkPreview'
import axios from 'axios'

export default {
  name: 'events',
  components: {
    LinkPrevue
  },
  data(){
		return{
			apiUrl: 'https://api.linkpreview.net',
			apiKey: 'a9ac4b9b75bac8fb672da1f7481513ec',
			validUrl: false,
			validImg: true,
			response: null,
			testUrl: 'http://www.markomanno-albertia.de',
			test: 'https://www.record-evolution.de asdfkasdfjkjsd löasdf asdf asdf https://www.ebay.de/itm/Berlin-Couleurkarte-Corps-Marchia-um-1930/392869607474?hash=item5b78da7832:g:9ecAAOSw9JNfCbuU aber auch https://www.amazon.de/dp/3440156222/?coliid=IDPP2CC2DVYEH&colid=1G17XFEB7U4U5&psc=1&ref_=lv_ov_lig_dp_it',


		}
  },
  created() {
    this.getLinkPreview(this.testUrl)
  },
  methods: {
	isValidUrl(url) {
		const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
		this.validUrl = regex.test(url)
		return this.validUrl
    },

	getLinkPreview(url) {
		if(this.isValidUrl(url)){
			axios.post(this.apiUrl,{
				q: url,
				key: this.apiKey
			}).then(resp => {
				// case of valid response
					console.log(resp.data)
					this.response = resp.data
				}).catch(error => {
					console.log(error)
					this.response = null
					this.validUrl = false
				})

		}
		

	}
	}


 
}
</script>
