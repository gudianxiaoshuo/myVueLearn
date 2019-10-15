<template>
  <div class="hello">

    <h2>各种button</h2>
    <el-row class="flex1 margin-left10">
      <el-col :span="3"><el-button>默认按钮</el-button></el-col>
      <el-col :span="3"><el-button type="primary">主要按钮</el-button></el-col>
      <el-col :span="3"><el-button type="success">成功按钮</el-button></el-col>
      <el-col :span="3"><el-button type="warning">警告按钮</el-button></el-col>
      <el-col :span="3"><el-button plain>默认按钮</el-button></el-col>
      <el-col :span="3"><el-button round>默认按钮</el-button></el-col>
    </el-row>
      <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',

  created(){
    this.cefJS();        //创建后，注册JS函数 ， 在C++中调用
    this.callCppFunc();  //择机，调用C++中的函数
  },
  data () {
    return {
      msg: '我的第一个VUE项目1!',

    }
  },


  methods:{
  /* C++调用JS
   * 注册一个回调函数，用于在 C++ 应用中调用
   * param[in] CefJsFunc 回调函数的名称，C++ 会使用该名称来调用此回调函数
   * param[in] callback 回调函数执行体
   */
    cefJS (){
        NimCefWebInstance.register('CefJsFunc', (myPrams) => {
          this.msg= "收到来自C++的消息:" + JSON.stringify(myPrams);
          return {
            message: 'showJs function was executed, this message return by JavaScript.'
          }
        })
    },


    //JS调用C++
    callCppFunc() {
      var message = this.msg;
      NimCefWebInstance.call('CefCppFunc',{message},(error, result) =>
      {
        console.log(result);
      });
   }



}

}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
