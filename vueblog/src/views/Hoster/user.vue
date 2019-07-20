<template>
    <div>
       <el-table
    :data="array"
    style="width: 100%">
    <el-table-column
      label="用户的账号"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.userId }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="年龄"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.age }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="用户的名称"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>座右铭: {{ scope.row.article }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.username }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row.userId)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row.userId)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    </div>
</template>
<style scoped>
</style>
<script>
import axios from 'axios'
export default {
    name:'user',
    data () {
        return {
            array:[]
        }
    },
    mounted () {
        this.init()
    },
    methods: {
         handleEdit(row) {
           alert("你点击了"+row)
           this.$router.push({name:'updateuser',params:{userId:row}})
        },
        handleDelete( row) {
            axios.post("/users/deleteone",{userId:row})
            .then(response=>{
              let res = response.data
              if(res.status){
                alert("用户删除成功")
                this.init()
              }else{
                alert("用户删除失败")
              }
            })
            .catch(err=>{
              alert("网络连接发生错误")
            })
        },
        init(){
            let url = '/users/listuser'
            axios.get(url)
            .then((response)=>{
                let res = response.data
                this.array = res.result
                console.log(res.result)
            })
        }  
    }
}
</script>
