<template>
    <div>
        <div class="big">
        <div class="container">
            <div><i class="el-icon-star-off"></i>账号<el-input style="width:200px;" v-model="user.userId" placeholder="请输入内容" :disabled="true"></el-input></div>
            <div><i class="el-icon-star-off"></i>年龄<el-input style="width:200px;" v-model="user.age" placeholder="请输入内容"></el-input></div>
            <div><i class="el-icon-star-off"></i>生日<el-input style="width:200px;" v-model="user.birth" placeholder="请输入内容"></el-input></div>
            <div><i class="el-icon-star-off"></i>姓名<el-input style="width:200px;" v-model="user.username" placeholder="请输入内容"></el-input></div>
            <div><i class="el-icon-star-off"></i>格言<el-input style="width:200px;" v-model="user.article" placeholder="请输入内容"></el-input></div>
            <div><i class="el-icon-star-off"></i>密码<el-input style="width:200px;" v-model="user.passwrod" type="password" :disabled="true"s placeholder="请输入内容"></el-input></div>
            <el-button type="primary" @click="submit" style="margin-top:10px;" size="small" >主要按钮</el-button>
        </div>
    </div>
    </div>
</template>
<style scoped>
.big{
    width: 100%;
    height: 100%;
}
.container{
    width: 300px;
    height: 400px;
    background: #ffffff;
    margin: 0 auto;
    margin-top: 30px;
    border-radius: 10px;
}
/* 注册开始 */
.container div{
    margin-top: 10px;
    margin-left: 10px;
}
/* 注册结束 */
</style>
<script>
import axios from 'axios'
export default {
    name:'updateuser',
    data () {
        return {
            user:{}
        }
    },
    mounted () {
        this.init()
    },
    methods: {
        init(){
            let userId = this.$route.params.userId
            axios.get("/users/getoneuser",{params:{userId}})
            .then(response=>{
                let res = response.data
                this.user = res.result
            })
        },
        submit(){
            axios.post('/users/updateuser',this.user)
            .then(response=>{
                let res = response.data
                if(res.status){
                    alert("用户信息更新成功！")
                }
            })
            .catch(err=>{
                alert("请检查您的网络的设置")
            })
        }
    }
}
</script>
