<template>
  <div>
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
          <a :href="response.url" target="_blank">
            <v-img
            v-if="validImg===true && response.image!==''"
            :src="response.image"
            height="200px"
            v-on:error="validImg=false"
          ></v-img>
        

          <v-card-title>
            {{response.title}}
          </v-card-title>
          </a>
          <v-card-subtitle>
            {{response.description.slice(0, 200)}}
          </v-card-subtitle>
        </v-card>
      </slot>
    </div>
    <div v-else><a :href="url" target="_blank">{{url}}</a></div>
  </div>
</template>

<script>
  // written by Alex Ortner Juli 2020
  // based on the API from https://www.linkpreview.net/

import axios from 'axios'
export default {
  name: 'link-prevue',
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
      response: null,
      validUrl: false,
      validImg: true,
      apiUrl: 'https://api.linkpreview.net',
      apiKey: 'a9ac4b9b75bac8fb672da1f7481513ec',
    }
  },
      
  watch: {
    url: function(value) {
      this.response = null
      console.log(this.url)
      this.getLinkPreview()
    }
  },
  created() {
    console.log(this.url)
    this.getLinkPreview()
  },
 
  methods: {
    
    isValidUrl (url) {
      const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
      this.validUrl = regex.test(url)
      return this.validUrl

    },

    trimUrl(url) {
      return url.replace(/([^\w\s]|_)+(?=\s|$)/,'')
    },

    getLinkPreview() {
    
    if(this.isValidUrl(this.trimUrl(this.url))){
      axios.post(this.apiUrl,{
        q: this.trimUrl(this.url),
        key: this.apiKey
      }).then(resp => {
        // case of valid response
          console.log(resp.data.title)
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

<style scoped>
/* Loader */
.spinner {
  margin-top: 100px;
  margin-left: 222px;
  height: 28px;
  width: 28px;
}
</style>