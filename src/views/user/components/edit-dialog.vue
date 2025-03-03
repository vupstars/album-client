<script setup lang="ts">
import { ref } from "vue";
import { type FormRules, type FormInst, NForm, NFormItem, NInput } from "naive-ui";
import CommonDialog from "@/components/common-dialog/index.vue";
import AvatarUpload from "./avatar-upload.vue";
import testAvatar from "@/assets/image/avatar.jpg";
import { formValidate } from "@/utils/formValidate.ts";

const show = defineModel<boolean>( "show", { required: true } );
const curAvatar = ref( testAvatar );
const formData = ref<Record<string, any>>( {} );

const formRules: FormRules = {
    nickname: {
        required: true,
        validator( _, value ) {
            if ( !value ) {
                return new Error( "请输入昵称" );
            }
        },
        trigger: "blur"
    }
};

const loading = ref( false );
const formRef = ref<FormInst | null>( null );

async function updateUserInfo() {
    const validate = await formValidate( formRef.value );
    if ( !validate ) {
        return;
    }

    loading.value = true;

    try {
        await new Promise( resolve => {
            setTimeout( resolve, 3000 );
        } );
        // 更新 pinia 中的用户信息
        show.value = false;
    } catch ( error ) {
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <common-dialog v-model:show="show" custom-class="edit-dialog" title="编辑个人资料" @confirm="updateUserInfo" :loading>
        <n-form ref="formRef" :model="formData" :rules="formRules">
            <n-form-item path="avatar" label="个人头像">
                <avatar-upload v-model:src="curAvatar" />
            </n-form-item>
            <n-form-item path="nickname" label="昵称">
                <n-input
                        class="line-input"
                        v-model:value="formData.nickname"
                        maxlength="15"
                        placeholder=""
                        @keydown.enter.prevent
                        show-count
                />
            </n-form-item>
            <n-form-item path="desc" label="自我介绍">
                <n-input
                        v-model:value="formData.desc"
                        type="textarea"
                        maxlength="200"
                        placeholder=""
                        @keydown.enter.prevent
                        show-count
                />
            </n-form-item>
        </n-form>
    </common-dialog>
</template>

<style scoped lang="scss">
.n-form {
    padding: 0 24px;

    .line-input {
        width: 392px;
    }
}
</style>