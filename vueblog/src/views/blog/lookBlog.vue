<template>
    <div id="lookBlog">
        <div class="show_card" v-for="(item,index) in articles" :key="index"> 
            <div class="content">
                <div class="title">{{item.title}}</div>
            </div>
            <div class="down">
                <span class="title">类别：{{item.catalog}}  </span>
                <span style="margin-top:10px;">时间：{{item.publishtime}} </span>
                <div class="btn">
                    <el-button type="info" icon="el-icon-message" circle @click="detail(item.title)"></el-button>
                    <el-button type="danger" icon="el-icon-delete"  circle @click="handerdelete(item.title)"></el-button>
                </div>
                
            </div>
        </div>
        <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        layout="prev, pager, next"
        :page-size='pageSize'
        :total="total">
        </el-pagination>
    </div>
</template>
<style scoped>
#lookBlog{
    margin: 20px;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    align-content: space-around;
        
}
.show_card{
    background: rgba(110, 172, 230, 0.5);
    border-radius: 20px;
}
.content{
    width: 200px;
    height: 150px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.down{
    width: 200px;
    display: flex;
    border-radius: 20px;
    flex-direction: column;
    align-items: center;
}
.btn{
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>
<script>
import axios from 'axios'
export default {
    name:'lookBlog',
    data () {
        return {
            html:'',
            articles:[],
            currentPage:1,
            total:12,
            pageSize:4
        }
    },
    mounted () {
        this.init(),
        this.initsize()
    },
    methods: {
        initsize(){
            axios({
                method:'get',
                url:'/article/size'
            }).then(response=>{
                let res = response.data
                if(res.status){
                    this.total = res.total
                }
            }).catch(err=>{
                console.log('返回错误');
                
            })
        },
        handerdelete(title){
            axios.post('/article/delete',{
                title:title
            }).then(response=>{
                let res = response.data
                console.log(res);
                if (res.status) {
                   alert("删除成功")
                   this.initsize()
                   this.init()

                }else{
                    alert('删除失败')
                }
            }).catch(err=>{
                alert("资源上传失败")
            })
        },
        init(){
            axios({
                method:'get',
                url:'/article/listall',
                params:{
                    pageSize:this.pageSize,
                    currentPage:this.currentPage
                }
            }).then(response=>{
                let res = response.data
                if(res.status){
                    this.articles = res.result
                    console.log(this.articles.length)
                }else{
                    alert('没有获取到数据')
                }
            })
        },
        detail(title){
            this.$router.push({name:'detailblog',params:{title}})
        },
        handleCurrentChange(){
            this.init()
        }
    }
}
</script>

