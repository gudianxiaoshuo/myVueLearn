<template>
<!--    0、  -->
    <div>
        <div>
            {{info}}
        </div>
       <div v-for="site in info">
         {{site.name}}
       </div>
    </div>
    
</template>

<script>
    export default {
        name: "Ajax",
        data (){
            return {
                info :null
            }
        },
        mounted(){
            this.$axios

                // .get('https://www.runoob.com/try/ajax/demo_axios_post.php')
                .get('https://roomserver-dev.netease.im/v1/api/rooms/51482099976151/members',
                    {
                        headers:{
                            'Content-Type': 'application/json ',
                            "AppKey" : '81b33512dd86b9f4cffafee279a6149a',

                            'Nonce': '100000',
                            "CurTime" : '1571111474',
                            "CheckSum" : '5ac57b1e49d10e23a5505545815a7bb7f4bc1919',

                        }
                    }


                )
                .then(response=>(this.info=response))
                .catch(function(error){
                    console.log(error);
                });
        }
    }
</script>

<style scoped>

</style>