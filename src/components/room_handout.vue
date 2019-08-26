<template>
    <div :class="{right: switchRight && learnMethod !== 5, client: isClient}" class="leftContainer" id="leftContainer">
        <div class="containerWrap">
            <div :class="isHost && liveStatus === 1 ? 'livingContainer whiteBoardContainer' : 'whiteBoardContainer'">
                <div class="whiteBoardWrapper">
                    <div class="whiteBoardInner">
                        <div class="liveStreamSwitcherMenu rightLiveStreamSwitcherMenu">
                            <a @click="switchScreen" class="switchScreenBtn"><i class="switchIcon xicon-switch-window"></i></a>
                            <a class="switchScreenBtn"><i class="closeIcon xicon-close"></i></a>
                            <a class="switchScreenBtn switchFlash" source="0"><i class="flashIcon">切换到flash播放</i></a>
                        </div>
                        <div class="handoutContainer">
                            <img ref="handoutImgInfo" v-loading.body.lock="fullscreenLoading" :class="{courseCover: isCourseCover}" class="handoutImg" :src="currentImg" />
                            <canvas class="whiteBoardCanvas"></canvas>
                        </div>
                        <div v-if="!liveStatus && !isViewHandout" class="beforeLiveTipsWrap">
                            <div v-show="liveClassData.chapter_id" class="beforeLiveTips">
                                <div v-if="!AarrivalTime" class="timeWrap">
                                    <i class="xicon-v-clock"></i>
                                    <span class="dueTime">距离开课还有：</span>
                                    <span class="dueTimeText">{{countDownTime}}</span>
                                </div>
                                <div class="timeWrap" v-else>
                                    <span v-if="isHost" class="dueTime">已到达直播时间请尽快开始直播</span>
                                    <span v-else class="dueTime">老师正在准备,请耐心等待...</span>
                                </div>
                                <div v-if="isHost && learnMethod !== 2 && learnMethod !== 4 && !AarrivalTime" class="tipsInfoWrap">
                                    <p class="title">温馨提示:</p>
                                    <p class="oneTip">1. 准时直播，学生会更喜欢您；</p>
                                    <p class="oneTip">2. 提前进入直播间和学生聊天，有利于拉近师生感情；</p>
                                    <p class="oneTip">3. 提前测试网速，确保上传网速达到1.5M以上；<a target="_blank" href="http://test.ustc.edu.cn/">去测网速</a> </p>
                                    <p v-if="learnMethod !== 3" class="oneTip">4. 提前翻一遍讲义，您上课会更加从容。</p>
                                </div>
                                <div v-if="learnMethod === 2 || learnMethod === 4" class="tipsInfoWrap">
                                    <div class="title">温馨提示:</div>
                                    <div class="tipContent">
                                        <p>1. 到开课时间后自动播放录像视频；</p>
                                        <p v-if="isHost">2. 课前聊天可以拉近学生感情；</p>
                                        <p v-if="learnMethod === 2 && isHost">3. 提前预览讲义，直播中会更从容。</p>
                                    </div>
                                </div>
                                <template v-if="isHost || isCompere">
                                    <div v-if="learnMethod !== 4 && +liveClassData.handout_count && !liveStatus && !AarrivalTime" class="viewHandoutWrap">
                                        <button @click="viewHandout" class="viewHandout">预览讲义</button>
                                    </div>
                                </template>
                            </div>
                        </div>
                        <!--<div class="loadEffect _loadEffect">-->
                        <!--<span></span>-->
                        <!--<span></span>-->
                        <!--<span></span>-->
                        <!--<span></span>-->
                        <!--<span></span>-->
                        <!--<span></span>-->
                        <!--<span></span>-->
                        <!--<span></span>-->
                        <!--</div>-->
                        <!--<div v-if="!liveStatus && !AarrivalTime || liveStatus === 1 || liveStatus === 4" class="handoutMenu rightHandoutMenu">-->
                        <template v-if="isHost || isCompere">
                            <div v-if=" learnMethod !== 4" class="handoutMenu rightHandoutMenu">
                                <a v-if="!liveStatus && !AarrivalTime && isViewHandout" @click="exitViewHandout" class="exitViewHandout">退出预览</a>
                                <!--<div v-if="liveStatus !== 2" class="switchHandoutWrap">-->
                                <div v-if="handoutLength && isViewHandout && liveStatus !== 2 || liveStatus && handoutLength && liveStatus !== 2" class="switchHandoutWrap">
                                    <el-button
                                            type="primary"
                                            @click="getHandoutInfo('prev')"
                                            class="previousPage"
                                    >
                                        <i class="xicon-left on"></i>
                                    </el-button>
                                    <span class="handoutNum">{{getSliceIndex() + 1 }}</span>/<span class="handoutNum" >{{handoutLength}}</span>
                                    <el-button
                                            type="primary"
                                            @click="getHandoutInfo('next')"
                                            class="nextPage"
                                    >
                                        <i class="xicon-right on"></i>
                                    </el-button>
                                </div>
                                <a @click="getHandoutList" v-if="isViewHandout && !liveStatus && +liveClassData.handout_count || liveStatus === 1 && +liveClassData.handout_count" class="uploadHandout rightUploadHandout">讲义夹</a>
                                <!--<a @click="getHandoutList" class="uploadHandout">讲义夹</a>-->
                            </div>
                        </template>
                    </div>
                </div>
                <div v-if="!isHost && liveStatus || isHost && liveStatus === 2" class="openScreen rightOpenScreen" @click="fullScreen">
                    <i>全屏</i>
                </div>
            </div>
        </div>
        <el-dialog
                title = "可使用的讲义"
                center
                :visible.sync = "dialogVisible"
                :modal-append-to-body = "modalVisible"
                :close-on-click-modal = "clickVisible"
                custom-class = "handoutList"
                width = "440px">
            <div class="handoutListContainer">
                <ul class="handoutList">
                    <!--{{each handoutList}}-->
                    <li v-for="(handout, handoutIndex) in handoutListData" :key="handoutIndex" class="handoutItem" courseId="" chapterId="" handoutId="">
                        <i class="xicon-my-class myClassIcon"></i>
                        <span class="name" :title="handout.name">{{handout.name}}</span>
                        <span class="handoutStatus" @click="chooseHandout(handout.id)">使用</span>
                    </li>
                    <!--{{// /each}}-->
                </ul>
                <div class="_xnwuploadProgressBar hide">
                    <div class="_progressBar"></div>
                </div>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import util from '@/assets/js/common/xnw/util'

    let qs=require('qs')

    export default {
        // props: ['liveClassData', 'isHost'],

        created(){
            this.getCountDownTime ();
        },
        updated() {
           // this.updataData()
        },
        watch: {
            liveClassData: function (val) {
                this.updataData(val)
            },
            currentImg: function (val) {
                if (val === this.liveClassData.course_cover) {
                    this.isCourseCover = true
                } else {
                    this.isCourseCover = false
                }
            }
        },
        data() {
            return {
                // uid: this.util.cookie()._id,
                uid: 40268548,
                currentImg: null,   //讲义当前页面
                isCourseCover: true,   //讲义当前页面
                liveStatus: 0,     //直播状态
                learnMethod: 1,     //直播方式
                isCompere: false, //主持人   1是主持人 0不是
                dialogVisible: false, //是否打开试卷列表
                modalVisible: false,    //弹窗组件的用法 是否在 body上创建弹窗
                clickVisible: false,  //弹窗组件的用法 禁止点击任何位置关闭弹窗
                handoutListData: [],   //讲义列表
                countDownTime: '59:59',       //倒计时
                countDownTimer: null,   //倒计时定时器
                AarrivalTime: false,    //是否已到达直播时间
                currentSliceId: 0,      //当前的讲义 id
                handoutArr: [],         //当前讲义的集合
                handoutLength: 0,         //当前讲义的页数
                switchRight: false,     //是否切换大小屏
                fullscreenLoading: false,    //加载loadding
                loadingTimer: null,
                isViewHandout: false,        //是否正在预览讲义
                isClient: this.$route.query.client, //判断是否是客户端
                prevHandoutImg: '',        //预览讲义时缓存的当前讲义

                liveClassData: {
                    chapter_start_time:1566815400000,
                    qid:2981269,
                    course_id:4308,
                    chapter_id:3301,
                    token: 'd914af4e5c345fc7654466f99e2d0031',
                    handout_count:2


                },      //返回的直播间数据集合


                isHost:true
            }
        },
        methods: {
            //时间补0
            formatNum (n) {
                if (n < 10) {
                    n = '0' + n;
                }
                return n;
            },
            // push 设置主持人
            setCompere (payload) {
                this.isCompere = true
            },
            // push 取消主持人
            cancelCompere (payload) {
                this.isCompere = false
            },
            //倒计时
            getCountDownTime () {
                let self = this
                this.countDownTimer = window.setInterval(() => {
                    let nowTime = new Date().getTime()
                    let startTime = self.liveClassData.chapter_start_time
                    let t = Math.floor((startTime - nowTime) / 1000);
                    let hourse = parseInt(t / 3600, 10);
                    let minutes = parseInt(t % 3600 / 60, 10);
                    let seconds = parseInt((t % 60), 10);

                    if (t < 3600) {
                        if (t <= 0) {
                            clearInterval(self.countDownTimer)
                            self.AarrivalTime = true

                        } else {
                            self.countDownTime = self.formatNum(minutes) + ':' + self.formatNum(seconds);
                        }
                    } else {
                        self.countDownTime = self.formatNum(hourse) + ':' + self.formatNum(minutes) + ':' + self.formatNum(seconds);
                    }
                }, 1000)
            },
            //更新数据
            updataData (val) {
                this.liveStatus = +val.live_status
                this.learnMethod = +val.learn_method
                this.isCompere = +val.is_compere === 1  //主持人   1是主持人 0不是
                let board = val.board
                let countDownTimer = this.countDownTimer
                clearInterval(countDownTimer)
                this.getCountDownTime()

                if (board && board.handout && board.handout.slice_list) {
                    this.handoutArr = board.handout.slice_list
                    this.handoutLength = this.handoutArr.length
                }

                if (!this.currentSliceId) {
                    if (this.liveClassData && val.board && val.board.current_slice) {
                        this.currentSliceId = val.board.current_slice.id
                    }
                }

                if (!this.currentImg) {
                    console.log(1)
                    this.currentImg = board && board.current_slice && board.current_slice.url ? board.current_slice.url : val.course_cover
                }
            },
            //获取讲义列表
            getHandoutList () {
                let parms = {
                    'qid': this.liveClassData.qid,
                    'course_id': this.liveClassData.course_id,
                    'chapter_id': this.liveClassData.chapter_id,
                    'act': 'get_handout_list',
                }

                this.$axios({
                    // url:'https://xdev.xnw.com:8444/qun/ajax_live.php',
                    url:'https://xdev.xnw.com:8444/qun/ajax_live.php',
                    method: 'POST',
                    data: qs.stringify(parms)
                    
                })
                    .then(res => {
                        let ret = res.data
                        if (ret.errcode !== 0) {
                            return this.$message({
                                type: 'warning',
                                message: ret.msg
                            })
                        }
                        this.handoutListData = ret.handout_list
                        this.dialogVisible = true
                    })
            },

            //使用讲义
            chooseHandout (handoutId) {
                let parms = {
                    'act': 'select_handout',
                    'qid': this.liveClassData.qid,
                    'course_id': this.liveClassData.course_id,
                    'chapter_id': this.liveClassData.chapter_id,
                    'handout_id': handoutId,
                    'token': this.liveClassData.token
                }
                this.fullscreenLoading = true
                this.$axios({
                    url:'https://xdev.xnw.com:8444/qun/ajax_live.php',
                    method: 'POST',
                    data: qs.stringify(parms)
                })
                    .then(res => {
                        let ret = res.data
                        if (ret.errcode !== 0) {
                            return this.$message({
                                type: 'warning',
                                message: ret.msg
                            })
                        }
                        this.handoutArr = ret.slice_list
                        this.handoutLength = this.handoutArr.length
                        this.dialogVisible = false;
                    })
            },
            //上一页或者下一页
            getHandoutInfo (d) {
                let handoutArr = this.handoutArr
                let currentSliceId = this.currentSliceId
                let index = this.getSliceIndex(currentSliceId)
                let sliceId = 0
                console.log(index)
                if (d === 'next') {
                    // 下一张
                    if (index >= handoutArr.length -1) {
                        this.$message({
                            type: 'warning',
                            message: '已经是最后一张了'
                        })
                        return false
                    }
                    sliceId = this.handoutArr[index + 1].id
                } else {
                    // 上一张
                    if (index <= 0) {
                        this.$message({
                            type: 'warning',
                            message: '已经是第一张了'
                        })
                        return false
                    }
                    sliceId = this.handoutArr[index - 1].id
                }
                let parms = {
                    'act': 'add_board_msg',
                    'qid': this.liveClassData.qid,
                    'course_id': this.liveClassData.course_id,
                    'chapter_id': this.liveClassData.chapter_id,
                    'type': 'locate_image',
                    'slice_id': sliceId,
                    'token': this.liveClassData.token
                }
                this.fullscreenLoading = true
                this.$axios({
                    url:'https://xdev.xnw.com:8444/qun/ajax_live.php',
                    method: 'POST',
                    data: qs.stringify(parms)
                })
                    .then(res => {
                        let ret = res.data
                        if (ret.errcode !== 0) {
                            return this.$message({
                                type: 'warning',
                                message: ret.msg
                            })
                        }
                        this.currentSliceId = sliceId
                    })
                    .catch((error) => {
                        console.log(error)
                        this.fullscreenLoading = false
                    })

            },
            //获取目标讲义所在的位置索引
            getSliceIndex () {
                let handoutArr = this.handoutArr
                let currentSliceId = this.currentSliceId
                for (let i = 0; i < handoutArr.length; i++) {
                    if (handoutArr[i].id === currentSliceId) {
                        this.sliceIdIndex = i
                        return i
                    }
                }
                return 0
            },
            //直播开始初始化讲义
            startLiveInit () {
                this.liveStatus = 1
                if (this.prevHandoutImg && !this.isHost) {
                    this.currentImg = this.prevHandoutImg
                }
            },
            //切换上一张下一张讲义
            switchImage (payload) {
                if (!this.isHost && !this.liveStatus) {
                    this.prevHandoutImg = payload.url
                    return false
                } else {
                    this.prevHandoutImg = ''
                }
                this.currentImg = payload.url
                this.currentSliceId = payload.slice_id
                this.$refs.handoutImgInfo.onload =  () => {
                    this.fullscreenLoading = false
                }
            },
            //选择讲义使用讲义
            usedImage (payload) {
                if (!this.isHost && !this.liveStatus) {
                    this.prevHandoutImg = payload.slice_list[0].url
                    return false
                } else {
                    this.prevHandoutImg = ''
                }
                this.currentImg = payload.slice_list[0].url
                this.currentSliceId = payload.slice_list[0].id
                this.$refs.handoutImgInfo.onload =  () => {
                    this.fullscreenLoading = false
                }
            },
            // 视屏区大小屏
            videoMain (data) {
                this.switchRight = data
            },
            // 切换大小屏
            switchScreen () {
                if (this.switchRight) {
                    this.switchRight = false
                    this.$emit('switchHandoutMain', false)
                } else {
                    this.switchRight = true
                    this.$emit('switchHandoutMain', true)
                }
            },
            // 点击预览
            viewHandout () {
                this.isViewHandout = true
                if (this.liveClassData.handout_count >= 2) {
                    this.getHandoutList()
                }
            },
            // 取消预览
            exitViewHandout () {
                this.isViewHandout = false
            },
            // 全屏
            fullScreen () {
                var element = document.getElementsByClassName('handoutContainer')[0]
                util.fullScreen(element)
            },
            // 取消全屏
            exitFullScreen () {
                var element = document.getElementsByClassName('handoutContainer')[0];
                util.exitScreen(element);
            },
            // 回放给讲义赋值
            setHandoutImg(list) {
                let lenght = list.length
                let index = lenght - 1
                if (lenght) {
                    if (list[index].type === 'handout') {
                        this.$refs.handoutImgInfo.src = list[index].handout.slice_list[0].url
                    } else if (list[index].type === 'locate_image') {
                        this.$refs.handoutImgInfo.src = list[index].slice_url
                    }
                }
            },

        },
        filters: {

        },
        destroyed () {
            let countDownTimer = this.countDownTimer
            let loadingTimer = this.loadingTimer
            clearInterval(countDownTimer)
            clearTimeout(loadingTimer)
        },
    }
</script>

<style scoped lang="scss">
    @import '../assets/sass/studycenter.scss';
    .leftContainer {
        position: absolute;
        /*width: calc(100% - 400px);*/
        width: calc(100% - 10px);
        box-sizing: border-box;
        /*height: calc(100% - 44px);*/
        height: calc(100% - 1px);
        &.client {
            height: 100%;
        }
        &.right {
            position: absolute;
            right: 0;
            width: 400px;
            height: 300px;
            &:hover {
                .liveStreamSwitcherMenu {
                    display: block;
                }
            }
            .liveStreamSwitcherMenu {
                &.rightLiveStreamSwitcherMenu {
                    position: fixed;
                    z-index: 9;
                    background: rgba(0, 0, 0, .8);
                    color: #FFFFFF;
                    top: 44px;
                    right: 0;
                    width: 400px;
                    height: 30px;
                    line-height: 30px;
                    .switchScreenBtn {
                        margin-left: 16px;
                        color: #FFFFFF;
                        font-size: 13px;
                        i {
                            font-style: normal;
                        }
                        .switchIcon {
                            position: absolute;
                            left: 8px;
                            top: 8px;
                            font-size: 17px;
                            cursor: pointer;
                        }
                        .closeIcon {
                            display: none;
                            position: absolute;
                            right: 16px;
                            top: 8px;
                            font-size: 13px;
                            cursor: pointer;
                        }
                        &.switchFlash {
                            display: none;
                            position: absolute;
                            top: 0;
                            left: 150px;
                            cursor: pointer;
                        }
                    }
                }
            }
            .handoutMenu {
                &.rightHandoutMenu {
                    height: 25px;
                    .switchHandoutWrap {
                        position: absolute;
                        left: 60%;
                        top: 12px;
                        width: 100px;
                        height: 30px;
                        line-height: 30px;
                        .previousPage, .nextPage {
                            padding: 0;
                            top: 9px;
                            .on {
                                top: 0;
                            }
                        }
                    }
                    .uploadHandout {
                        position: absolute;
                        top: 12px;
                        width: 70px;
                        height: 30px;
                        line-height: 30px;
                    }
                }
            }
            .whiteBoardContainer {
                &:hover {
                    .whiteBoardWrapper + .openScreen {
                        &.rightOpenScreen {
                            display: none;
                        }
                    }
                }
            }
        }
    }
    .containerWrap {
        position: relative;
        overflow: hidden;
        .whiteBoardContainer {
            height: 100%;
            position: relative;
            background-color: rgba(0, 0, 0, .7);
            .liveStreamSwitcherMenu {
                display: none;
            }
            .handoutContainer {
                height: 100%;
                width: 100%;
                display: inline-block;
                &.hide {
                    display: none;
                }
                .handoutImg {
                    max-width: 100%;
                    max-height: 100%;
                    margin: auto;
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    vertical-align: middle;
                    &.courseCover {
                        width: 100%;
                        height: 100%;
                    }
                }
                .whiteBoardCanvas {
                    width: 100%;
                    height: 100%;
                }
            }
            .beforeLiveTipsWrap {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                background-color: rgba(0, 0, 0, .8);
                height: 100%;
                //z-index: 9;
                .beforeLiveTips {
                    width: 466px;
                    position: relative;
                    left: 50%;
                    margin-left: -233px;
                    top: 30%;
                    .timeWrap {
                        text-align: left;
                        color: #FFF;
                        i {
                            color: #FFF;
                            font-size: 28px;
                        }
                        .dueTime {
                            font-size: 24px;
                            margin-left: 24px;
                            font-weight: 300;
                        }
                        .dueTimeText {
                            position: relative;
                            top: 5px;
                            font-size: 38px;
                            display: inline-block;
                        }
                    }
                    .tipsInfoWrap {
                        font-size: 18px;
                        color: #C2C0B7;
                        letter-spacing: .15px;
                        line-height: 30px;
                        font-weight: 200;
                        margin-top: 35px;
                        overflow: hidden;
                        a {
                            color: #08c;
                        }
                        .title {
                            margin-bottom: 10px;
                        }
                        .oneTip {
                            line-height: 25px;
                            font-size: 14px;
                        }
                    }
                    .viewHandoutWrap {
                        width: 100%;
                        text-align: center;
                        .viewHandout {
                            width: 125px;
                            height: 40px;
                            border: none;
                            font-size: 20px;
                            font-weight: 200;
                            background: #FFAA33;
                            border-radius: 33px;
                            color: #FFF;
                            margin-top: 30px;
                        }
                    }
                }
            }
            .loadEffect{
                width: 100px;
                height: 100px;
                position: relative;
                margin: 0 auto;
                top: -60%;
                //background: #000;
                //background: rgba(0, 0, 0, .7);
                display: none;
                span {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #Fa3;
                    position: absolute;
                    animation: load 1.04s ease infinite;
                    &:nth-child(1) {
                        left: 0;
                        top: 50%;
                        margin-top: -10px;
                        animation-delay: 0.13s;
                    }
                    &:nth-child(2) {
                        left: 14px;
                        top: 14px;
                        animation-delay: 0.26s;
                    }
                    &:nth-child(3) {
                        left: 50%;
                        top: 0;
                        margin-left: -10px;
                        animation-delay: 0.39s;
                    }
                    &:nth-child(4) {
                        top: 14px;
                        right: 14px;
                        animation-delay: 0.52s;
                    }
                    &:nth-child(5){
                        right: 0;
                        top: 50%;
                        margin-top: -10px;
                        animation-delay: 0.65s;
                    }
                    &:nth-child(6) {
                        right: 14px;
                        bottom:14px;
                        animation-delay: 0.78s;
                    }
                    &:nth-child(7) {
                        bottom: 0;
                        left: 50%;
                        margin-left: -10px;
                        animation-delay: 0.91s;
                    }
                    &:nth-child(8) {
                        bottom: 14px;
                        left: 14px;
                        animation-delay: 1.04s;
                    }
                }
                @keyframes load{
                    0% {
                        transform: scale(1.2);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(.3);
                        opacity: 0.5;
                    }
                }
            }
            .handoutMenu {
                margin: auto;
                position: absolute;
                bottom: 20px;
                left: 0;
                width: 100%;
                height: 40px;
                &.hide {
                    display: none;
                }
                a {
                    line-height: 40px;
                    background: rgba(0, 0, 0, 0.7);
                    border-radius: 100px;
                    font-size: 14px;
                    color: #FFFFFF;
                    display: inline-block;
                    width: 100px;
                    height: 40px;
                    padding: 0;
                    text-align: center;
                    font-weight: 200;
                }
                .uploadHandout {
                    cursor: pointer;
                    position: absolute;
                    right: 20px;
                    cursor: pointer;
                }
                .exitViewHandout {
                    position: absolute;
                    left: 20px;
                    cursor: pointer;
                }
                .switchHandoutWrap {
                    position: absolute;
                    left: 50%;
                    background: rgba(0, 0, 0, 0.70);
                    border-radius: 8px;
                    width: 168px;
                    height: 40px;
                    text-align: center;
                    margin-left: -84px;
                    line-height: 40px;
                    color: #FFF;
                    &.hide {
                        display: none;
                    }
                    .previousPage {
                        position: absolute;
                        left: 10px;
                        cursor: pointer;
                        background: transparent;
                        border: none;
                        .on {
                            position: relative;
                            top: 2px;
                            color: #FFF;
                            font-size: 13px;
                        }
                    }
                    .nextPage {
                        position: absolute;
                        right: 10px;
                        cursor: pointer;
                        background: transparent;
                        border: none;
                        .on {
                            position: relative;
                            top: 2px;
                            color: #FFF;
                            font-size: 13px;
                        }
                    }
                }
            }
            .openScreen {
                position: absolute;
                /*right: 15px;*/
                /*bottom: 40px;*/
                background: #000;
                color: #FFF;
                width: 80px;
                height: 36px;
                line-height: 36px;
                text-align: center;
                cursor: pointer;
                z-index: 1;
                display: none;

                border-radius: 100px;
                right: 28px;
                bottom: 70px;
                i {
                    font-style: normal;
                }
            }
            &:hover {
                .whiteBoardWrapper + .openScreen {
                    display: block;
                }
            }
        }
    }
    .leftContainer {
        .containerWrap {
            width: 100%;
            height: 100%;
            margin-right: 0;
            .timeWrap {
                i {
                    position: relative;
                    top: 6px;
                }
            }
        }
    }
    .handoutListContainer {
        .handoutList {
            min-height: 400px;
            .handoutItem {
                width: 100%;
                height: 55px;
                color: #313131;
                font-size: 14px;
                line-height: 55px;
                overflow: hidden;
                border-bottom: 1px solid #eee;
                .myClassIcon {
                    float: left;
                    padding: 10px 8px;
                    margin: 10px 8px;
                    color: #fff;
                    background: #f77e19;
                }
                .name {
                    float: left;
                    display: inline-block;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    max-width: 300px;
                }
                .handoutStatus {
                    float: right;
                    outline: none;
                    font-size: 14px;
                    color: #fa3;
                    cursor: pointer;
                }
            }
        }
    }

</style>
<style lang="css" scoped>
    .leftContainer >>> .el-dialog__header {
        background: #f8f8f8;
        border-bottom: 1px solid #ebebeb;
        padding-top: 10px;
    }
    .leftContainer >>> .el-dialog__title {
        font-size: 16px;
        font-weight: bold;
    }
    .leftContainer >>> .el-dialog__headerbtn {
        top: 15px;
    }
    .leftContainer >>> .el-icon-close {
        font-size: 20px;
    }
</style>
