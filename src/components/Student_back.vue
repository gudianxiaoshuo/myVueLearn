<template>
    <!--    0、  -->
    <div>

<!--        <b-alert show>Default Alert</b-alert>-->
<!--        <b-alert variant="success" show>Success Alert</b-alert>-->
<!--        <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>-->
<!--            Dismissible Alert!-->
<!--        </b-alert>-->


<!--        <b-alert-->
<!--                :show="dismissCountDown"-->
<!--                dismissible-->
<!--                variant="warning"-->
<!--                @dismissed="dismissCountDown=0"-->
<!--                @dismiss-count-down="countDownChanged"-->
<!--        >-->
<!--            <p>This alert will dismiss after {{ dismissCountDown }} seconds...</p>-->
<!--            <b-progress-->
<!--                    variant="warning"-->
<!--                    :max="dismissSecs"-->
<!--                    :value="dismissCountDown"-->
<!--                    height="4px"-->
<!--            ></b-progress>-->
<!--        </b-alert>-->

        <el-container>
            <el-header>
                <el-row :gutter="20"  type="flex" justify="center">
                    <el-col >
                        <el-button type="primary" v-on:click="getClass">获得最近课程</el-button>
                    </el-col>
                </el-row>
            </el-header>
            <el-main>

<!--                <el-row :gutter="20" v-if="seen">-->
<!--                    <el-col :span="12" >-->
<!--                        <img src="../assets/images/loading.gif" height="100" width="120"/>-->
<!--                    </el-col>-->
<!--                </el-row>-->

<!--                <el-row type="flex" class="row-bg" justify="center">-->
<!--                    <el-col :span="12" :offset="6">-->
<!--                        <div>-->
<!--                            <b-card-->
<!--                                    title="Card Title"-->
<!--                                    img-src="https://picsum.photos/600/300/?image=25"-->
<!--                                    img-alt="Image"-->
<!--                                    img-center-->
<!--                                    tag="article"-->
<!--                                    style="max-width: 20rem; "-->
<!--                                    class="mb-2"-->
<!--                            >-->
<!--                                <b-card-text>-->
<!--                                    Some quick example text to build on the card title and make up the bulk of the card's content.-->
<!--                                </b-card-text>-->

<!--                                <b-button href="#" variant="primary">Go somewhere</b-button>-->
<!--                            </b-card>-->
<!--                        </div>-->
<!--                    </el-col>-->
<!--                </el-row>-->

                <div v-for="site in info">
                    <el-row :gutter="20"  type="flex" justify="space-between" >
                        <el-col :span="4" :offset="10">
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
                        </el-col>
                    </el-row>
                </div>


               <!-- <div v-for="site in info" border>

                                  <el-table
                                      :data="tableData"
                                      style="width:100%"
                                      v-loading="loading">

                                      <el-table-column
                                          prop="name"
                                          :label="site.name"

                                          >
                                          <template slot-scope="scope">

                                              <span>{{scope.row[name]}}</span>

                                          </template>

                                      </el-table-column>

                                  </el-table>
                                  -->

                    <!--
                                        <el-row :gutter="20" >
                                            <el-col :span="20" :offset="2">
                                                {{site.name}}
                                            </el-col>
                                        </el-row>
                                        <el-row :gutter="20" >
                                            <el-col :span="20" :offset="2">
                                                {{site.course.name}}
                                            </el-col>
                                        </el-row>
                                        <el-row :gutter="20" >
                                            <el-col :span="20" :offset="2">
                                                <el-button v-on:click="callCpp(site)">去上课</el-button>
                                            </el-col>
                                        </el-row>
                                        <el-divider></el-divider>



                                    </div>-->

            </el-main>
        </el-container>


         <el-dialog
                                    title="提示"
                                    :visible.sync="dialogVisible"
                                    width="30%"
                                    :before-close="handleClose">
                    <!--            <span>这是一段信息</span>-->
            <img src="../assets/images/loading.gif" height="100" width="120"/>

            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>




<!--        <div v-for="site in info">-->
<!--            <div>-->
<!--                {{site.name}}-->
<!--                <br/>-->
<!--                {{site.course.name}}-->
<!--                 <br/>-->
<!--                <el-button v-on:click="callCpp(site)">去上课</el-button>-->
<!--            </div>-->

<!--        </div>-->
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
                passport:"TO1tV+irgrX0ZO4EEshFCWNCV3M=",
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
/*                console.log(cInfo.name);
                  console.log(cInfo.course.name);
*/

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