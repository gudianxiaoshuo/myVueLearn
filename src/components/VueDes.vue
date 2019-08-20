<template>
    <div class="vue_det">
        <h1>site : {{site}}</h1>
        <h1>url : {{url}}</h1>
        <h1>{{details()}}</h1>
    </div>
</template>
<script  type="text/javascript">
    var data = { site: "古典小说网", url: "www.gudianxiaoshuo.com", alexa: 10000}
export default {

  name: 'VueDes',
    data () {
      return data;
    },
  // data () {
  //     return {
  //         site: '古典小说网',
  //         url: 'www.gudianxiaoshuo.com',
  //         alexa: '111111'
  //     }
  // },
  methods:{
      details: function(){
          return this.site+ "dddd";
      }
  }
}
</script>
<style scoped>
</style>
