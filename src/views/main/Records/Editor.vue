<template>
  <!-- bidirectional data binding（双向数据绑定） -->

  <div style="background-color: rgba(255,255,255,0.28)">
    <quill-editor
        class="ma-0"
        v-model="content"
        ref="myQuillEditor"
        :options="editorOptions"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)">
    </quill-editor>

    <!-- Or manually control the data synchronization（或手动控制数据流） -->
    <!--<quill-editor :content="content"
                  :options="editorOption"
                  @change="onEditorChange($event)">
    </quill-editor>-->
  </div>
</template>

<script>

  // you can also register quill modules in the component
  //import Quill from 'quill'
  //import { someModule } from '../yourModulePath/someQuillModule.js'
  //  Quill.register('modules/someModule', someModule)

  import editorOptions from "@/views/main/Records/editor-options"

  export default {
    props:['newRecord', 'editRecord'], // newRecord || editRecord

    data () {
      return {
        editorOptions,
        content: this.editRecord? this.editRecord.body : '',
      }
    },
    // manually control the data synchronization
    // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
    methods: {


      onEditorBlur(quill) {
        //console.log('editor blur!', quill)
        //console.log(this.recordType)
      },
      onEditorFocus(quill) {
        //console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
        //console.log('editor ready!', quill)
      },
      onEditorChange({ quill, html, text }) {
        console.log('editor change!', quill, html, text)
        //this.content = html
      }
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      },

/*      writeDone(){
        return this.$store.getters.WRITEDONE
      }*/


    },

    watch:{
/*      writeDone(){
        //console.log(this.writeDone)
        if(this.writeDone) {
          this.$store.dispatch('setRecord', this.content)
        }
      },*/
      content(){
        if(this.newRecord) this.$store.dispatch('writeRecord', this.content)
        else console.log(this.editRecord)
      }
    },

    created() {
      //console.log('this is current quill instance object', this.editor)

    }
  }
</script>
