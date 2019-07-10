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
    <el-table style="width: 100%" :data="userlist">
        <el-table-column type="index" label="#" width="60">
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="80">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="80">
        </el-table-column>
        <el-table-column prop="mobile" label="电话">
        </el-table-column>
        <!-- {{ceeate_time | fmtdate}} -->
        <el-table-column label="创建日期">
            <!-- 要使用数据的数据源 最外层标签绑定的数据userlist
             userlist.row 每个对象-->
            <template slot-scope="scope">
                {{scope.row.create_time | fmtdate}}
            </template>
        </el-table-column>
        <el-table-column label="用户状态">
            <template slot-scope="scope">
                <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-row>
                    <el-button size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
                    <el-button size="mini" plain type="danger" icon="el-icon-delete" circle></el-button>
                    <el-button size="mini" plain type="success" icon="el-icon-check" circle></el-button>
                </el-row>
            </template>
        </el-table-column>
    </el-table>
</el-card>
</template>

<script>
export default {
    data() {
        return {
            query: '',
            userlist: [],
            pagenum: 1,
            pagesize: 2,
            total: -1
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

            const {
                meta: {
                    status,
                    msg
                },
                data: {
                    users,
                    total
                }
            } = res.data
            if (status === 200) {
                this.userlist = users;
                this.total = total;
                this.$message.success(msg)
            } else {
                this.$message.error(msg)
            }

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
