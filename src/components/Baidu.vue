<template>
    <div>
        关键字:<input type="text" v-model="keyword" @keyup="sendJsonP(keyword)"></input>
        <ol>
            <li v-for="r in result">{{r}}</li>
        </ol>
    </div>
    
</template>

<script>
    export default {
        name: "Baidu",
       data() {
           return {
               keyword: '',
               result: ''
           }
       },
        methods:{
            sendJsonP(keyword){
                let url='https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web';
                this.$axios(url,
                    {
                        params:{
                            wd:keyword
                        },
                        jsonp:'cb'
                    }).then(res=>{
                        if(res.data.g){
                            this.result=res.data.g.map(x=>x['q']);
                        }else
                            this.result=[];
                });
            }


    }
    }
</script>

<style scoped>

</style>