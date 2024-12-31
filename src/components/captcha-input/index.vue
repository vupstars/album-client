<script setup lang="ts">
import { NButton, NInput } from "naive-ui";
import { computed, ref } from "vue";

const modelValue = defineModel<string>( "value" );

const props = withDefaults( defineProps<{
    disabled: boolean;
    // 发送验证码前的验证
    validateBeforeSend: () => Promise<boolean>;
}>(), {
    disabled: false,
    validateBeforeSend: async () => true
} );

/* 验证码倒计时 */
const captchaTimer = ref( 60 );
const captchaDisable = ref( false );
const captchaBtnText = computed( () => {
    return captchaDisable.value ? `重新发送(${ captchaTimer.value }s)` : "发送";
} );

async function sendCaptcha() {
    const validate = await props.validateBeforeSend();
    if ( !validate || captchaDisable.value ) return;
    captchaDisable.value = true;

    const timer = setInterval( () => {
        captchaTimer.value--;
        if ( captchaTimer.value <= 0 ) {
            clearInterval( timer );
            captchaTimer.value = 60;
            captchaDisable.value = false;
        }
    }, 1000 );
}
</script>

<template>
    <n-input class="captcha-input" v-model:value.trim="modelValue" placeholder="验证码" :disabled>
        <template #suffix>
            <n-button type="info" size="small" text @click="sendCaptcha" :disabled="captchaDisable">{{
                    captchaBtnText
                }}
            </n-button>
        </template>
    </n-input>
</template>

<style scoped lang="scss">

</style>