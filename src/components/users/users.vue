<template>
<el-card class="card-box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="searchRow">
        <el-col>
            <el-input clearable @clear="loadUserList()" placeholder="请输入内容" v-model="query" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click.prevent="searchUser()"></el-button>
            </el-input>
            <el-button type="success" @click="showUserDia()">添加用户</el-button>
        </el-col>
    </el-row>
    <el-table height="300px" style="width: 100%" :data="userlist">
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
                <el-switch @change="changeState(scope.row)" v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-row>
                    <el-button size="mini" plain type="primary" icon="el-icon-edit" circle @click="writeUser(scope.row)"></el-button>
                    <el-button size="mini" plain type="danger" icon="el-icon-delete" circle @click="showUserDel(scope.row.id)"></el-button>
                    <el-button size="mini" plain type="success" icon="el-icon-check" circle @click="rightUser(scope.row)"></el-button>
                </el-row>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[2, 4, 6, 8]" :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="32">
    </el-pagination>
    <el-dialog title="删除" :visible.sync="dialogFormVisibleAdd">
        <el-form v-model="form">
            <el-form-item label="用户名" label-width="100px">
                <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" label-width="100px">
                <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" label-width="100px">
                <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" label-width="100px">
                <el-input v-model="form.mobile" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUser()">确 定</el-button>
        </div>
    </el-dialog>

    <el-dialog title="编辑" :visible.sync="dialogFormVisibleEdit">
        <el-form v-model="form">
            <el-form-item label="用户名" label-width="100px">
                <el-input disabled v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" label-width="100px">
                <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" label-width="100px">
                <el-input v-model="form.mobile" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="editUser()">确 定</el-button>
        </div>
    </el-dialog>

    <el-dialog title="对勾" :visible.sync="dialogFormVisibleRight">
        <el-form :model="form">
            <el-form-item label="用户名" label-width="100px">
                {{currUserName}}
            </el-form-item>
            <el-form-item label="角色" :label-width="formLabelWidth">
                <el-select v-model="currRoleId">
                    <!-- v-model与:value一样，显示:label -->
                    <el-option label="请选择" :value="-1"></el-option>
                    <el-option v-for="(item,i) in roles" :value="item.id" 
                    :key="i" :label="item.roleName"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="setRole()">确 定</el-button>
        </div>
    </el-dialog>
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
            total: -1,
            dialogFormVisibleAdd: false,
            dialogFormVisibleEdit: false,
            dialogFormVisibleRight: false,
            formLabelWidth: '120px',
            form: {
                usename: '',
                password: '',
                email: '',
                mobile: ''
            },
            currRoleId: -1,
            currUserId: -1,
            currUserName: '',
            //保存所有的角色数据
            roles: []
        }
    },
    created() {
        this.getUserList()
    },
    methods: {
        async setRole() {
            const res = await this.$http.put(`users/${this.currUserId}/role`,{
                rid: this.currRoleId
            })
            this.dialogFormVisibleRight = false
        },
        async rightUser(user) {
            this.currUserName = user.username

            this.currUserId = user.id
            const res1 = await this.$http.get(`roles`)
            console.log(res1)
            this.roles = res1.data.data

            const res = await this.$http.get(`users/${user.id}`)
            this.currRoleId = res.data.data.rid
            this.dialogFormVisibleRight = true
        },
        async changeState(user) {
            const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
        },
        async editUser() {
            const res = await this.$http.put(`users/${this.form.id}`, this.form)
            this.dialogFormVisibleEdit = false
            this.getUserList()
        },
        writeUser(user) {
            this.form = user
            this.dialogFormVisibleEdit = true
        },
        showUserDel(userId) {

            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    //把userId以参数形式传过来
                    const res = await this.$http.delete(`users/${userId}`)
                    const {
                        meta: {
                            status,
                            msg
                        }
                    } = res.data
                    if (status === 200) {
                        this.pagenum = 1
                        this.getUserList()
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }

                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                })
        },
        async addUser() {
            const res = await this.$http.post('users', this.form)
            const {
                meta: {
                    status,
                    msg
                },
                data
            } = res.data
            if (status === 201) {
                this.$message.success(msg)
                this.dialogFormVisibleAdd = false
                this.getUserList()
                this.form = {}
            } else {
                this.$message.warning(msg)
            }

        },
        showUserDia() {
            this.form = {}
            this.dialogFormVisibleAdd = true
        },
        loadUserList() {
            this.getUserList()
        },
        searchUser() {
            this.getUserList()
        },
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.pagesize = val
            this.pagenum = 1
            this.getUserList()
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.pagenum = val
            this.getUserList()
        },

        async getUserList() {
            const AUTH_TOKEN = localStorage.getItem('token')
            this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN

            const res = await this.$http.get(
                `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)

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
