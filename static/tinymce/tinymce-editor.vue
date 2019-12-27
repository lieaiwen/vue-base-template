<template>
  <div class="tinymce-editor">
    <editor v-model="myValue"
            :init="init"
            :disabled="disabled"
            @onClick="onClick">
    </editor>
  </div>
</template>
<script>
  import tinymce from 'tinymce/tinymce'
  import 'tinymce/themes/silver/theme'
  import Editor from '@tinymce/tinymce-vue'
  import 'tinymce/plugins/wordcount'// 字数统计插件
  import 'tinymce/plugins/image'
  import 'tinymce/plugins/link'
  import 'tinymce/plugins/code'
  import 'tinymce/plugins/table'
  import 'tinymce/plugins/lists'
  import 'tinymce/plugins/contextmenu'
  import 'tinymce/plugins/colorpicker'
  import 'tinymce/plugins/textcolor'
  import 'tinymce/plugins/autolink'
  import 'tinymce/plugins/codesample'
  import 'tinymce/plugins/directionality'
  import 'tinymce/plugins/emoticons'
  import 'tinymce/plugins/fullscreen'
  import 'tinymce/plugins/hr'
  import 'tinymce/plugins/imagetools'

  import 'tinymce/plugins/insertdatetime'
  import 'tinymce/plugins/media'
  import 'tinymce/plugins/nonbreaking'
  import 'tinymce/plugins/noneditable'
  import 'tinymce/plugins/pagebreak'
  import 'tinymce/plugins/tabfocus'
  import 'tinymce/plugins/searchreplace'
  import 'tinymce/plugins/textpattern'
  import 'tinymce/plugins/visualblocks'
  import 'tinymce/plugins/save'
  import 'tinymce/plugins/preview'
  import 'tinymce/plugins/visualchars'
  import 'tinymce/plugins/print'
  import 'tinymce/plugins/paste'
  import 'tinymce/plugins/template'
  import 'tinymce/plugins/spellchecker'
  import 'tinymce/plugins/autosave'
  export default {
    components: {
      Editor
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      // 基本路径，默认为空根目录，如果你的项目发布后的地址为目录形式，
      // 即abc.com/tinymce，baseUrl需要配置成tinymce，不然发布后资源会找不到
      baseUrl: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      menubar: {
        type: String,
        default: 'file edit insert view format table image'
      },
      plugins: {
        type: [String, Array],
        default: function(){
          return ['  autolink autosave code codesample  directionality  fullscreen hr image imagetools insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template  textpattern visualblocks visualchars wordcount']
        }
      },
      toolbar: {
        type: [String, Array],
        default: function(){
          return   ['searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample', 'hr bullist numlist link charmap preview anchor paste pagebreak insertdatetime table emoticons forecolor backcolor fullscreen ima uploadImg uploadVideo']
        }

      }
    },
    data () {
      return {
        init: {
         language_url: '/static/tinymce/langes/zh_CN.js',
          language: 'zh_CN',
          skin_url: '/static/tinymce/skins/ui/oxide', // 这个地方需要注意啦！
          height: 600,
          width:375,
          plugins: this.plugins,
          toolbar: this.toolbar,
          branding: false,
          menubar: this.menubar,
//          emoticons_database_url: '/emojis.js',
          //此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
          //如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
          images_upload_handler: (blobInfo, success, failure) => {
//            console.log(blobInfo)
            const img = 'data:image/jpeg;base64,' + blobInfo.base64()
//            console.log(img)
            success(img)
          }
        },
        myValue: this.value
      }
    },
    mounted () {
      tinymce.init({})
    },
    methods: {
      // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
      // 需要什么事件可以自己增加
      onClick (e) {
        this.$emit('onClick', e, tinymce)
      },
      // 可以添加一些自己的自定义事件，如清空内容
      clear () {
        this.myValue = ''
      }
    },
    watch: {
      value (newValue) {
        this.myValue = newValue
      },
      myValue (newValue) {
        this.$emit('input', newValue)
      }
    }
  }
</script>
