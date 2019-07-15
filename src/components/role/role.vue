<template>
<el-card>
    <my-bread level1="权限管理" level2="分类参数"></my-bread>
    <el-row class="addRole">
        <el-col>
            <el-button>添加角色</el-button>
        </el-col>
    </el-row>
    <el-table :data="roleList" border style="width: 100%" height="400px">
        <el-table-column type="expand" width="100">
            <template slot-scope="scope">
                <el-row v-for="(item1,i) in scope.row.children" :key="i">
                    <el-col :span="4">
                        <el-tag type="success" @close="deleRight(scope.row,item1.id)" closable>{{item1.authName}}</el-tag>
                        <i class="el-icon-arrow-right"></i>
                    </el-col>
                    <el-col :span="20">
                        <el-row v-for="(item2,i) in item1.children" :key="i">
                            <el-col :span="4">
                                <el-tag type="info" closable @close="deleRight(scope.row,item2.id)">{{item2.authName}}</el-tag>
                                <i class="el-icon-arrow-right"></i>
                            </el-col>

                            <el-col :span="20">
                                <el-tag type="warning" @close="deleRight(scope.row,item3.id)" closable v-for="(item3,i) in item2.children" :key="i">{{item3.authName}}</el-tag>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <span v-if="scope.row.children.length===0">未分配权限</span>
            </template>
        </el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="180">
        </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-row>
                    <el-button size="mini" plain type="primary" icon="el-icon-edit" circle @click="writeUser(scope.row)"></el-button>
                    <el-button size="mini" plain type="danger" icon="el-icon-delete" circle @click="showUserDel(scope.row.id)"></el-button>
                    <el-button size="mini" plain type="success" icon="el-icon-check" circle @click="showSetRightDia(scope.row)"></el-button>
                </el-row>
            </template>
        </el-table-column>
    </el-table>
    <!-- 修改权限对话框 -->
    <el-dialog title="修改权限" :visible.sync="dialogFormVisible">
        <!-- 树形结构 -->
        <!-- data->数据源
        show-checkbox选择框
        nodekey每个节点唯一标实
        default-expanded-keys 默认展开【要展开的节点id】
        default-checked-keys 【要选择的节点id】
        props 配置项{label,children} -->
        <el-tree 
        ref="tree"
        :data="treeList" 
        show-checkbox 
        node-key="id" 
        default-expand-all 
        :default-checked-keys="arrcheck" 
        :props="defaultProps">
        </el-tree>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="setRoleRight()">确 定</el-button>
        </div>
    </el-dialog>
</el-card>
</template>

<script>
export default {
    data() {
        return {
            roleList: [],
            dialogFormVisible: false,
            treeList: [],
            defaultProps: {
                label:'authName',
                children:'children'
            },
            arrcheck: [],
            currRoleId: -1

        }
    },
    created() {
        this.getRolelist()
    },
    methods: {
        async setRoleRight() {
            // roleId 当前要修改权限的角色id
            // rids 树形节点中所有全选和半全选id
            
            // console.log(res)
            let arr1 = this.$refs.tree.getCheckedKeys()
           
            let arr2 = this.$refs.tree.getHalfCheckedKeys()
           
            let arr = [...arr1,...arr2]
           
            const res = 
            await this.$http.post(`roles/${this.currRoleId}/rights`,
            {rids:arr.join(',')})
            console.log(res)
            this.getRolelist()
            this.dialogFormVisible = false

        },
        async showSetRightDia(role) {
            this.dialogFormVisible = true
            this.currRoleId = role.id
            const res = await this.$http.get(`rights/tree`)
            this.treeList = res.data.data
            console.log(res)
            let arrtemp2 = []
            role.children.forEach(item1 => {
                // arrtemp2.push(item1.id)
                item1.children.forEach(item2 => {
                    // arrtemp2.push(item3.id)
                    item2.children.forEach(item3 => {
                    arrtemp2.push(item3.id)
                })
                })
            })
            console.log(arrtemp2)
            this.arrcheck = arrtemp2



            // this.getRolelist()
        },
        async deleRight(role, rightId) {
            const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
            // console.log(res)
            role.children = res.data.data
            // this.getRolelist()
        },
        async getRolelist() {
            // const AUTH_TOKEN = localStorage.getItem('token')
            // this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
            const res = await this.$http.get(`roles`)
            this.roleList = res.data.data
            console.log(res)
        }
    }
}
</script>

<style>
.addRole {
    margin-top: 20px;
}
</style>
