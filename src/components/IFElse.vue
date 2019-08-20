<template>

<!-- 1、   v-if测试   -->
<!--    <div>-->
<!--        <p v-if="seen">看到我了</p>-->
<!--        <template v-if="ok">-->
<!--            <h1> 教程</h1>-->
<!--            <p>大学之道 在明明德</p>-->
<!--            <p>呵呵呵</p>-->
<!--        </template>-->
<!--    </div>-->

<!-- 2、  v-if   -->
<!--    v_else   -->
<!--<div>-->
<!--    <div v-if="Math.random()>0.5">-->
<!--        Sorry-->
<!--    </div>-->
<!--    <div v-else>-->
<!--        Not Sorry-->
<!--    </div>-->
<!--</div>-->


<!--    3 v-if-else -->
<!--    <div>-->
<!--        <div v-if="type==='A'">-->
<!--           A-->
<!--        </div>-->
<!--        <div v-else-if="type==='B'">-->
<!--            B-->
<!--        </div>-->
<!--        <div v-else-if="type==='C'">-->
<!--            C-->
<!--        </div>-->
<!--        <div v-else>-->
<!--            Not A B C-->
<!--        </div>-->
<!--    </div>-->


<!--    4、v-show -->
    <div>
        <h1 v-show="ok">
            Hello!
        </h1>
    </div>

</template>

<script>
    export default {
        name: "IFElse",
        data () {
            return{
                seen: false,
                ok: true,
                type:'6'
            }
        }
    }
</script>

<style scoped>

</style>