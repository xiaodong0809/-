<template>
<el-card>
    <my-bread level1="权限管理" level2="权限列表"></my-bread>
    <el-table :data="rightList" border style="width: 100%" height="400px">
        <el-table-column type="index" label="序号" width="100">
        </el-table-column>
        <el-table-column prop="authName" label="权限名称" width="180">
        </el-table-column>
        <el-table-column prop="path" label="路径">
        </el-table-column>
        <el-table-column prop="level" label="层级" width="180">
            <template slot-scope="scope"> 
                <span v-if="scope.row.level==='0'">一级</span>
                <span v-if="scope.row.level==='1'">二级</span>
                <span v-if="scope.row.level==='2'">三级</span>
            </template>
        </el-table-column>
    </el-table>
</el-card>
</template>

<script>
export default {
    data() {
        return {
            rightList: []
        }
    },
    created() {
        this.getRightlist()
    },
    methods: {
        async getRightlist() {
            // const AUTH_TOKEN = localStorage.getItem('token')
            // this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
            const res = await this.$http.get(`rights/list`)
            this.rightList = res.data.data
            console.log(res)
        }
    }
}
</script>
