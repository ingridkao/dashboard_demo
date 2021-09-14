import axios from 'axios'
import mapboxgl from "mapbox-gl";

export const getClickedInfo = (url, parameters) => {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: {
                VERSION: '1.1.1',
                REQUEST: 'GetFeatureInfo',
                INFO_FORMAT: 'application/json',
                SRS: 'EPSG:4326',
                SERVICE: 'WMS',
                WIDTH:101,
                HEIGHT:101,
                X:50,
                Y:50,
                exceptions: 'application/vnd.ogc.se_inimage',
                // FEATURE_COUNT: 50
                ...parameters
            }
        })
        .then((response) => {
            if(response.data && typeof response.data.features === 'object'){
                resolve(response.data.features)
            }else{
                resolve(null)
            }
        })
        .catch((error) => {
            reject(error) 
        })
    })

}

/**
 * Bounds
 * An array containing the longitude and latitude of the southwest and northeast corners of the source's bounding box in the following order: [sw.lng, sw.lat, ne.lng, ne.lat]
 */
export const lngLatConvertedBBox = ({lng, lat}, radius) => {
    const lngLat = new mapboxgl.LngLat(lng, lat);
    if(radius){
        return lngLat.toBounds(radius).toArray()
    }else{
        return lngLat.toBounds(30).toArray()
    }
}