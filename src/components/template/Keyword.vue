<template>
    <div class="keywordContainer">
        <CommomHeader v-if="themeDatasetIndex === 0" :sub-data="subData" :view="view" :last-time="updateTime"/>
        <div class="keywordDisplay">
            <h2 v-for="(contentItem, contentIndex) in displayData" :key="contentIndex">
                {{contentItem.key}}
            </h2>
        </div>
    </div>
</template>
<script>
import CommomHeader from '@/components/CommomHeader.vue'
export default {
    components: { CommomHeader },
    props: {
        promise: {
            type: Promise
        },
        themeDatasetIndex: {
            type: Number,
            default: 0
        },
        subData: {
            type: Object,
            default: () =>{return {}}
        },
        view: {
            type: String,
            default: 'dashboard'
        },
        componentIndex: {
            type: Number,
            default: 0
        },
        formConfig: {
            type: Object,
            default: () =>{return {}}
        }
    },
    data(){
        return {
            updateTime: '',
            displayData: []
        }
    },
    mounted() {
        this.initFunction()
    },
    watch: {
        formConfig: {
            deep: true,
            immediate: false,
            handler: function(newObj, oldObj){
                this.initFunction()
            }
        },
        promise: {
            deep: true,
            immediate: false,
            handler: function(newObj, oldObj){
                if(oldObj){
                    this.initFunction()
                }
            }
        }
    },
    methods: {
        async initFunction() {
            const promisesArray = await this.promise
            if(promisesArray && promisesArray.length > 0){
                const componentDatas = await promisesArray[this.componentIndex]
                if(componentDatas){
                    if(this.view === 'dashboard'){
                        const themeDatas = await componentDatas[this.themeDatasetIndex]
                        this.clearUpData(await themeDatas)
                    }else{
                        componentDatas[this.themeDatasetIndex].then(dataset => {
                            this.clearUpData(dataset)
                        })
                    }
                }
            }else if(typeof promisesArray === 'object'){
                this.clearUpData(promisesArray)
            }
        },
        clearUpData(dataset){
            this.updateTime = (dataset && dataset.updateTime)? dataset.updateTime: this.updateTime
            this.displayData = (dataset && dataset.data)? dataset.data: []
        }
    }
}
</script>

<style scoped lang="scss">
@import "~@/assets/scss/basic.scss";
.keywordContainer{
    min-height:10rem;
    margin-bottom: 1rem;
    .keywordDisplay{
        @extend %spaceAround;
        h2{
            padding: 0 .5rem;
        }
    }
}
</style>
