<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import { NInput, NButton } from "naive-ui";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/store";
import MainBox from "./components/main-box.vue";

const props = defineProps<{
    email: string;
}>();

const route = useRoute();
const router = useRouter();
const user = useUserStore();

const formData = reactive( {
    email: "",
    password: ""
} );

const loading = ref( false );
const errorMsg = ref( "" );

async function loginByPassword() {
    loading.value = true;
    try {
        await user.USER_LOGIN( formData.email, formData.password );
        const redirectPath = <string | undefined>route.query?.redirect;
        await router.push( redirectPath ? { path: redirectPath } : { name: "Home" } );
    } catch ( error ) {
        errorMsg.value = error.message;
    } finally {
        loading.value = false;
    }
}

watch( () => props.email, value => {
    formData.email = value;
}, { immediate: true } );

const loginDisabled = computed( () => !formData.email || !formData.password );
</script>

<template>
    <main-box title="帐号登录" class="login">
        <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>
        <n-input v-model:value="formData.email" placeholder="邮箱地址" :disabled="loading" maxlength="80" clearable />
        <n-input v-model:value.trim="formData.password" placeholder="密码" :disabled="loading" type="password"
                 show-password-on="click" />
        <router-link class="forget-pwd" to="/">忘记了密码？</router-link>
        <n-button type="info" class="login-btn" @click="loginByPassword" :loading :disabled="loginDisabled" round>登录
        </n-button>
        <slot />
    </main-box>
</template>

<style scoped lang="scss">
.error-msg {
    margin-bottom: 24px;
    color: #ff2b00;
}

.n-input {
    margin-bottom: 10px;
}

.forget-pwd {
    line-height: 22px;
    font-size: 14px;
    color: rgb(61, 118, 153);
}

.login-btn {
    margin-top: 24px;
}
</style>