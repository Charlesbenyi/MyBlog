<template>
    <div id="manaCatalog">
        <div class="input" ><el-input v-model="input" style="width:300px" placeholder="请输入类别名字"></el-input><el-button type="primary" @click="insert()" round>增加</el-button></div>
        <div class="showlist">
            <el-table
                :data="tableData"
                style="width: 50%;margin:0 auto;">
                <el-table-column
                label="日期"
                width="180">
                <template slot-scope="scope">
                    
                    <span style="margin-left: 10px">{{ scope.row.cname }}</span>
                </template>
                </el-table-column>
                <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row.cname)">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<style scoped>
.input{
    width: 80%;
    margin: 0 auto;
    text-align: center;
    margin-top: 20px;
}
.showlist{
    margin-top: 20px;
}
</style>
<script>
import axios from 'axios'
export default {
    name:'manaCatalog',
    data () {
        return {
            tableData:[],
            input:''
        }
    },
    mounted () {
        this.init()
    },
    methods: {
        init(){
            axios({
                method:'get',
                url:'/catalogs/listall',
                data:{

                }
            }).then(response=>{
                let res = response.data
                if(res.status){
                    this.tableData = res.result
                }else{
                    alert(暂时没有分类)
                }
            })
        },
        insert(){
            console.log(this.input)
            axios.post("/catalogs/insert",{
                cname:this.input
            }).then((response)=>{
                let res = response.data
                console.log(res)
                if (res.status) {
                    this.init()
                }else{
                    alert("插入失败！")
                }
            })
        },
        handleDelete(cname){
            console.log(cname);
            axios({
                method:'post',
                url:'/catalogs/delete',
                data:{
                    cname:cname
                }
            }).then(response=>{
                let res = response.data
                if(rse.stauts){
                    this.init()
                }else{
                    alert("函数发生错误！")
                }
                console.log(res);
                
            }).catch(err=>{
                console.log(err)
            })
            // axios.post('/catalogs/delete',{cname:this.input})
            // .then(response=>{
            //     let res = response.data
            //     if(res.stauts){
            //         alert('删除成功')
            //     }else{
            //         alert('删除失败')
            //     }
            // })
        }
    }
}
</script>


