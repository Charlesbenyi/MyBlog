<template>
<div>
    <el-container>
    <el-header>
        <div>
            <div class="pic" style="float:left">
                <span><img src="../../static/fish.jpg" width="30px" alt=""></span>
                <span><b>后台博客管理平台</b> </span>
            </div>
                <div class="pic" style=""></div>
                <el-button type="success" icon="el-icon-check" circle></el-button>
            
        </div>
    </el-header>
    <el-container>
        <el-aside width="200px">
           <el-menu
            router :deafault-active="$route.path"
            class="el-menu-vertical-demo"
            style="height:100%"
            @open="handleOpen"
            @close="handleClose">
            <el-submenu index="hoster">
                <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户</span>
                </template>
                <el-submenu index='user'>
                <template slot="title">用户管理</template>
                <el-menu-item index="user">用户列表</el-menu-item>
                <el-menu-item index="insert">用户增加</el-menu-item>
                </el-submenu>
                
                
            </el-submenu>
            <el-submenu index="blog">
                <template slot="title">
                  <i class="el-icon-s-management"></i><span>文章</span>
                </template>
                <el-menu-item index="writeblog">写博客</el-menu-item>
                <el-menu-item index="lookblog">看博客</el-menu-item>
            </el-submenu>
            
            <el-menu-item index="manageCatalog">
                <i class="el-icon-setting"></i>
                <span slot="title">catalog管理</span>
            </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
        <el-main>
          <router-view/>
        </el-main>
        <el-footer></el-footer>
        </el-container>
    </el-container>
    </el-container>
</div>
</template>
<style scoped>

body{
	margin: 0; 
	padding: 0;
	border: 0;
}
.el-main{
  padding: 0;
}

/* 头部布局开始 */
.btn{
    float: right;
    width: 100px;
    height: 40px;
    margin-top: px;
    background: #333
}
/* 头部布局结束 */
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: right;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 650px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    height: 600px;
    
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
<script>
export default {
    name:'hoster',
    data () {
        return {
            
        }
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

