<template>
    <div>
        <el-form class="componentFormContainer" :model="requestForm" label-width="90px">
            <el-form-item label="API Path" size="small">
                <el-input v-model="requestForm.path" autocomplete="off"/>
            </el-form-item>
            <div v-if="requestForm.path">
                <el-form-item label="Column" size="small">
                    <el-input v-model="requestForm.column" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="Date Picker" size="small">
                    <el-date-picker
                        v-model="daterange"
                        type="datetimerange"
                        align="right"
                        start-placeholder="Start"
                        end-placeholder="End"
                        :default-time="['00:00:00', '23:59:59']"
                        :class="'custom'"
                        :popper-class="'custom'"
                        @change="changeDaterange"
                        clearable
                    />
                </el-form-item>
                <el-form-item label="Year" size="small">
                    <el-input v-model="requestForm.year" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="Season" size="small">
                    <el-select v-model="requestForm.season" clearable>
                        <el-option v-for="item in 4" :key="item" :label="item" :value="item"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="Month" size="small">
                    <el-select v-model="requestForm.month" clearable>
                        <el-option v-for="item in 12" :key="item" :label="item" :value="item"/>
                    </el-select>
                </el-form-item>
            </div>
        </el-form>
        <footer>
            <el-button size="mini" :disabled="!requestForm.path" type="info" round @click="updateRequestConfig">預覽</el-button>
        </footer>
    </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
    data() {
        return {
            daterange: [],
            mapConfigArray: [{
                index: 0,
                config: {}
            }],
            layerDataTarget: 0,

        }
    },
    props: {
        requestForm: {
            type: Object,
            default: () => {}
        },
        datasetConfig: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        updateRequestConfig(){
            this.$emit('preview')
        },
        changeDaterange(){
            let newData =[]
            if(this.daterange && this.daterange.length === 2){
                newData = this.daterange.map(item => {
                    return dayjs(item).format('YYYY-MM-DDTHH:mm:ssZ')
                })
            }
            this.$emit('update', newData)
        },
        deleteLayer(target){
            if(this.mapConfigArray.length === 0) return
            this.mapConfigArray = this.mapConfigArray.filter(item => item.index !== target)
            // this.cleanFrom()
            this.changeLayerTarget(this.mapConfigArray.length - 1)
        },
        changeLayerTarget(target){
            // this.cleanFrom()
            this.layerDataTarget = target.index
            // const targetData = this.mapConfigArray.filter(item => item.index == this.layerDataTarget)
            // if(targetData.length > 0 && targetData[0]['config'] && Object.keys(targetData[0]['config']).length > 0){
            //     const configDataTarget = targetData[0]['config']
            //     this.mapSourceType = Object.keys(configDataTarget)[0]
            //     this.mapFormObj = configDataTarget[this.mapSourceType]
            // }
        }
    }
}
</script>