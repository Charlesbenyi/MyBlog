<template>
    <div class="big">
        <div class="container">
            <div><i class="el-icon-star-off"></i>账号<el-input style="width:200px;" v-model="userId" placeholder="请输入内容"></el-input></div>
            <div><i class="el-icon-star-off"></i>年龄<el-input style="width:200px;" v-model="age" placeholder="请输入内容"></el-input></div>
            <div><i class="el-icon-star-off"></i>生日<el-input style="width:200px;" v-model="birth" placeholder="请输入内容"></el-input></div>
            <div><i class="el-icon-star-off"></i>姓名<el-input style="width:200px;" v-model="username" placeholder="请输入内容"></el-input></div>
            <div><i class="el-icon-star-off"></i>格言<el-input style="width:200px;" v-model="article" placeholder="请输入内容"></el-input></div>
             <div><i class="el-icon-star-off"></i>密码<el-input style="width:200px;" v-model="passwrod" type="password" placeholder="请输入内容"></el-input></div>
            <el-button type="primary" @click="submit" style="margin-top:10px;">主要按钮</el-button>
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
    name:'insertuser',
    data () {
        return {
           userId:'',
           age:0,
           birth:'',
           username:'',
           article:'',
           passwrod:''
        }
    },
    methods: {
        submit(){
            // alert(this.userId+"--"+this.age+"--"+this.birth+"--"+this.username+"--"+this.article)
            let params = {
                userId:this.userId,
                age:this.age,
                birth:this.birth,
                username:this.username,
                article:this.article,
                passwrod:this.passwrod
            }
            axios.post("/users/register",params)
            .then(response=>{
                let res= response.data
                if(res.status){
                    alert("个人注册成功")
                    this.$router.push({name:'host_user'})
                }
            })
            .catch(err=>{
                alert(err)
            })
        }
    }
}
</script>

