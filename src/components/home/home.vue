<template>
<el-container class="container">
    <el-header class="header">
        <el-row>
            <el-col :span="4">
                <div class="grid-content bg-purple"><img src="../../assets/logo.png" alt="无法显示图片"></div>
            </el-col>
            <el-col :span="18">
                <h3 class="middle">电商后台管理系统</h3>
            </el-col>
            <el-col :span="2">
                <div class="grid-content bg-purple">
                    <a href="#" class="loginout" @click.prevent="signOut()">退出</a>
                </div>
            </el-col>
        </el-row>
    </el-header>
    <el-container>
        <el-aside width="200px" class="aside">
            <el-menu :unique-opened="true" :router="true">
                <el-submenu :index="''+item1.order" v-for="(item1,i) in menus" :key="i">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>{{item1.authName}}</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item :index="item2.path" v-for="(item2,i) in item1.children" :key="i">
                            <i class="el-icon-location"></i>
                            <span>{{item2.authName}}</span>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-main class="main">
            <router-view></router-view>
        </el-main>
    </el-container>
</el-container>
</template>

<script>
export default {
    data(){
        return{
            menus:''
        }
    },
    beforeCreate() {
        // const token = localStorage.getItem('token')
        // if (!token) {
        //     this.$router.push({
        //         name: 'login'
        //     })
        // }
    },
    created(){
        this.getMenus()
    },
    methods: {
        async getMenus(){
            const res = await this.$http.get(`menus`)
            this.menus = res.data.data
        },
        signOut() {
            localStorage.clear();
            this.$message.success('退出成功');
            this.$router.push( { name:'login' } );
        }
    }
}
</script>

<style>
.container {
    height: 100%;
}

.header {
    background: #d3dcd6;
}

.aside {
    background: #e9eef3;
}

.main {
    background: #b3c0d1;
}

.middle {
    text-align: center;
}

.loginout {
    line-height: 60px;
    text-decoration: none;
}
</style>
