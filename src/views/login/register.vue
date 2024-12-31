<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { type FormRules, NButton, NForm, NFormItem, NInput, type FormInst } from "naive-ui";
import MainBox from "./components/main-box.vue";
import { formValidate } from "@/utils/formValidate";
import CaptchaInput from "@/components/captcha-input/index.vue";

const formData = reactive( {
    email: "",
    password: "",
    passwordConfirm: "",
    captcha: ""
} );

const formRef = ref<FormInst | null>();
const loading = ref( false );

const emits = defineEmits<{
    completed: [ email: string ];
}>();

const formRules: FormRules = {
    email: {
        key: "email",
        required: true,
        validator( _, value ) {
            if ( !value ) {
                return new Error( "请输入邮箱" );
            }
            if ( !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test( value ) ) {
                return new Error( "邮箱地址格式不正确" );
            }
            return true;
        },
        trigger: "blur"
    },
    password: {
        required: true,
        validator( _, value ) {
            if ( !value ) {
                return true;
            }
            if ( value.length < 6 ) {
                return new Error( "密码长度不能小于 6 位" );
            }
            return true;
        },
        trigger: "blur"
    },
    passwordConfirm: {
        required: true,
        validator( _, value ) {
            if ( !value ) {
                return true;
            }
            if ( value !== formData.password ) {
                return new Error( "两次输入的密码不一致" );
            }
            return true;
        },
        trigger: "blur"
    }
};

async function createAccount() {
    const validate = await formValidate( formRef.value );
    if ( !validate ) return;

    loading.value = true;

    try {
        await new Promise( resolve => {
            setTimeout( resolve, 3000 );
        } );
        emits( "completed", formData.email );
    } catch ( error ) {

    } finally {
        loading.value = false;
    }
}

function validateEmailBeforeSendCaptcha() {
    return formValidate( formRef.value, rule => rule.key === "email" );
}

const nextBtnDisabled = computed( () => {
    return !formData.email || !formData.password || !formData.passwordConfirm || !formData.captcha;
} );
</script>

<template>
    <main-box title="注册帐号" class="login">
        <n-form ref="formRef" class="login" :model="formData" :rules="formRules" :show-label="false">
            <n-form-item path="email">
                <n-input v-model:value="formData.email" placeholder="邮箱地址" :disabled="loading" maxlength="80"
                         clearable />
            </n-form-item>
            <n-form-item path="password">
                <n-input v-model:value.trim="formData.password" placeholder="密码" :disabled="loading" type="password"
                         show-password-on="click" />
            </n-form-item>
            <n-form-item path="passwordConfirm">
                <n-input v-model:value.trim="formData.passwordConfirm" placeholder="确认密码" :disabled="loading"
                         type="password"
                         show-password-on="click" />
            </n-form-item>
            <n-form-item path="passwordConfirm">
                <captcha-input v-model:value.trim="formData.captcha" :disabled="loading"
                               :validate-before-send="validateEmailBeforeSendCaptcha" />
            </n-form-item>
            <n-button
                    type="info"
                    @click.prevent="createAccount"
                    :disabled="nextBtnDisabled"
                    :loading
                    round
            >注册
            </n-button>
            <slot />
        </n-form>
    </main-box>
</template>

<style scoped lang="scss">
.n-form-item {
    margin-bottom: 4px;
}
</style>