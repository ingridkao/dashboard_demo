<template>
    <div id="noDataMsgBox">
        <div>
            <i class="el-icon-warning-outline"/> 
            <p>{{message}}</p>
        </div>  
    </div>
</template>
<script>
export default {
    props: {
        message: {
            type: String,
            default: ''
        }
    }
}
</script>
<style lang="scss">
    #noDataMsgBox{
        display: flex;
        justify-content: center;
        align-items: center; 
        >div{
            text-align: center;
            i{
                font-size: 2rem;
                margin-bottom: 0.5rem;
            }
        }
    }
</style>