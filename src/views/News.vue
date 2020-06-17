<template>
  <div class="news">
    <h1>Mitteilungen</h1>
    <!--<div id="app">
        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
    </div>
	<v-btn @click="test"><v-icon left>mdi-email</v-icon><span>Test</span></v-btn>
	<wysiwyg v-model="editorData" class="wrapper" ></wysiwyg>-->
	<quillEditor
       v-model="content"
       :options="editorOption">
  </quillEditor>
  </div>
</template>

<script>
// @ is an alias to /src
//import CKEditor from '@ckeditor/ckeditor5-vue';
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import wysiwyg from "vue-wysiwyg";

// require styles
//import Quill from 'quill'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'



export default {
  name: 'news',
  components: {
            //wysiwyg,
            quillEditor
            //ckeditor: CKEditor.component,
        },
  data(){
		return{
			content:'asdfadf',
            editorData: '<p>Content of the editor.</p>',
            editorOption: {
				modules: {
					toolbar: [
						[{ 'size': ['small', false, 'large'] }],
						['bold', 'italic'],
						[{ 'list': 'ordered'}, { 'list': 'bullet' }],
						['link', 'image']
					],
					history: {
						delay: 1000,
						maxStack: 50,
						userOnly: false
					},
					
					modules: ['Toolbar' ]
					}
			},
            editorConfig: {
                    
                    toolbar: {
                        items: ["heading","bold", "italic", "|","imageUpload",  "imageStyle:full", "imageStyle:side","|", "link","mediaEmbed"],
                        heading: {
							options: [
								{modelElement: 'paragraph', title: 'Text', class: 'ck-heading_paragraph'},
								{modelElement: 'heading1', viewElement: 'h1', title: 'dberschrift', class: 'ck-heading_heading1'},
								{modelElement: 'heading2', viewElement: 'h2', title: 'Untertitel', class: 'ck-heading_heading2'}							]
						}
                    }
                }
			
		}
  },
methods:{
	test(){
		console.log(Array.from(this.ckeditor))
	}
  }
 
}
</script>
<style>
	.wrapper {
	max-width: 800px;
	margin: 10em auto;
	}

</style>
