<template>
  <!-- bidirectional data binding（双向数据绑定） -->
  <div>
  <v-layout >
    <v-flex xs6>
      <quillEditor type="biba">
      </quillEditor>
    </v-flex>
  </v-layout>
  </div>

</template>

<script>

  // you can also register quill modules in the component
  //import Quill from 'quill'
  //import { someModule } from '../yourModulePath/someQuillModule.js'
//  Quill.register('modules/someModule', someModule)

  import quillEditor from "./main/Records/Editor"

  export default {
    components:{
      quillEditor
    },


    data () {
      return{
        a: 0,
      }

    },
    // manually control the data synchronization
    // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
    methods: {
    },

  }
</script>
