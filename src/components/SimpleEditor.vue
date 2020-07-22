<template>
  <div ref="editor" v-html="value"></div>
</template>
 
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import Quill from "quill";
 
export default {
  props:{
    value: {
      type: String,
      default: ''
    }
  },

  data(){
		return{
			editor: '',
			test: ''
		}
	},

  mounted(){
    var icons = Quill.import('ui/icons');
    icons['bold'] = '<i aria-hidden="true" class="v-icon mdi mdi-format-bold theme--light"></i>';
    icons['italic'] = '<i aria-hidden="true" class="v-icon mdi mdi-format-italic theme--light"></i>';
    icons['image'] = '<i aria-hidden="true" class="v-icon mdi mdi-image theme--light"></i>';
    icons['list']['ordered'] = '<i aria-hidden="true" class="v-icon mdi mdi-format-list-numbered theme--light"></i>';
    icons['list']['bullet'] = '<i aria-hidden="true" class="v-icon mdi mdi-format-list-bulleted theme--light"></i>';
    icons['link'] = '<i aria-hidden="true" class="v-icon mdi mdi-link-box-variant theme--light"></i>';


    this.editor = new Quill(this.$refs.editor,{
      modules: {
        toolbar: [
            //[{ header: [1, 2, false] }],
            ['bold'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'image']
          ],
      },
      theme: 'snow', //bubble
      formats: ['bold','italic','header']
    });
    this.editor.root.innerHTML = this.value;

    this.editor.on('text-change',()=>{})
  },
  methods: {
    update() {
      this.$emit('input',this.editor.getText() ? this.editor.root.innerHTML : '');
    }
  }
}
</script>
<style>
.ql-toolbar.ql-snow {
    border: 0px solid #ccc;}

.ql-editor {
  padding: 0px 0px;
}
  </style>