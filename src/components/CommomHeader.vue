<template>
    <div class="boxCardInfo content" :class="[view, {center : !subDataOtherShow}]">
        <h3 v-html="subDataName"/>
        <p 
            class="ellipsis desc" 
            :class="view"
            :style="{maxWidth: ellipsisMaxWidth}">
            <span v-html="translateTime" class="translateTime"/>
            <span v-html="translateFrom" class="translateFrom"/>
            <span v-if="view === 'mapview'" class="conditionIcon">
                <i v-if="haveMap" class="el-icon-location-outline"/>
                <i v-if="haveHistory" class="el-icon-time"/>
            </span>
        </p>
    </div>
</template>
<script>
import dayjs from 'dayjs'
export default {
    props: {
        subData: {
            type: Object,
            default: () =>{return {}}
        },
        view: {
            type: String,
            default: 'dashboard'
        },
        lastTime: {
            type: String,
            default: ''
        }
    },
    computed:{
        subDataName(){
            return (this.subData && this.subData.name)? this.subData.name: '組件名稱'
        },
        haveHistory(){
            return (this.subData && typeof this.subData.calculation_config && typeof this.subData.calculation_config === 'object')
        },
        haveMap(){
            return (this.subData && this.subData.map_config)
        },
        ellipsisMaxWidth(){
            return (this.subData && this.subData.name)? `${22 - this.subData.name.length}rem`: 'none'
        },
        translateFrom(){
            return (this.subData && this.subData['source_from'])? this.subData['source_from']: ''
        },
        subDataOtherShow(){
            return this.view !== 'dashboard' && (this.translateTime != '' || this.translateFrom != '')
        },
        translateTime(){
            if(dayjs(this.lastTime).isValid()){
                return dayjs(this.lastTime).format('YYYY-MM-DD')
            }else if(this.subData.sample_data && this.subData.sample_data !== ""){
                return (this.subData.sample_data === '樣本數據') ? '樣本數據': dayjs(this.subData.sample_data).format('YYYY-MM-DD')
            }else if(this.subData.update_loop){
                const ms = this.subData.update_loop
                if(ms === 0) return `即時串流`
                const second = ms/1000
                if(second < 60) return `${second}秒更新 `
                return `${(second/60).toFixed()}分鐘更新 `
            }else{
                return ''
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/basic.scss";
@import '@/assets/scss/_color.scss';
    #mapAside{
        .boxCardInfo.content{
            position: absolute;
            top: .45rem;
            width: calc(100% - 3.5rem);
            justify-content: left;
            h3{
                margin-right: .5rem;
            }
            >span{
                flex: 1 1 45%;
                margin-left: 0.5rem;
            }
        }
        .translateTime{
            max-width: 6rem;
        }
        .translateFrom{
            max-width: 9rem;
        }
        .conditionIcon i{
            margin-left: 0.5rem;
        }
    }
</style>
