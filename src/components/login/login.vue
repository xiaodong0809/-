<template>
<div class="login-wrap">
    <el-form class="login-form" label-position="top" label-width="80px" :model="formLabelAlign">
        <h2>用户登录</h2>
        <el-form-item label="用户名">
            <el-input v-model="formLabelAlign.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="formLabelAlign.password"></el-input>
        </el-form-item>
        <el-button class="login-btn" type="primary" @click.prevent="handleLogin()">登陆</el-button>
    </el-form>
</div>
</template>

<script>
export default {
    data() {
        return {
            formLabelAlign: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        async handleLogin() {
            const res = await this.$http.post('login', this.formLabelAlign)
                const {
                    data,
                    meta: {
                        msg,
                        status
                    }
                } = res.data
                if (status === 200) {
                    //保存tocken
                    localStorage.setItem('token',data.token)
                    this.$router.push({name:'home'})
                    this.$message.success(msg)
                } else {
                    this.$message.warning(msg)
                }
        }
    }
}
</script>

<style>
.login-wrap {
    height: 100%;
    background-color: #314152;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-form {
    width: 400px;
    background: #fff;
    border-radius: 5px;
    padding: 30px;

}

.login-btn {
    width: 100%;
}
</style>
