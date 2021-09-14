<template>
    <div>
        <el-form class="componentFormContainer" :model="requestForm" label-width="90px">
            <el-form-item label="圖表類型" size="small">
                <el-select v-model="requestForm.type" @change="chartTypeChange">
                    <el-option-group
                        v-for="group in chartsList"
                        :key="group.label"
                        :label="group.label"
                    >
                        <el-option
                            v-for="item in group.options"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value"
                            :disabled="item.disabled">
                            <span style="float:left; font-size: 0.8rem;">{{ item.name }}</span>
                            <span style="float:right; color: #8492a6; font-size: 0.8rem;">{{ item.value }}</span>
                        </el-option>
                    </el-option-group>
                </el-select>
            </el-form-item>
            <el-form-item label="組件名稱" size="small">
                <el-input v-model="postForm.name" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="資料來源" size="small">
                <el-input v-model="postForm.source_from" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item 
                v-for="(config, configIndex) in chartConfig"
                :key="configIndex"
                :label="config.key" 
                size="small"
            >
                <el-input v-if="config.type === 'string'" placeholder="輸入字串" v-model="postForm[config.key]" autocomplete="off"/>
                <el-switch v-else-if="config.type === 'boolean'" v-model="postForm[config.key]"></el-switch>
                <el-select v-else-if="config.type === 'array'" placeholder="輸入字串點選下拉表單"
                    v-model="postForm[config.key]" multiple allow-create filterable>
                    <el-option
                        v-for="(item, index) in []"
                        :key="index"
                        :label="item"
                        :value="item"
                    />
                </el-select>
                <el-select v-else-if="config.type === 'select'" placeholder="輸入字串點選下拉表單"
                    v-model="postForm[config.key]" 
                    filterable>
                    <el-option
                        v-for="(item, index) in config.value"
                        :key="index"
                        :label="item"
                        :value="item"
                    />
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="數據單位" size="small">
                <el-input v-model="mapFormObj.unit" autocomplete="off"/>
            </el-form-item> -->
            <el-form-item label="自訂顏色" size="small" v-if="requestForm.type !== 'MapDisplay'">
                <el-color-picker
                    v-model="colorPicker"
                    :predefine="predefineColors"
                    @change="colorPush"/>
                <div class="colorPickerBox">
                    <span v-for="(colorItem, colorIndex) in postForm.colors" :key="colorIndex" :style="{background: colorItem}"/>
                    <span v-if="postForm.colors && postForm.colors.length > 0" class="remove" @click="colorRemove">-</span>
                </div>
            </el-form-item>
        </el-form>
        <footer>
            <el-button size="mini" type="info" round @click="updateChartConfig">預覽</el-button>
        </footer>
    </div>
</template>

<script>
import chartType, {chartList, predefineColors} from '@/assets/datas/chartType.js'
export default {
    data() {
        return {
            predefineColors,
            chartConfig:[],
            colorPicker: null,
        }
    },
    props: {
        mapSet: {
            type: Array,
            default: () => []
        },
        requestForm: {
            type: Object,
            default: () => {}
        },
        postForm: {
            type: Object,
            default: () => {}
        }
    },
    computed:{
        chartsList(){
            let mapShow = false
            this.mapSet.map(item => {
                mapShow = item.config && (item.config.raster || item.config.geoJson ||(item.config.mapBox && item.config.mapBox.mapBoxTrafficCtrl))
            })
            const chartArray = chartList
            chartArray[2]['options'][1]['disabled'] = !mapShow
            return chartArray
        }
    },
    methods: {
        chartTypeChange(){
            if(this.requestForm && this.requestForm.type){
                if(this.requestForm.type === 'MapDisplay')return

                this.chartConfig = []

                const chartTypeConfig = chartType[this.requestForm.type]
                if(chartTypeConfig){
                    Object.keys(chartTypeConfig).map(item => {
                        const configType = chartTypeConfig[item]
                        if(configType === null) return

                        const typeofConfig = typeof chartTypeConfig[item]
                        if(typeofConfig === 'string' || typeofConfig === 'boolean'){
                            this.chartConfig.push({
                                type: typeofConfig,
                                key : item
                            })
                        }else if(typeofConfig === 'object'){
                            if(Array.isArray(chartTypeConfig[item])){
                                if(chartTypeConfig[item].length === 0){
                                    this.chartConfig.push({
                                        type: 'array',
                                        key : item
                                    })
                                }else{
                                    this.chartConfig.push({
                                        type: 'select',
                                        key : item,
                                        value: chartTypeConfig[item]
                                    })
                                }
                            }
                        }
                    })
                }
            }
        },
        colorPush(){
            if(this.postForm && this.postForm.colors.length >= 0){
                this.postForm.colors.push(this.colorPicker)
            }
        },
        colorRemove(){
            this.postForm.colors = this.postForm.colors.slice(0, this.postForm.colors.length - 1)
        },
        updateChartConfig(){
            this.$emit('preview')
        }
    }
}
</script>

<style lang="scss">
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
</style>