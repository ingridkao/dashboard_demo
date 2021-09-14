<template>
    <div class="mapFormContainer">
        <div class="mapFormBox">
            <div v-for="(configItem, configIndex) in mapConfigCache" :key="configItem.index" class="listBox">
                <el-button type="text" icon="el-icon-remove" @click="deleteLayer(configItem.index)" :disabled="mapConfigCache.length <= 1"/>
                <div @click="changeLayerTarget(configItem)" :class="{active: layerDataTarget === configItem.index}">
                    <span>Layer {{configIndex + 1}} :</span>
                    {{Object.keys(configItem.config).toString()}}
                </div>
            </div>
            <div class="buttonBox">
                <el-button type="text" @click="addLayerData" class="create">
                    <i class="el-icon-circle-plus-outline"/>
                </el-button>
            </div>

            <el-form :model="mapFormObj" label-width="100px" class="componentFormContainer">
                <el-form-item label="圖層數據來源" size="small">
                    <el-select v-model="mapSourceType" size="small" :disabled="(typeof layerDataTarget !== 'number')" @change="typeChange">
                        <el-option
                            v-for="item in mapSource"
                            :key="item.type"
                            :label="item.title"
                            :value="item.type"
                        />
                    </el-select>
                </el-form-item>
                <div v-if="mapSourceType && mapSourceType === 'mapBox'">
                    <el-form-item label="Traffic">
                        <el-switch
                            v-model="mapBoxTrafficCtrl"
                            active-color="#4a8e9c"
                            @change="trafficChange"/>
                    </el-form-item>
                </div>
                <div v-else-if="mapSourceType">
                    <el-form-item v-if="mapSourceType === 'geoJson'" label="API Path" size="small">
                        <el-input v-model="mapFormObj.url" placeholder='輸入URL' autocomplete="off" @change="urlChange"/>
                    </el-form-item>

                    <el-form-item :label="mapIndexLabel" size="small">
                        <el-input v-model="mapFormObj.index" placeholder='輸入索引' autocomplete="off"/>
                    </el-form-item>
                    <el-form-item label="圖層名稱" size="small">
                        <el-input v-model="mapFormObj.title" placeholder='輸入圖層名稱' autocomplete="off"/>
                    </el-form-item>
                    <el-form-item label="圖層數據單位" size="small">
                        <el-input v-model="mapFormObj.unit" placeholder='輸入數據單位，可不填寫' autocomplete="off"/>
                    </el-form-item>
                    <el-form-item label="圖層顯示類型" size="small">
                        <el-select v-model="mapFormObj.symbol">
                            <el-option-group
                                v-for="group in symbolList"
                                :key="group.label"
                                :label="group.label">
                                <el-option
                                    v-for="item in group.options"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.value">
                                    <span style="float:left; font-size: 0.8rem;">{{ item.name }}</span>
                                    <span style="float:right; color: #8492a6; font-size: 0.8rem;">{{ item.value }}</span>
                                </el-option>
                            </el-option-group>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="圖層顯示顏色" size="small">
                        <el-color-picker v-model="mapFormObj.color" :predefine="predefineColors"/>
                    </el-form-item>
                    <el-form-item label="標籤顯示" size="small">
                        <el-select
                            v-model="mapFormObj.property"
                            multiple
                            filterable
                            allow-create
                            default-first-option
                            placeholder="請選擇標籤顯示項目">
                            <el-option
                                v-for="(item, index) in propertyOptions"
                                :key="index"
                                :label="index"
                                :value="index"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="圖層樣式屬性">
                        <el-input
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 6}"
                            placeholder='輸入樣式屬性，如{"circle-radius": 5}'
                            v-model="paintTextarea"
                            @change="paintChange"/>
                        <div >
                            <el-link href="https://docs.mapbox.com/mapbox-gl-js/style-spec/layers" target="_blank" :underline="false">Mapbox圖層樣式屬性規範文件</el-link>
                        </div>
                    </el-form-item>
                </div>
            </el-form>
            <footer>
                <el-button size="mini" type="info" round @click="updateMapConfig">預覽</el-button>
            </footer>
        </div>
    </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import {predefineColors} from '@/assets/datas/chartType.js'
import mapSource, {symbolList} from '@/assets/datas/mapType.js'
export default {
    data() {
        return {
            mapSource,
            mapSourceType: null,
            symbolList,
            mapConfigObj:{},
            mapFormObj: {},
            layerDataTarget: null,
            mapBoxTrafficCtrl:false,
            predefineColors,
            paintTextarea: '',
        }
    },
    props: {
        propertyOptions: {
            type: Object,
            default: () => {}
        },
        mapConfigCache: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        mapIndexLabel(){
            return this.mapSourceType && this.mapSourceType === 'raster'? 'Tms index': 'Index'
        }
    },
    watch: {
        mapConfigCache: {
            deep: true,
            immediate: false,
            handler: function(newArr){
                if(!(newArr && newArr.length > 0)){
                    this.cleanFrom()
                }
            }
        },
    },
    methods: {
        cleanFrom(){
            this.layerDataTarget = null
            this.mapSourceType = null
            this.mapFormObj = {}
            this.paintTextarea = ""
            this.configDataTarget = {}
        },
        addLayerData(){
            const mapIndex = this.mapConfigCache[this.mapConfigCache.length - 1]['index']
            this.mapConfigCache.push({
                index: mapIndex + 1,
                config: {}
            })
            this.cleanFrom()
            this.changeLayerTarget(this.mapConfigCache.length - 1)
        },
        deleteLayer(target){
            if(this.mapConfigCache.length === 0) return
            this.$emit('delete', target)
            this.changeLayerTarget(this.mapConfigCache.length - 1)
        },
        changeLayerTarget(target){
            this.cleanFrom()
            this.layerDataTarget = target.index
            const targetData = this.mapConfigCache.filter(item => item.index == this.layerDataTarget)
            if(targetData.length > 0 && targetData[0]['config']){
                const configDataTarget = targetData[0]['config']
                if(configDataTarget){
                    this.mapSourceType = Object.keys(configDataTarget)[0]
                    this.mapFormObj = Object.values(configDataTarget)[0]
                }
            }
        },
        typeChange(){
            if(this.layerDataTarget >= 0 && this.mapSourceType){
                // Init form 
                if(this.mapSourceType === 'mapBox'){
                    this.trafficChange()
                }else{
                    const targetMapSource = mapSource.find(item => item.type === this.mapSourceType)
                    this.mapFormObj = cloneDeep(targetMapSource.request)
                    this.mapConfigObj = {
                        [this.mapSourceType]: this.mapFormObj
                    }
                    this.updateConfigCache()
                }
            }
        },
        trafficChange(){
            this.mapConfigObj = {[this.mapSourceType]: { mapBoxTrafficCtrl: this.mapBoxTrafficCtrl }}
            this.updateConfigCache()
        },
        updateConfigCache(){
            const targetMapIndex = this.mapConfigCache.findIndex(item => item.index === this.layerDataTarget)
            this.mapConfigCache[targetMapIndex] = {
                ...this.mapConfigCache[targetMapIndex],
                config: this.mapConfigObj
            }
        },
        paintChange(e){
            //Replace apostrophe & remove blank
            this.paintTextarea = e.replace(/[']/g, '\"')
            this.paintTextarea = this.paintTextarea.replace(/[\n\t\v\r\b\f]/g, '')
            //space character
            this.mapFormObj.paint = this.paintTextarea.replace(/[\s]/g, '')
        },
        urlChange(urlValue){
            if(typeof urlValue !== 'string' || this.mapFormObj.index != '') return
            const splitArray = urlValue.split('/')
            this.mapFormObj.index = splitArray[splitArray.length-1]
        },
        updateMapConfig(){
            this.updateConfigCache()
            this.$emit('preview', this.mapConfigCache)
        }
    }
}
</script>

<style lang="scss">
@import "~@/assets/scss/basic.scss";
@import "~@/assets/scss/_color.scss";
.colorPickerBox{
    span{
        display: inline-block;
        vertical-align: middle;
        width: 1rem;
        height: 1rem;
        margin-left: .5rem;
        border-radius: 50%;
        &.remove{
            border: 1px solid #fff;
            color: #fff;
            text-align: center;
            font-size: 1.75rem;
            line-height: .75rem;
            opacity:0.8;
            &:hover{
                opacity:1;
            }
        }
    }
}
.listBox{
    width: 95%;
    @extend %spaceBetween;
    >div{
        flex-basis: calc(100% - 2.5rem);
        padding: .25rem .75rem;
        border-radius: 1rem;
        color: darken($PrimaryColor, 5);
        border: 1px solid $PrimaryColor;
        cursor: pointer;
        opacity:0.9;
        span:first-child{
            margin-right: .5rem;
            color: lighten($PrimaryColor, 10) !important;
        }
        &.active{
            opacity:1;
            color: lighten($PrimaryColor, 20);
            border-color: lighten($PrimaryColor, 20);
            background: rgba($PrimaryColor, 0.1);
        }
        &:not(.active):hover{
            opacity:1;
            border-color: lighten($PrimaryColor, 10);
        }
    }
    .el-button--text{
        flex-basis: 2rem;
        color: $PrimaryColor;
        &:hover{
            color: lighten($PrimaryColor, 10);
        }
        &.is-disabled{
            color: $PrimaryColor !important;
            opacity:0.3;
        }
    }
    .el-input__inner{
        border-color: lighten($PrimaryColor, 10);
    }
}
.mapFormContainer{
}
.mapFormBox{
    .componentFormContainer{
        margin-top: 1rem;
    }
    .buttonBox{
        text-align: center;
    }
    >footer{
        justify-content: center !important;
    }
}
</style>