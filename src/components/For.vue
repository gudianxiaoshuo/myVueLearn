<template>
<!--    <div>-->
<!--        <ol>-->
<!--            <li v-for="site in sites">-->
<!--                {{site.name}}-->
<!--            </li>-->
<!--        </ol>-->
<!--    </div>-->

    <div id="app">
        <ul>
            <li v-for="value in object">
                {{ value }}
            </li>

            <li v-for="(value, key) in object">
                {{ key }} : {{ value }}
            </li>
        </ul>

        <ul>
            <li v-for="(value, key, index) in object">
                {{ index }}. {{ key }} : {{ value }}
            </li>
        </ul>

        <ul>
            <li v-for="n in 10">
                {{ n }}
            </li>
        </ul>
    </div>

</template>

<script>
    export default {
        name: "For",
        data () {
            return {
                sites: [
                    {name:'Runoob'},
                    {name:'Google'},
                    {name:'Taobao'}
                ],
                object: {
                    name: '菜鸟教程',
                    url: 'http://www.runoob.com',
                    slogan: '学的不仅是技术，更是梦想！'
                }
            }
        }
    }
</script>

<style scoped>

</style>