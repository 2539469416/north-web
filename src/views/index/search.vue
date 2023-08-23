<template>
    <div class="main-container" id="">
        <div class="search" id="search">
            <div class="left">
                <img src="./../../assets/hakuna.png">
            </div>
            <div class="right">
                <el-input class="search-input" v-model="searchText" size="large" />
                <el-button class="search-button" type="primary" @click="onSearch">搜索</el-button>
            </div>
        </div>
        <div class="base_info">
            <el-descriptions label-class-name="my-label" :data="baseInfo"  title="基础信息" :column="3" :border="2"  direction="vertical">
                <el-descriptions-item label="IP">{{baseInfo?.ip}}</el-descriptions-item>
                <el-descriptions-item label="域名">{{baseInfo?.domain}}</el-descriptions-item>
                <el-descriptions-item label="地址" :span="2">{{baseInfo?.city}}</el-descriptions-item>
                <el-descriptions-item label="标签">
                    <el-tag v-for="(item) in baseInfo?.labelList" :key="item">{{ item }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="分析笔记">{{baseInfo?.judged}}</el-descriptions-item>
            </el-descriptions>
        </div>
        <div class="base_info">
            <el-descriptions label-class-name="my-label" :data="whoisVo"  title="Whois信息配置" :column="2" :border="2"  direction="vertical">
                <el-descriptions-item label="主机">{{whoisVo?.host}}</el-descriptions-item>
                <el-descriptions-item label="注册商">{{whoisVo?.registrar}}</el-descriptions-item>
                <el-descriptions-item label="联系人" >{{whoisVo?.contactPerson}}</el-descriptions-item>
                <el-descriptions-item label="邮箱">{{whoisVo?.email}}</el-descriptions-item>
                <el-descriptions-item label="电话">{{whoisVo?.phone}}</el-descriptions-item>
                <el-descriptions-item label="过期时间">{{whoisVo?.expirationDate}}
                </el-descriptions-item>
            </el-descriptions>
        </div>

    </div>
</template>
  
<script lang="ts">


import {
    computed,
    defineComponent,
    onMounted,
    ref,
    watch,
} from "vue";

import { useLayoutStore } from "@/layouts/hooks";
import { get } from '../../api/http';
import { getSearchIoc } from '../../api/url'
export default defineComponent({
    name: "Search",
    components: {

    },
    setup() {
        const layoutStore = useLayoutStore();
        const searchText = ref("");
        const baseInfo = ref<BaseInfoType>();
        const whoisVo = ref<whoisType>(); 
        const collapse = computed(() => {
            return layoutStore.state.isCollapse;
        });
        const onSearch = () => {

            console.log(searchText.value);
            get({
                url: getSearchIoc,
                data:{
                    query: searchText.value
                }
            })
                .then((res:any) => {
                    baseInfo.value = res
                    whoisVo.value = res.whoisVo
                    console.log(baseInfo);
                })
        };
        return {
            searchText,
            onSearch,
            collapse,
            baseInfo,
            whoisVo,
        };
    },
});

</script>
  
<style lang="scss" scoped>
.search {
    display: flex;
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
    padding-top: 50px;
    overflow: hidden;
    zoom: 1;
}

.search-input {
    height: 48px;
    width: 450px;
    border-radius: 0 4px 4px 0;
}

.search-button {
    height: 48px;
    border-radius: 0 4px 4px 0;
    /* 左上角和左下角为直角 */
}


.left {
    float: left;
    margin: 0 20px;
    text-align: center;
}

.right {
    display: flex;
    align-items: center;
    // border-style: solid; 
    border-color: rgb(0, 247, 255);
}
img {
    padding-top: 4px;
    text-align: center;
}
.my-label{
    text-align:center;
    min-width: 250px;
    word-break:break-all;
    background:  #0AFFFF;
}
.base_info{
    margin: 20px;
}
</style>
  