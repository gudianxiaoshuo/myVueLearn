<template>
    <div>
        <el-row>
            <el-col :span="24" >
                <div  style="text-align: left;margin-left:20px">
                    <el-input v-model="input" placeholder="请输入内容" style="width:300px"></el-input>
                    <el-button v-on:click="callCpp">调用C++中的函数，输入框中，输入的为传递给C++的参数</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "CEF",
        created(){
            this.RegistJs();
        },
        data(){
            return {
                input:""
            }
        },
        methods:{
/* 注册一个JS函数：CefJsFunc ，用于在C++中调用
 * param[in] CefJsFunc JS函数的名称，C++ 会使用该名称来调用此回调函数
 * param[in] callback C++执行JS函数后的，回调信息
 */
            RegistJs:function(){
                NimCefWebInstance.register('CefJsFunc', (myPrams) => {
                    console.log(myPrams);
                    this.msg= "收到来自C++的消息:" + JSON.stringify(myPrams);
                    return {
                        message: 'showJs function was executed, this message return by JavaScript.'
                    }
                })
            }
            ,
            callCpp:function(){
                var msg=this.input;
                NimCefWebInstance.call('CefCppFunc',{msg},(error, result) =>
                {
                    console.log(error);
                    console.log(result);
                });
            }
        }
    }
</script>

<style scoped>
    .bg-purple-dark {
        background: #99a9bf;
    }

</style>