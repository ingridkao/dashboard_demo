<template>
    <header id="appHeaderContainer">
        <div>
            <a id="appLogoBox" @click="routerDashboard()">
                <img :src="AppLogo" :alt="AppTitle">
                <span>
                    <h1>{{ AppTitle }}</h1>
                    <h2>{{ $t("AppTitleEng") }}</h2>
                </span>
            </a>
            <div id="breadcrumb">
                <span>
                    <!-- <span v-if="activedTopic.name">{{activedTopic.name}}</span> -->
                    <el-button type="text" :disabled="isDashboard" @click="routerDashboard()">{{ $t("Dashboard") }}</el-button>
                </span>
                <span v-if="isMapView">
                    <span class="arrow">></span>
                    <el-button type="text" :disabled="isMapView">{{ `${activedTopic.name? activedTopic.name: ''}${$t("MapView")}` }}</el-button>
                </span>
            </div>
        </div>
        <div id="toolBtnArea">
            <el-button type="text" :icon='"el-icon-notebook-2"' @click="drawer = true"/>
            <el-button type="text" :icon='(darkMode === "light")? "el-icon-sunny": "el-icon-moon"' @click="toggleColor"/>
            <!-- <i class="el-icon-printer"/>  -->
            <!-- <i class="el-icon-more-outline"/> -->
        </div>
        <el-drawer
            id="topicPicker"
            title=""
            :visible.sync="drawer"
            :direction="'rtl'"
            :before-close="handleClose">
            <div class="topicContainer">
                <div class="topicItem" v-for="(topicItem, topicIndex) in topicList" :key="topicIndex" :class="[{active: activedTopic && activedTopic.index === topicItem.index}]" @click="topicPickerUpdate(topicItem)">
                    <img :src="require(`@/assets/images/thumb/${topicItem.thumbnail}.png`)" :alt="topicItem.name">
                    <div>
                        <h6>{{topicItem.name}}</h6>
                        <p>{{topicItem.desc}}</p>
                    </div>
                </div>
            </div>
        </el-drawer>
    </header>
</template>
<script>
import { mapState } from 'vuex'
import AppLogo from '@/assets/images/TUIC-10.svg'
import { topicList } from '@/assets/datas/topicList.js'

export default {
    data() {
        return {
            AppLogo,
            AppTitle: this.$t("AppTitle"),
            drawer: false,
            topicList
        }
    },
    computed: {
        ...mapState(['darkMode', 'activedTopic']),
        routeName(){
            return this.$route.name
        },
        isDashboard(){
            return this.routeName === 'Dashboard'
        },
        isMapView(){
            return this.routeName === 'MapView'
        }
    },
    methods: {
        routerDashboard(){
            this.$router.push({
                name: 'Dashboard',
            })
        },
        toggleColor(){
            const theme = (this.darkMode === 'dark')? 'light': 'dark'
            this.$store.commit('changeDarkMode', theme)
        },
        handleClose(done){
            done()
        },
        topicPickerUpdate(topicItem){
            this.$store.commit('updateActivedTopic', topicItem)
        }
    }
}
</script>

<style lang="scss">
    @import '@/assets/scss/basic.scss';
    @import '@/assets/scss/_color.scss';
    @import "~@/assets/scss/scrollbar.scss";

    #appHeaderContainer{
        @extend %spaceBetween;
        width: 100%;
        height: $appContainerHeaderHeight;
        padding: $appContainerHeaderPadding 1.5em;
        >div{
            display: flex;
            align-items: center;
            height: 100%;
            a{
                height: 100%;
                margin: 0 .25rem;
            }
        }
        *{
            white-space: nowrap;
        }
    }
    #appLogoBox{
        display: inline-flex;
        align-items: center;
        text-decoration: none;
        cursor: pointer;
        span{
            margin: 0 2.5rem 0 1.2rem;
            h1{
                font-size: 1rem;
            }
            h2{
                font-size: 0.6rem;
                font-weight: normal;
                opacity: 0.6;
            }
        }
    }
    #breadcrumb {
        button{
            font-size: 1rem;
            margin: .5rem;
        }
        span{
            vertical-align: middle;
            &.arrow{
                font-size: 0.8rem;
            }
        }
    }
    #toolBtnArea{
        button{
            font-size: 1.5rem;
        }
    }
    #topicPicker .el-drawer{
        .topicContainer{
            max-height: calc(100vh - 5.5rem);
            overflow-y: scroll;
        }
        .topicItem{
            position: relative;
            width: 100%;
            padding: 0 2rem 1rem 2rem;
            opacity: 0.75;
            &.active{
                opacity: 0.9;
            }
            img{
                width: 100%;
                height: auto;
                border: 3px solid $whiteColor;
            }
            >div{
                position: absolute;
                top: 0;
                padding: 1rem;
                h6{
                    color: $whiteColor;
                }
                p{
                    color: $borderColor;
                }
            }
        }
    }
    #appContainer[data-theme=dark]{
        #topicPicker .el-drawer{
            background: lighten($mainBackgroundColor, 5);

        } 
        #breadcrumb {
            button{
                color: darken($whiteColor, 25);
                &:disabled{
                    color: darken($whiteColor, 10);
                }
            }
            span{
                &.arrow{
                    color: darken($whiteColor, 50);
                }
            }
        }
    }
    #appContainer[data-theme=light]{
        #topicPicker .el-drawer{
            background: $whiteColor;
        } 
        #breadcrumb {
            button{
                color: darken($grayColor, 25);
                &:disabled{
                    color: darken($grayColor, 10);
                }
            }
            span{
                &.arrow{
                    color: darken($grayColor, 50);
                }
            }
        }

    }
</style>