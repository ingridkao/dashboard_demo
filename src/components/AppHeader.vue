<template>
    <header id="appHeaderContainer">
        <div>
            <a id="appLogoBox" @click="routerPush('Dashboard')">
                <img :src="AppLogo" :alt="AppTitle">
                <span>
                    <h1>{{ AppTitle }}</h1>
                    <h2>{{ $t("AppTitleEng") }}</h2>
                </span>
            </a>
            <div id="breadcrumb">
                <!-- <el-button type="text">{{ `${$t(routeName)}`}}</el-button> -->
                <span>
                    <el-button type="text" :disabled="isDashboard" @click="routerPush('Dashboard')">{{ $t("Dashboard") }}</el-button>
                </span>
                <span v-if="isMapView">
                    <span class="arrow">></span>
                    <el-button type="text" :disabled="isMapView">{{ `${topicName}${$t("MapView")}` }}</el-button>
                </span>
            </div>
        </div>
            <span class="el-dropdown-link">
                public
                <!-- <el-button id="darkModeSwitch" :class="darkMode" command="switchColorTheme" @click="toggleColor"></el-button> -->
            </span>
    </header>
</template>
<script>
import { mapState } from 'vuex'
import AppLogo from '@/assets/images/TUIC-10.svg'

export default {
    data() {
        return {
            AppLogo,
            AppTitle: this.$t("AppTitle"),
            dialogTopicFormVisible: false,
            topiclTableData: [],
            formLabelWidth: 21,
            accountForm: {
                name: ''
            },
            dialogPassFormVisible: false
        }
    },
    computed: {
        ...mapState(['darkMode', 'topicFixedArray', 'topicCustomizedArray', 'userProfile']),
        isAdmin(){
            return this.userProfile.gid && this.userProfile.gid === 1
        },
        dataThemeQuery(){
            const {topicid, type} = this.$route.query
            return {topicid, type}
        },
        routeName(){
            return this.$route.name
        },
        isDashboard(){
            return this.routeName === 'Dashboard'
        },
        isMapView(){
            return this.routeName === 'MapView'
        },
        topicName(){
            const {id, type} = this.$route.query
            let target = null
            if(type === 'fixed'){
                target = this.topicFixedArray.find(item=> item.id == id)
            }else{
                target = this.topicCustomizedArray.find(item=> item.id == id)
            }
            return (target)? target.name: this.$t("CommonlyComponent")
        }
    },
    methods: {
        routerPush(params){
            if(params && (params === 'Dashboard' || params === 'OverViews')){
                this.$router.push({
                    name: params,
                    query: this.$route.query
                })
            }
        },
        toggleColor(){
            const theme = (this.darkMode === 'dark')? 'light': 'dark'
            this.$store.commit('changeDarkMode', theme)
        }
    }
}
</script>

<style lang="scss">
    @import '@/assets/scss/basic.scss';
    @import '@/assets/scss/_color.scss';
    #appHeaderContainer{
        @extend %spaceBetween;
        width: 100%;
        height: $appContainerHeaderHeight;
        padding: $appContainerHeaderPadding 1.5em;
        &.isAdmin{
            background-color: darken($blackColor, 4);
        }
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
                color: darken($whiteColor, 25);
                &:disabled{
                    color: darken($whiteColor, 10);
                }
            }
            span{
                vertical-align: middle;
                &.arrow{
                    color: darken($whiteColor, 50);
                    font-size: 0.8rem;
                }
            }
        }
    }
</style>