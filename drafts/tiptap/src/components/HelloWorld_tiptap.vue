<template>
  <content>
    <h1 class="ma-10 pa-1">TipTap</h1>
    <v-card class="ma-10 pa-1">
      <div>
        <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
          <div>
            
            <v-btn :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
              <v-icon>mdi-format-bold</v-icon>
            </v-btn>
            <v-btn :class="{ 'is-active': isActive.italic() }" @click="commands.italic">
              <v-icon>mdi-format-italic</v-icon>
            </v-btn>
            <v-btn :class="{ 'is-active': isActive.heading({ level: 2 }) }" @click="commands.heading({ level: 2 })">
              <v-icon>mdi-format-title</v-icon>
            </v-btn>
            <v-btn :class="{ 'is-active': isActive.bullet_list() }" @click="commands.bullet_list">
              <v-icon>mdi-format-list-bulleted-square</v-icon>
            </v-btn>
            <v-btn :class="{ 'is-active': isActive.ordered_list() }" @click="commands.ordered_list">
              <v-icon>mdi-format-list-numbered</v-icon>
            </v-btn>
          
        </div>
        </editor-menu-bar>
        <editor-content :editor="editor" />
      </div>
    </v-card>
    <v-card class="ma-10 pa-1">https://github.com/scrumpy/tiptap</v-card>

    <v-card class=ma-10 pa-1>
            <v-card-title>Lebenslauf</v-card-title>
                  <v-textarea
                    v-model="value"
                    class="mx-2"
                    label="Eigener Lebenslauf"
                    rows="5"
                    prepend-icon="mdi-file-document"
                    auto-grow
                  ></v-textarea>
                 
          </v-card>
  </content>

</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
} from 'tiptap-extensions'

export default {
  components: {
    EditorMenuBar,
    EditorContent,
  },
  data() {
    return {
      value:"test",
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new BulletList(),
          new OrderedList(),
          new ListItem(),
          new TodoItem(),
          new TodoList(),
          new Bold(),
          new Code(),
          new Italic(),
          new Link(),
          new Strike(),
          new Underline(),
          new History(),
        ],
        content: `
          <h1>Yay Headlines!</h1>
          <p>All these <strong>cool tags</strong> are working now.</p>
        `,
      }),
    }
  },
   watch: {
    value (newValue) {
      this.editor.setContent(this.value)
    }
  },
  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>