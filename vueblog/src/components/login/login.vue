<template>
    <div id="login">
        <div class="container">
            <div class="content">
                <h2>登录</h2>
                <div class="mesage">
                    <el-input
                        placeholder="请输入内容"
                        prefix-icon="el-icon-user-solid"
                        style="width:240px"
                        v-model="user">
                    </el-input>
                    <el-input
                        type='password'
                        placeholder="请输入内容"
                        prefix-icon="el-icon-key"
                        style="width:240px"
                        v-model="password">
                    </el-input>
                </div>
                <div class="btn">
                    <slot name='btn1'></slot>
                    <el-button type="warning" round @click="login">登录</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
#login{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(133, 122, 122, 0.9)
}
.content{
    width: 400px;
    height: 300px;
    background: #fff;
    margin: 0 auto;
    margin-top: 150px;
    text-align: center;
    border-top: 1px solid transparent;
    box-shadow: 2px 2px 10px black;
    border-radius: 10px;
}
.content h2{
    margin-top: 20px;
}
.content .btn{
    margin-top: 30px;
}
</style>
<script>
export default {
    name:'login',
    data () {
        return {
            user:'',
            password:''
        }
    },
    methods: {
        login(){

        },
        checkout(){
            this.loginshow = false
        }
    }
}
</script>
