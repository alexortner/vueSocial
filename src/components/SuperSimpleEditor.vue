<template>
  <div>
  <div ref="toolbar" id="toolbar">
   
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  v-on="on"
                  class ="ql-header"
                  value="2"
                  >
                  <v-icon>mdi-format-title</v-icon>
                </v-btn>
              </template>
              <span>Titel</span>
            </v-tooltip>
            
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn class="ql-bold"
                  v-on="on"
                  >
                  <v-icon>mdi-format-bold</v-icon>
                </v-btn>
              </template>
              <span>Fett</span>
            </v-tooltip>
              <!--
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn class="ql-italic"
                  v-on="on"
                  >
                  <v-icon>mdi-format-italic</v-icon>
                </v-btn>
              </template>
              <span>Kursiv</span>
            </v-tooltip>
            -->
          
            <span class="mx-2"></span>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  v-on="on"
                  @click="tester"
                  >
                  <v-icon>mdi-emoticon-happy-outline</v-icon>
                </v-btn>
              </template>
              <span>Emoticon einfügen</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  v-on="on"
                  class="ql-image"
                  >
                  <v-icon>mdi-image</v-icon>
                </v-btn>
              </template>
              <span>Bild einfügen</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  v-on="on"
                  class="ql-link"
                  >
                  <v-icon>mdi-link-variant</v-icon>
                </v-btn>
              </template>
              <span>Link einfügen</span>
            </v-tooltip>
            
 
 
</div>
  <div ref="editor" id="editor">
    Please enter your text here ...
  </div>
  <div>Test 4:<br>{{value}} 
    
   <br><br>
   <span v-for="item in ops2" :key = "item.id">
   
      <link-prevue v-if="item.url" :url=item.value>
  </link-prevue>
   <span v-else>{{item.value}}</span>
   </span>
</div>
</div>
</template>
 
<script>
import Quill from "quill";

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import LinkPrevue from '@/components/LinkPreview'

 
export default {
  name: "SuperSimpleEditor",
  components: {
    LinkPrevue
  },
  props:{
    value: {
      type: String,
      default: ''
    }
  },

  data(){
		return{
			editor: '',
      toolbar: '',
			test: 'Test Markomanno-Albertia: http://www.markomanno-albertia.de test RecEvo: https://www.record-evolution.de, dann ein Test von ebay https://www.ebay.de/itm/Berlin-Couleurkarte-Corps-Marchia-um-1930/392869607474?hash=item5b78da7832:g:9ecAAOSw9JNfCbuU aber auch amazon https://www.amazon.de/dp/3440156222/?coliid=IDPP2CC2DVYEH&colid=1G17XFEB7U4U5&psc=1&ref_=lv_ov_lig_dp_it und dann noch youtube https://www.youtube.com/watch?v=EJTXN9kAAm0',
      ops2:[],
      
		}
	},

  watch: {
    value(val) {
      if (val != this.editor.root.innerHTML && !this.editor.hasFocus()) {
        this.editor.root.innerHTML = val;
      }
    },
    disabled(status) {
      this.editor.enable(!status);
    }
  },

  mounted(){

    this.editor = new Quill(this.$refs.editor,{
      modules: {
        toolbar: {container: this.$refs.toolbar},

      },
     // theme: 'snow', //bubble
    });

    console.log(this.test)
    const REGEXP_GLOBAL2 = /https?:\/\/[^\s]+/g;    
    const matches = this.test.match(REGEXP_GLOBAL2);

    if (matches && matches.length > 0) {
      let ops = ''
      let str = this.test
      console.log('str',str)
      let i = 0
      matches.forEach(match => {
        const split = str.split(match);
        const beforeLink = split.shift();
        console.log('beforeLink',i,beforeLink)
        this.ops2.push({url:false,value:beforeLink, id:i})
        i=i+1
        this.ops2.push({url:true,value:match, id:i})
        i=i+1
        ops= ops + beforeLink
        ops= ops + '###' + match + '###'
        console.log('ops',i,ops)
        str = split.join(match);
        
      });
      console.log(this.ops2)
    }




    let BlockEmbed = Quill.import('blots/block/embed');
    //class EmojiBlot extends BlockEmbed {}
    class ImageBlot extends BlockEmbed {
      static create(value) {
        let node = super.create();
        node.setAttribute('alt', value.alt);
        node.setAttribute('src', value.url);
        return node;
      }

      static value(node) {
        return {
          alt: node.getAttribute('alt'),
          url: node.getAttribute('src')
        };
      }
    }
    ImageBlot.blotName = 'image2';
    ImageBlot.tagName = 'img';
    Quill.register(ImageBlot);


    this.editor.root.innerHTML = this.value;
    this.editor.on('text-change', () => this.update());

    

    const REGEXP_GLOBAL = /https?:\/\/[^\s]+/g;
    const REGEXP_WITH_PRECEDING_WS = /(?:\s|^)(https?:\/\/[^\s]+)/;


    const sliceFromLastWhitespace = (str) => {
      const whitespaceI = str.lastIndexOf(' ');
      const sliceI = whitespaceI === -1 ? 0 : whitespaceI + 1;
      return str.slice(sliceI);
    };

    this.editor.keyboard.addBinding({
      collapsed: true,
      key: ' ',
      prefix: REGEXP_WITH_PRECEDING_WS,
      handler: (range, context) => {
        console.log("###-handler")
        const url = sliceFromLastWhitespace(context.prefix);
        const retain = range.index - url.length;
        const ops = retain ? [{ retain }] : [];
        ops.push(
          { 'delete': url.length },
          { insert: url, attributes: { link: url } }
        );
        this.editor.updateContents({ ops });
        return true;
    }
    });

   
  },

  methods: {
            update() {
                this.$emit('input', this.editor.getText() ? this.editor.root.innerHTML : '');
            },
            tester(){
              console.log("Tester called")
              //this.editor.insertEmbed(1, 'image', 'https://upload.wikimedia.org/wikipedia/de/thumb/4/46/HJK_Helsinki.svg/1920px-HJK_Helsinki.svg.png');
              console.log(this.editor.getSelection())
              console.log(this.urlify(this.editor.getText()))
            },
            urlify(text) {
              var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
              //var urlRegex = /(https?:\/\/[^\s]+)/g;
              return text.replace(urlRegex, function(url,b,c) {
                var url2 = (c == 'www.') ?  'http://' +url : url;
                return '<a href="' +url2+ '" target="_blank">' + url + '</a>';
                }) 
            },

        }
  
}
</script>
<style>

.btnalex{
  height: 48;
}

  </style>