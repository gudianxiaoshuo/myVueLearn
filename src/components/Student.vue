<template>
    <!--    0、  -->
    <div class="container">
       <div class="jumpbotron row justify-content-center " style="margin-bottom:30px">
               <b-button variant="primary" v-on:click="getClass">获得最近课程</b-button>
       </div>

        <div v-for="site in info" class="row justify-content-center  align-items-center">
            <b-card
                                    :title=site.course.name
                                    :img-src=site.course.cover_url
                                    img-alt="Image"
                                    img-top
                                    tag="article"
                                    style="max-width: 20rem; min-width:20rem;"
                                    class="mb-5"
                            >
                                <b-card-text>
                                  {{site.name}}
                                </b-card-text>

                                    <template v-if="(site.live_status==1||site.live_status==4)">
                                         <b-button v-on:click="callCpp(site)" variant="primary">去上课</b-button>
                                    </template>

                                    <template v-else-if="(site.live_status==2)">
                                        <b-button v-on:click="callCpp(site)" variant="warning">看回放</b-button>
                                    </template>

                                    <template v-else-if="(site.live_status==3)">
                                         <b-button v-on:click="callCpp(site)" >缺课</b-button>
                                    </template>

                                   <template v-else>
                                    <b-button v-on:click="callCpp(site)" >未开始</b-button>
                                   </template>

                            </b-card>
                </div>



         <el-dialog
                                    title="正在加载中..."
                                    :visible.sync="dialogVisible"
                                    width="30%"
                                    :before-close="handleClose">
                    <!--            <span>这是一段信息</span>-->
            <img src="../assets/images/loading.gif" height="100" width="120"/>

<!--            <span slot="footer" class="dialog-footer">-->
<!--            <el-button @click="dialogVisible = false">取 消</el-button>-->
<!--            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
<!--            </span>-->
        </el-dialog>


    </div>

</template>

<script>
    export default {
        name: "Ajax",
        data (){
            return {
                bStyle:"success",
                showDismissibleAlert:true,
                dismissSecs: 10,
                dismissCountDown: 10,
          //       tableData:[{name:site.course.name},{name:"2"}],
                dialogVisible: false,

                seen:false,
                from :"pc",
                qid:"",
                src:"25",
                gid:"40267293",
                passport:"bxYIyushgvX0ZO4EEshFCT2w07M=",
                role:"student",
                info:""
                // classInfo:{
                //     chapter_start_time:1566815400000,
                //     chapter_end_time:1566815400000,
                //     qid:2981269,
                //     course_id:4308,
                //     chapter_id:3301
                // }

            }
        },
        methods:{
            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown
            },
            showAlert() {
                this.dismissCountDown = this.dismissSecs
            },
            getClass () {
                let params = {
                    from :"pc",
                    page:1,
                    limit:400,
                    qid:"",
                    src:"25",
                    gid: this.gid,
                    passport:this.passport,
                    role:"student",

                }
                let qs=require('qs')
                let qsParam=qs.stringify(params);

                console.log(qsParam);

                this.$axios({
                    // url:'https://org-xdev.xnw.com:8448/qun/ajax_live.php',
                    url:'https://org-xdev.xnw.com:8448/v2/course/get_my_live_chapter_list',
                    method: 'POST',
                    data: qsParam

                })
                    .then(res => {

                        let ret = res.data

                        this.info=ret.chapter_list;

                        console.log(res);



                        if (ret.errcode !== 0) {
                            return this.$message({
                                type: 'warning',
                                message: ret.msg
                            })
                        }

                    })
            },
            RegistJs:function(){
                NimCefWebInstance.register('CefJs_ReceiveGidPsd', (myJson) => {
                    console.log(myJson);//json对象

                    this.gid=myJson.gid;
                    this.passport=myJson.passport;
                    this.getClass ();

                    // var myJsonStr= JSON.stringify(myJson);
                    // console.log(myJsonStr);
                    // this.base64=myJson.src;
                    // console.log(this.base64);
                    return {
                        message: 'showJs function was executed, this message return by JavaScript.'
                    }
                });

                NimCefWebInstance.register('CefJs_ReceiveUserInfo', (myJson) => {
                    console.log(myJson);//json对象

                    // this.gid=myJson.gid;
                    // this.passport=myJson.passport;
                    // this.getClass ();

                    // var myJsonStr= JSON.stringify(myJson);
                    // console.log(myJsonStr);
                    // this.base64=myJson.src;
                    // console.log(this.base64);
                    return {
                        message: 'showJs function was executed, this message return by JavaScript.'
                    }
                })

            }
            ,
            callCpp:function(cInfo){
                this.seen=true;
                this.dialogVisible=true;
                let classInfo={
                   'chapterName':cInfo.name,
                   'courseName':cInfo.course.name,
                   'chapterID':cInfo.id,
                   'courseID':cInfo.course.id,
                   'qid':cInfo.class.qid
                }

                console.log(classInfo);
                NimCefWebInstance.call('CefCpp_SendClassInfo',classInfo,(error, result) =>
                {
                    console.log(error);
                    console.log(result);
                });
            }
        },
        mounted(){
            this.RegistJs();
        }
    }
</script>

<style scoped>

    .col-center-block {
        float: none;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
</style>