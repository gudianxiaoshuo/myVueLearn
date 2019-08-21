<template>
    <div>
        {{info}}
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
                .get('https://www.runoob.com/try/ajax/json_demo.json')
                .then(response=>(this.info=response))
                .catch(function(error){
                    console.log(error);
                });
        }
    }
</script>

<style scoped>

</style>