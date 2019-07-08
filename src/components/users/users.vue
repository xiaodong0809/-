<template>
<el-card class="card-box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="searchRow">
        <el-col>
            <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button type="success">添加用户</el-button>
        </el-col>
    </el-row>
    <el-table style="width: 100%">
        <el-table-column type="index" label="#" width="60">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="80">
        </el-table-column>
         <el-table-column prop="name" label="邮箱" width="80">
        </el-table-column>
        <el-table-column prop="address" label="电话">
        </el-table-column>
         <el-table-column prop="name" label="创建日期" width="80">
        </el-table-column>
         <el-table-column prop="name" label="用户状态" width="80">
        </el-table-column>
         <el-table-column prop="name" label="操作" width="80">
        </el-table-column>
    </el-table>
</el-card>
</template>

<script>
export default {
    data() {
        return {
            query: '',
            pagenum: 1,
            pagesize: 2
        }
    },
    created() {
        this.getUserList()
    },
    methods: {
        async getUserList() {
            const AUTH_TOKEN = localStorage.getItem('token')
            this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
            const res = await this.$http.get(
                `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
            console.log(res);
        }
       
    }

}
</script>

<style>
.searchRow {
    margin-top: 20px;
}

.card-box {
    height: 100%;
}

.input-with-select {
    width: 300px;
}
</style>
