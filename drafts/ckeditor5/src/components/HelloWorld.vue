<template>
  <content>
  <h1 class="ma-10 pa-1">CK5 Editor</h1>
    <v-card class="ma-10 pa-1">

        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" ></ckeditor>
    </v-card>
    <v-card class="ma-10 pa-1">
      Buttons konfigurierbar<br>
      Bilder upload geht
    </v-card>
    <v-card class="ma-10 pa-1">
      <a href="https://github.com/ckeditor/ckeditor5-vue">https://github.com/ckeditor/ckeditor5-vue></a><br>
      <a href="https://ckeditor.com/ckeditor-5/demo/#classic">https://ckeditor.com/ckeditor-5/demo/#classic</a><br>
      <a href="https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editorconfig-EditorConfig.html">https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editorconfig-EditorConfig.html</a><br>
    </v-card>
  </content>

</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


  export default {
    components:{
      ckeditor: CKEditor.component
    },
    data () {
      return {
        data:"Warum gehen keine Parameter Optionen",
        
        editor: ClassicEditor,
        editorData: '<p>Content of the editor.</p>',
        editorConfig: {
                     toolbar: [ 'heading','|','bold', 'italic', '|', 'numberedList', 'bulletedList' ],
                    
                     language: 'de'
                }
        }
      }
    
  }
</script>

