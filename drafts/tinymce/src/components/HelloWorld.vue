<template>
  <content>
    <h1 class="ma-10 pa-1">Tinymce</h1>
    <v-card class="ma-10 pa-1">
      <tinymce id="d1" v-model="data" :toolbar1="toolbar1" :toolbar2="toolbar2"  :other_options="other_options" :plugins="plugins"></tinymce>
    </v-card>
    <v-card class="ma-10 pa-1">https://github.com/dyonir/vue-tinymce-editor</v-card>
  </content>

</template>

<script>
import tinymce from 'vue-tinymce-editor'

  export default {
    components:{
      tinymce
    },
    data () {
      return {
        data:"Warum gehen keine Parameter Optionen",
        
        toolbar1: "formatselect | bold italic | link | numlist bullist | removeformat",
        toolbar2: "codesample image",
        plugins: ["image"],
        other_options:{
            menubar:false
            }
            
        }
      }
    
  }
</script>

