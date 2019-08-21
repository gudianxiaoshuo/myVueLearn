<template>

<!--    0 、 数据绑定最常见的形式就是使用 {{...}}（双大括号）的文本插值：-->
<!--    <div>-->
<!--        <p>{{message}}</p>-->
<!--    </div>-->

<!-- 1、   v-html示例-->
<!--    使用 v-html 指令用于输出 html 代码：-->
<!--    <div v-html="htmlContent">-->
<!--    </div>-->


<!-- 2、   v-bind:参数
    参数 参数在指令后以冒号指明。
    以下实例判断 class1 的值，如果为 true 使用 class1 类的样式，否则不使用该类：
-->

<!--    <div>-->
<!--        <div >-->
<!--        <label for="r1">修改颜色</label><input type="checkbox" v-model="use"  id="r1">-->
<!--        <br><br>-->
<!--            <div v-bind:class="{'class1':use}">-->
<!--            v-bind:class 指令-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->

<!--    在这里 href 是参数，告知 v-bind 指令将该元素的 href 属性与表达式 url 的值绑定。-->

<!--    <div id="app">-->
<!--        <pre><a v-bind:href="url">菜鸟教程</a></pre>-->
<!--    </div>-->







<!--3、表达式-->
<!--&lt;!&ndash; 表达式 Vue.js 都提供了完全的 JavaScript 表达式支持&ndash;&gt;-->
<div id="app">
    {{5+5}}<br>
    {{ok? 'YES':'NO'}}<br>
    {{message.split('').reverse().join('')}}
    <div v-bind:id="'list-'+subId">菜鸟教程</div>
</div>



<!--    4、 v-if  -->
<!--    <div>-->
<!--        <p v-if="seen">看到我了么</p>-->
<!--    </div>-->


<!-- 5、 v-on 监听DOM事件-->
<!--<div>-->
<!--    <p>{{message}}</p>-->
<!--    <button v-on:click="reverseMessage">翻转字符串</button>-->
<!--</div>-->


<!--    6、过滤器-->
<!--    Vue.js 允许你自定义过滤器，被用作一些常见的文本格式化。由"管道符"指示, 格式如下：-->
<!--        &lt;!&ndash; 在两个大括号中 &ndash;&gt;-->
<!--        {{ message | capitalize }}-->

<!--        &lt;!&ndash; 在 v-bind 指令中 &ndash;&gt;-->
<!--        <div v-bind:id="rawId | formatId"></div>-->


<!--    首字母大写 示例-->
<!--    <div>-->
<!--        {{message|capitalize}}-->
<!--    </div>-->

    <!--    7 缩写-->
<!--        v-bind 缩写-->
<!--        Vue.js 为两个最为常用的指令提供了特别的缩写：-->

<!--        &lt;!&ndash; 完整语法 &ndash;&gt;-->
<!--        <a v-bind:href="url"></a>-->
<!--        &lt;!&ndash; 缩写 &ndash;&gt;-->
<!--        <a :href="url"></a>-->


<!--        v-on 缩写-->

<!--        &lt;!&ndash; 完整语法 &ndash;&gt;-->
<!--        <a v-on:click="doSomething"></a>-->
<!--        &lt;!&ndash; 缩写 &ndash;&gt;-->
<!--        <a @click="doSomething"></a>-->

</template>

<script>
    export default {
        name: "VModel",
        data(){
            return {
                htmlContent:'<h1>菜鸟教程</h1>',
                use: true,
                ok:true,
                message: "a古典小说",
                subId:1,
                seen: false,
                url: 'http://www.runoob.com'
            }
        },
        methods:{
            reverseMessage:function(){
                this.message=this.message.split("").reverse().join("")
            }
        },
        filters:{
            capitalize:function(value){
                if(!value)
                    return '';
                value=value.toString()
                return  value.charAt(0).toUpperCase()+value.slice(1)
            }
        }
    }
</script>






<style scoped>
.class1{
    background:#444444;
    color:#eee;
}
</style>