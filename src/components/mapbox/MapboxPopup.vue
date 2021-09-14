<template>
    <div class="popupBox">
        <div class="popupBoxTitle">
            {{ title }}
        </div>
        <div v-for="(item, i) in propertieData" :key="i">
            <div v-if="item !== '' && i === 'url'" class="popupLink">
                <a :href="item" target="_blank" rel="noreferrer noopener">另開視窗查看</a>
            </div>
            <div v-else-if="item !== ''">
                <span>{{i}}</span>
                <span>{{item}}</span>
            </div>
        </div>
        <div class="horizontal alignCenter" :class="bottomClass">
            <el-pagination
                v-if="featureArr.length > 1"
                small
                layout="pager"
                :total="featureArr.length"
                :page-size="1"
                :current-page.sync="nowSelectPage"
                @current-change="setNowSelectPage"
            />
        </div>
    </div>
</template>
 
<script>
import Vue from 'vue'
import lang from '@/locales/index.js'

export default Vue.extend({
    data(){
        return {
            propTitleIndex:['case_type'],
            nowSelectPage: 1
        }
    },
    props: {
        featureArr: {
            required: true,
            type: Array,
        },
        title: {
            type: String,
        },
        setNowSelectPage: {
            type: Function
        },
        devProperty: {
            type: Array
        }
    },
    computed: {
        feature() {
            const nowSelectIndex = this.nowSelectPage - 1
            return this.featureArr[nowSelectIndex]
        },
        bottomClass() {
            if(this.featureArr.length > 1) return 'spaceBetween'
            else return 'flexEnd'
        },
        propertieData() {
            let obj = {}
            const subProperty = {}
            if(this.devProperty){
            this.devProperty = this.devProperty.map(property => {
                if(property.includes('.')) {
                    const propertyArr = property.split('.')
                    property = propertyArr[0]
                    subProperty[property] = propertyArr[1]
                }
                return property
            })
            }
            const featureProperties = this.feature.properties
            if(featureProperties && Object.keys(featureProperties).length > 0){
                if(this.devProperty){
                    Object.keys(featureProperties).map(item => {
                        if(!this.devProperty.includes(item)) return
                        //時間轉換
                        let nowProerty = featureProperties[item]
                        if(typeof nowProerty === 'string') {
                            if(nowProerty.includes('{')) {
                                const nowProertyObj = JSON.parse(nowProerty)
                                if(typeof nowProertyObj === 'object') {
                                    nowProerty = nowProertyObj[subProperty[item]]
                                }
                            }
                        }
                        obj[item] = nowProerty
                    })
                    obj = Object.keys(obj).length === 0? featureProperties: obj
                }else{
                    obj = featureProperties
                }
            }
            return obj
        }
    },
})
</script>
<style lang="scss">
@import '@/assets/scss/_color.scss';
    .popupBox {
        .el-pagination {
            .el-pager li {
                background-color: transparent;
                color: $whiteColor;
                &.active {
                    color: $activeColor;
                }
            }
        }
    }
</style>