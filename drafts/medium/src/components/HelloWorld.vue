<template>
  <content>
  <h1 class="ma-10 pa-1">Frola Editor</h1>
    <v-card class="ma-10 pa-1">

      <froala id="edit" :tag="'textarea'" :config="config" v-model="model"></froala>

    </v-card>
    <v-card class="ma-10 pa-1">https://github.com/froala/vue-froala-wysiwyg</v-card>
  </content>

</template>

<script>
import VueFroala from 'vue-froala-wysiwyg';

export default {
  name: 'app',
  data () {
    return {
      config: {
        events: {
          initialized: function () {
            console.log('initialized')
          }
        }
      },
      model: 'Edit Your Content Here!'
    }
  }
}
</script>

