<template>

    <el-row type="flex" justify="space-between" align="middle"  style="min-height:100vh;">
        <el-col :span="12" :offset="6">
            <div  >
                <img src="../assets/images/loading2.gif" height="256" width="256"/>
            </div>
        </el-col>
    </el-row>
    
</template>

<script>
    export default {
        name: "Load"
    }
</script>

<style >

::-webkit-scrollbar {
    width: 0 ;
}
::-webkit-scrollbar {
    width: 0 ;height: 0;
}


    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
</style>