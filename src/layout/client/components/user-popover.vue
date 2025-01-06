<script setup lang="ts">
import testAvatar from "@/assets/image/avatar.jpg";
import { NImage, NPopover } from "naive-ui";

const show = defineModel( "show" );

interface ISelectGroup {
    name: string;
    children: Array<{
        type: "link";
        name: string;
        handle: string;
    } | {
        type: "button";
        name: string;
        handle: () => void;
    }>;
}

const selectGroup: ISelectGroup = [
    {
        name: "",
        children: [
            {
                type: "link",
                name: "个人主页",
                handle: "/user/home"
            }
        ]
    },
    {
        name: "Account",
        children: [
            {
                type: "link",
                name: "设置",
                handle: "/user/setting"
            },
            {
                type: "button",
                name: "退出登录",
                handle: () => {

                }
            }
        ]
    }
];

function selectClick( handle: () => void ) {
    handle();
    show.value = false;
}
</script>

<template>
    <n-popover v-model:show="show" trigger="click" width="200px" raw :show-arrow="false">
        <template #trigger>
            <n-image class="trigger-avatar" :src="testAvatar" preview-disabled title="username" />
        </template>
        <div class="user-popover">
            <header class="user-info">
                <router-link to="/user/home" custom v-slot="{ navigate }">
                    <n-image class="avatar" :src="testAvatar" preview-disabled :img-props="{ draggable: false }"
                             @click="selectClick(navigate)" />
                </router-link>
                <router-link class="user-name" to="/user/home" @click="show = false">username</router-link>
                <p class="user-email">mari.lolicon@loli.con</p>
            </header>
            <ul class="select-group">
                <li v-for="group of selectGroup">
                    <p v-if="group.name" class="group-title">{{ group.name }}</p>
                    <template v-for="item of group.children">
                        <router-link v-if="item.type === 'link'" class="group-child" :to="item.handle"
                                     @click="show = false">{{ item.name }}
                        </router-link>
                        <p v-else class="group-child" @click="selectClick(item.handle)">{{ item.name }}</p>
                    </template>
                </li>
            </ul>
        </div>
    </n-popover>
</template>

<style scoped lang="scss">
.trigger-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
}

.user-popover {
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    background-color: #fff;

    &::before {
        content: "";
        display: block;
        width: 100%;
        height: 56px;
        background-color: rgba(0, 0, 0, 0.02);
    }

    .user-info {
        margin-top: -28px;
        padding: 0 16px;

        .avatar {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            cursor: pointer;
        }

        .user-name {
            display: block;
            font-weight: 700;
            cursor: pointer;
        }

        .user-email {
            font-size: 12px;
            margin: -4px 0px;
            color: rgb(133, 133, 133);
        }
    }

    .select-group {
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;
        padding: 20px 0 10px;
        user-select: none;

        .group-title {
            margin-bottom: 6px;
            padding: 0 16px;
            font-size: 12px;
            line-height: 16px;
            color: rgb(133, 133, 133);
        }

        .group-child {
            display: block;
            padding: 9px 16px;
            cursor: pointer;
            font-size: 14px;
            line-height: 22px;
            transition: background 0.2s;

            &:hover {
                background: rgba(0, 0, 0, 0.04);
            }
        }
    }
}
</style>