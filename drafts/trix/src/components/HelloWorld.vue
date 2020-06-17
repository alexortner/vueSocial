<template>
  <content>
  <h1 class="ma-10 pa-1">Trix Editor</h1>
    <v-card class="ma-10 pa-1">

      <VueTrix v-model="data" placeholder="Enter content" localStorage/>    
    </v-card>
    <v-card class="ma-10 pa-1">https://github.com/hanhdt/vue-trix</v-card>
  </content>

</template>

<script>
import VueTrix from "vue-trix";

  export default {
    components:{
      VueTrix
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

