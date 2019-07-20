<template>
    <div id="Index">
        
            <!-- <h1 style="color:white;" class="biaoti"> 书写人生,放情狂歌</h1>
            <div class="btn">
                <el-button round>登录</el-button>
            </div> -->
            
            
                <shouheader @login="getmsg"   />
            
            
        
        <div class="content">
            <div class="nav">
                <ul>
                    导航栏
                    <li v-for="(item,index) in catalogs" :key="index" @click="search(item.cname)">
                        {{item.cname}}
                    </li>
                </ul>
            </div>
            <div class="bloglist">
                <div class="show">
                 <div class="showcard" v-for="(item,index) in articles" :key="index">
                    <div class="title_content">
                        <div>文章标题：{{item.title}} </div>
                    </div>
                    <div class="most">
                        <span style="margin-top:10px;">类别：{{item.catalog}} </span>
                        <span style="margin-top:10px;">时间：{{item.publishtime}} </span>
                        <div class="btn">
                             <el-button type="text" @click="handclick(item.title)" >查看详情</el-button>
                        </div>
                    </div>
                </div>
                </div>
                 <el-pagination 
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                layout="prev, pager, next"
                :page-size='pageSize'
                :total="total" style="text-align:center;">
                </el-pagination>
            </div>
        </div>
        <transition name="fade">
            <Logining v-if="loginshow">
                <template slot='btn1' >
                    <el-button type="primary" round @click="checkout">退出</el-button>
                </template>
            </Logining>
        </transition>
        
    </div>
</template>
 <style scoped>
 #Index {
    
 }
 /* .header{
     min-width: 800px;
     width: 100%;
     height: 200px;
     position: absolute;
     top: 0;
     background-image: url('../assets/back.jpg');
     background-size: 100% 100%;
     text-align: center;
 } */

 .content{
     min-width: 800px;
     width: 100%;
     position: absolute;
     top: 200px;
     bottom: 0px;
     background: rgb(218, 211, 211);
     display: flex;
     justify-content: space-around;
 }
 
 .nav{
     width: 20%;
     height: 85%;
     
     margin-top: 10px;
     display: flex;
     flex-direction: column;
     align-items: center;
     
 }
 .nav ul{
     list-style: none;
 }
 .nav ul li{
     margin-top: 20px;
     cursor: pointer;
 }
 .bloglist{
     margin-top: 10px;
     width: 75%;
     height: 95%;
     background: rgb(134, 145, 140);
     border-radius: 10px;
     /* display: flex;
     flex-direction: row;
     flex-wrap: wrap;
     justify-content: flex-start;
     align-content: flex-start;
     align-items: flex-start; */
 }
 .show{
     width: 100%;
     height: 80%;
     margin: 20px;
     display: flex;
     flex-direction: row;
     flex-wrap: wrap;
     justify-content: center;
     align-content: center;
     align-items: flex-start;
 }

.showcard{
    margin: 3px
}
 .title_content{
     height: 100px;
     width: 200px;
     background: rgb(180, 177, 145);
     display: flex;
     justify-content: center;
     align-items: center;
 }
 .most{
     width: 200px;
     height: 100px;
     background: rgb(236, 230, 230);
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
 }
/* .btn{
    display:inline-block;
    position: absolute;
    bottom: 10px;
    right: 10px;
} */
.el-pagination {
    background: transparent;
}
.fade-enter-active,.fade-leave-active{
    transition: opacity 0.5s;
}
.fade-enter,.fade-leave-to{
    opacity: 0;
}
 </style>
 <script>
 import axios from 'axios'
 import shouheader from '../components/shouheader.vue'
 export default {
     name:'Index',
     data () {
         return {
             catalogs:[],
             articles:[],
             currentPage:1,
             total:12,
             pageSize:4,
             cname:'',
             loginshow:false,
            
         }
     },
     components: {
         shouheader
     },
     mounted () {
         this.init()
     },
     methods: {
         init(){
             axios.all([
                 axios({
                     method:"get",
                     url:'/catalogs/listall'
                 }),
                 axios({
                    method:'get',
                    url:'/article/size'
                }),
                 axios({
                    method:'get',
                    url:'/article/listall',
                    params:{
                        cname:this.cname,
                        pageSize:this.pageSize,
                        currentPage:this.currentPage
                        
                    }
                 })
             ]).then(axios.spread((Catalogs,Size,Articles)=>{
                 let res1 = Catalogs.data
                 let res2 = Size.data
                 let res3 = Articles.data
                 if(res1.status&&res2.status&&res3.status){
                     this.catalogs = res1.result
                     this.total = res2.total
                     this.articles = res3.result
                 }else{
                     alert('相关数据获取失败')
                 }
                 console.log(res1)
                 console.log(res2)
                 console.log(res3);
             }))
         },
         handleCurrentChange(){
             this.init()
         },
         search(cname){
             this.cname = cname
             console.log(typeof (this.cname))
             this.init()
         },
         handclick(title){
             this.$router.push({name:'detail',params:{title:title}})
         },
         getmsg(data){
             console.log(data)
             this.loginshow=data
         },
         checkout(){
            this.loginshow = false
        }
     }
 }
 </script>
 
