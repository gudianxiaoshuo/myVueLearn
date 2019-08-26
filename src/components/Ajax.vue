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
                .post('https://www.runoob.com/try/ajax/demo_axios_post.php')
                .then(response=>(this.info=response))
                .catch(function(error){
                    console.log(error);
                });
        }
    }
</script>

<style scoped>

</style>