<template>
    <div v-loading="pageLoading" element-loading-background="#050709">
        <el-table 
            :data="tableData"
            :height="tableHeight"
            @selection-change="handleSelectionChange">
            <el-table-column v-if="Object.keys(groupFilter).length>0" type="selection" align="center" fixed="left" width="45"/>
            <el-table-column type="index" align="center" fixed="left" width="45"/>
            <el-table-column v-for="(item, index) in tableConfig" :key="index"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                :align="(item.align? item.align: '')"
                sortable
            />
            <el-table-column fixed="right" label="操作" width="80" align="center">
                <template slot-scope="scope">
                    <el-popconfirm
                        :confirm-button-text='`${$t("ConfirmRemove2")}`'
                        :cancel-button-text='`${$t("Cancel2")}`'
                        icon="el-icon-info"
                        icon-color="red"
                        title="確定要移除此組件嗎？"
                        @confirm="deleteRow(scope)"
                    >
                        <el-button slot="reference" type="text" size="small">{{ $t("RemoveComponent") }}</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { translateTime } from '@/assets/js/commom.js'
import { DeleteTaget } from '@/assets/js/api_get.js'

export default {
    data() {
        return {
            screenHeight: document.documentElement.clientHeight,
            pageLoading: false,
            tableData: [],
            tableConfig: [
                {prop: 'index', label: 'Index', width: '150'},
                {prop: 'name', label: '名稱', width: '180'},
                {prop: 'mapshow', label: '地理資訊', width: '100', align:"center"},
                {prop: 'loop', label: '資料刷新時間', width: '150', align:"center"},
                {prop: 'sampledata', label: '入庫時間', width: '150', align:"center"},
                {prop: 'source', label: '資料出處', width: '', align:"center"},
            ]
        }
    }, 
    props: {
        dataArray:{
            type: Array
        },
        groupFilter: {
            type: Object,
            default: () => {}
        },
        topicActive:{
            type: Object,
            default: () => {}
        }
    },
    watch: {
        dataArray: {
            deep: true,
            immediate: true,
            handler: function(){
                this.duplicateTableData()
            }
        },
        groupFilter: {
            deep: true,
            immediate: true,
            handler: function(){
                this.duplicateTableData()
            }
        },
        // topicActive:{
        //     deep: true,
        //     immediate: true,
        //     handler: function(newObj){}
        // }
    },
    computed: {
        tableHeight(){
            return this.screenHeight - 245
        }
    },
    methods: {
        duplicateTableData() {
            this.tableData = []
            if(this.dataArray && this.dataArray.length > 0){
                const resetAllData = Object.keys(this.groupFilter).length === 0
                const groupFilterIndex = (this.groupFilter && !resetAllData)? this.groupFilter.index: null
                this.dataArray.map((item) => {
                    const groupBool = resetAllData ? (item.group_index >= 0 || item.group_index === null): item.group_index === groupFilterIndex 
                    if( groupBool ){
                        this.tableData.push({
                            ...item,
                            name: (item.name && item.name !== '')? item.name: '-',
                            mapshow: item.map_config? '有': '-',
                            loop: this.translateLoop(item.update_loop),
                            source: (item.source_from && item.source_from !== '')? item.source_from: '-',
                            sampledata: translateTime(item.sample_data),
                        })
                    }
                })
            }
        },
        translateLoop(ms){
            if(ms){
                const sec = ms/1000
                return (sec%60 === 0)?`每${sec/60}分鐘`: `每${sec}秒`
            }else{
                return '-'
            }

        },
        deleteRow(scope){
            const targetComponentId = scope.row.id
            if(targetComponentId && this.topicActive && this.topicActive.id){
                DeleteTaget(`/api_server/manager/topcomp/fixed/${this.topicActive.id}/component/${targetComponentId}`, this).then(success => {
                    this.$emit('update-data')
                })
            }
        },
        handleSelectionChange(val) {
            this.$emit('send-selection', val)
        }
    }
}
</script>