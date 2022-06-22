<template>
    <div id="zoominBtnBox">
        <div v-if="canUsefreeCamera">
            <el-button size="mini" class="dark" @click="useFreeCamera">鳥瞰台北</el-button>
            <el-button size="mini" class="dark" @click="mapEaseTo()">預設</el-button>
            <el-button size="mini" class="dark" @click="zoominCityHall">台北市政府</el-button>
            <el-button size="mini" class="dark" @click="zoominDadaocheng">大稻埕</el-button>
        </div>
        <div v-else>
            <el-button size="mini" class="dark" @click="stopFreeCamera">停止鳥瞰</el-button>
        </div>
    </div>
</template>
<script>
import mapboxgl from 'mapbox-gl'
import { Positions } from '@/assets/datas/mapType.js'
export default {
    props: {
        canUsefreeCamera: { 
            type: Boolean,
            default: false
        },
        mapboxObject: { 
            type: Object,
            default: () => {}
        },
        mapboxPopup: { 
            type: Object || null
        }
    },
    data(){
        return {
            myCameraFrame: null,
        }
    },
    destroyed() {
        this.stopFreeCamera()
    },
    methods: {
        stopFreeCamera(){
            if(!this.myCameraFrame) return
            const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame
            cancelAnimationFrame(this.myCameraFrame)
            this.$emit('update:canUsefreeCamera', true)
        },
        useFreeCamera(){
            if(!this.canUsefreeCamera) return
            this.$emit('update:canUsefreeCamera', false)
            if(this.mapboxPopup)this.mapboxPopup.remove()
            const updateCameraPosition = (position, altitude, target) => {
                const camera = this.mapboxObject.getFreeCameraOptions()
                camera.position = mapboxgl.MercatorCoordinate.fromLngLat( position, altitude )
                camera.lookAtPoint(target)
                this.mapboxObject.setFreeCameraOptions(camera)
            }
            const durationSec = 150000
            const lerp = (a, b, t) => {
                if (Array.isArray(a) && Array.isArray(b)) {
                    const result = []
                    for (let i = 0; i < Math.min(a.length, b.length); i++){
                        result[i] = a[i] * (1.0 - t) + b[i] * t
                    }
                    return result
                } else {
                    return a * (1.0 - t) + b * t
                }
            }
            const animations = [{
                duration: durationSec,
                animate: (phase) => {
                    // interpolate camera position while keeping focus on a target lat/lng
                    const position = lerp(Positions.s, Positions.w, phase)
                    const altitude = lerp(0, 700.0, phase)
                    updateCameraPosition(position, altitude, Positions.center)
                }
            },
            {
                duration: durationSec,
                animate: (phase) => {            
                    const position = lerp(Positions.w, Positions.n, phase)
                    updateCameraPosition(position, 700, Positions.center)
                }
            },
            {
                duration: durationSec,
                animate: (phase) => {
                    const position = lerp(Positions.n, Positions.e, phase)
                    updateCameraPosition(position, 700, Positions.center)
                }
            },
            {
                duration: durationSec,
                animate: (phase) => {
                    const position = lerp(Positions.e, Positions.s, phase)
                    updateCameraPosition(position, 700, Positions.center)
                }
            }]
            let animationIndex = 0
            let animationTime = 0.0
            const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
            let lastTime = 0.0
            const frame = (time) => {
                animationIndex %= animations.length;
                const current = animations[animationIndex];
                if (animationTime < current.duration) {
                    // Normalize the duration between 0 and 1 to interpolate the animation
                    const phase = animationTime / current.duration;
                    current.animate(phase);
                }
                // Elasped time since last frame, in milliseconds
                const elapsed = time - lastTime
                animationTime += elapsed
                lastTime = time
                if (animationTime > current.duration) {
                    animationIndex++;
                    animationTime = 0.0;
                }          
                const ee = requestAnimationFrame(frame)
                this.myCameraFrame = ee
            }
            requestAnimationFrame(frame)
        },
        mapEaseTo(center, zoom, duration, pitch, bearing){
            if(!(this.mapboxObject))return
            this.mapboxObject.easeTo({
                center: center? center: Positions.center,
                zoom: zoom? zoom: 12.5,
                duration: duration? duration: 6000,
                pitch: pitch? pitch: 0,
                bearing: bearing?bearing: 0
            })      
        },
        zoominCityHall(){
            this.mapEaseTo(Positions.CityHall, 15.5, 12000, 70, 40)
        },
        zoominDadaocheng(){
            this.mapEaseTo(Positions.Dadaocheng, 16, 12000, 60, 50)
        }
    }
}
</script>
<style lang="scss">
#zoominBtnBox{
    padding-top: 0.25rem;
}
</style>