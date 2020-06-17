<template>
  <div class="news">
    <h1>Mitteilungen</h1>
	<quillEditor
       v-model="content"
       :options="editorOption">
  </quillEditor>
  </div>
</template>

<script>
// @ is an alias to /src
// require styles
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


export default {
	name: 'news',
	components: {
		quillEditor
        },
	data(){
		return{
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
	@import "~vue-wysiwyg/dist/vueWysiwyg.css";
	.wrapper {
	max-width: 800px;
	margin: 10em auto;
	}

</style>
