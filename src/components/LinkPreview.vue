<template>
  <lixios>
    <div slot-scope="{ state, actions }">
      // use your own mark
      haha
    </div>
  </lixios>
</template>
 
<script>
import { Linxios } from "@webdataorg/linxios-vue";
 
export default {
  components: {
    lixios : Linxios
  },
  data(){
		return{
			state: '',
			actions: ''
		}
	}
}
</script>