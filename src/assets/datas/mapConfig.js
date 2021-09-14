export const buildingsIn3D = {
    id: '3d-buildings',
    source: 'composite',
    'source-layer': 'building',
    // filter: ['==', 'extrude', 'true'],
    type: 'fill-extrusion',
    minzoom: 14,
    paint: {
        // 1. use an 'interpolate' expression to add a smooth transition effect to the buildings as the user zooms in
        // 'fill-extrusion-color': '#aaa',
        // 'fill-extrusion-height': [
        //     'interpolate',
        //     ['linear'],
        //     ['zoom'],
        //     14,
        //     0,
        //     14.05,
        //     ['get', 'height']
        // ],
        // 'fill-extrusion-base': [
        //     'interpolate',
        //     ['linear'],
        //     ['zoom'],
        //     14,
        //     0,
        //     14.05,
        //     ['get', 'min_height']
        // ],
        // 'fill-extrusion-opacity': 0.6

        //2. Fix build
        'fill-extrusion-color': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            '#ff0000',
            '#ddd'
        ],
        'fill-extrusion-height': ["number", ["get", "height"], 5],
        'fill-extrusion-base': ["number", ["get", "min_height"], 0],
        'fill-extrusion-opacity': 0.6
    }
}

export const taipeiBuilding = {
    id: "hessen",
    source: "TaipeiBuild",
    "source-layer": "tp_building_height",
    type: 'fill-extrusion',
    minzoom: 14,
    paint: {
        'fill-extrusion-color': "#171717",
        //1_bud_high = 屋頂高度1_top_high - 出入口高度1_ent_heig
        // 'fill-extrusion-height': ['get', '1_bud_high'],
        'fill-extrusion-height': [
            "interpolate",
            ["linear"],
            ["zoom"],
            0,
            [
              "interpolate",
              ["linear"],
              ["get", "1_top_high"],
              2.2,
              0,
              1044.14,
              1044.14
            ],
            22,
            [
              "interpolate",
              ["linear"],
              ["get", "1_top_high"],
              2.2,
              0,
              1044.14,
              1044.14
            ]
          ]
        ,
        'fill-extrusion-base': ['get', '1_ent_heig'],
        'fill-extrusion-opacity': 0.8
    }
}

export const taipeiTown = {
    id: 'taipei_town',
    source: 'taipei_town',
    type: 'symbol',
    layout: {
        "text-field": [
            "to-string",
            ["get", "TNAME"]
        ],
        "text-size": 13,
    },
    paint: {
        "text-color": "#d5d5d5",
        "text-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            10.99,
            0,
            11,
            1,
            16.49,
            1,
            16.5,
            0
        ]
    }
}

export const taipeiVillage = {
    id: 'taipei_village',
    source: 'taipei_village',
    type: 'symbol',
    layout: {
        "text-field": [
            "to-string",
            ["get", "VNAME"]
        ],
        "text-size": 12,
    },
    paint: {
        "text-color": "#bdbdbd",
        "text-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            16.24,
            0,
            16.25,
            1
        ]
    }
}

export const circleCommonStyle = {
    'circle-radius': [
        "interpolate",
        ["linear"],
        ["zoom"],
        13.99,
        0,
        14,
        1,
        22,
        6
    ]
}

export const circleHeatmapStyle = {
    'circle-radius': [
        "interpolate",
        ["linear"],
        ["zoom"],
        13.99,
        0,
        14,
        1,
        22,
        6      
    ]
}

export const heatmapCommonStyle = {
    'heatmap-opacity': [
        "interpolate",
        ["linear"],
        ["zoom"],
        11,
        0.5,
        13.5,
        0.3
    ],
    'heatmap-intensity': [
        "interpolate",
        ["linear"],
        ["zoom"],
        10.99,
        0,
        11,
        0.04,
        15,
        0.6
    ],
    'heatmap-radius': 10,
    'heatmap-color': [
        "step",
        ["heatmap-density"],
        "hsla(240, 0%, 100%, 0)",
        0.4,
        "hsl(0, 0%, 13%)",
        0.6,
        "hsl(183, 0%, 52%)",
        1,
        "hsl(177, 0%, 96%)"
    ]
}

export const circleBigStyle = {
    'circle-radius': [
        "interpolate",
        ["linear"],
        ["zoom"],
        11.99,
        0,
        12,
        1,
        22,
        8      
    ]
}

export const animateCircleStyle = {
    'circle-radius': 2
}

export const symbolShapeSmallStyle = {
    'icon-size': [
        "interpolate",
        ["linear"],
        ["zoom"],
        11.99,
        0,
        12,
        0.2
    ]
}

export const symbolShapeBigStyle = {
    'icon-size': [
        "interpolate",
        ["linear"],
        ["zoom"],
        11.99,
        0,
        12,
        0.25
    ]
}

export const symbolIconSmallStyle = {
    'icon-size': [
        "interpolate",
        ["linear"],
        ["zoom"],
        13.99,
        0,
        14,
        0.1,
        22,
        0.2
    ] 
}

export const symbolIconMiniStyle = {
    'icon-size': [
        "interpolate",
        ["linear"],
        ["zoom"],
        13.99,
        0,
        14,
        0.05,
        22,
        0.1
    ] 
}

export const symbolIconBigStyle = {
    'icon-size': [
        "interpolate",
        ["linear"],
        ["zoom"],
        13.99,
        0,
        14,
        0.2,
        17,
        0.4
    ],
    'icon-allow-overlap': true,
    "text-field": '○',
    "text-size": [
        "interpolate",
        ["linear"],
        ["zoom"],
        13.99,
        8,
        14,
        25,
        17,
        50
    ]
}

export const symbolHaloStyle = {
    // 'icon-allow-overlap': true,
    'icon-size': 1.1,
    "text-field": '○',
    "text-size": 40,
    // "text-offset": [0, 0]
}

export const lineCommonStyle = {
    'line-width': [
        "interpolate",
        ["linear"],
        ["zoom"],
        15,
        1,
        20,
        1.5
    ]
}

export const lineWideStyle = {
    'line-width': [
        "interpolate",
        ["linear"],
        ["zoom"],
        10.99,
        0,
        11,
        0.5,
        22,
        5
    ]
}
export const lineThinStyle = {
    'line-width': [
        "interpolate",
        ["linear"],
        ["zoom"],
        10.99,
        0,
        11,
        0.1,
        22,
        0.5
    ],
    'line-opacity': [
        "interpolate",
        ["linear"],
        ["zoom"],
        11,
        0.05,
        22,
        1
    ]
}

export const fillCommonStyle = {
    // 'fill-outline-color': [
    //     'case',
    //     ['boolean', ['feature-state', 'hover'], false],
    //     'hsla(0, 0%, 100%, 1)',
    //     'hsla(0, 0%, 100%, 0)'
    // ],
    // 'fill-color': [
    //     "interpolate",
    //     ["linear"],
    //     ["get", "amp_num"],
    //     0,
    //     "hsla(0, 0%, 100%, 0)",
    //     7103,
    //     "hsl(223, 0%, 100%)"
    // ],
    'fill-opacity': [
        "interpolate",
        ["linear"],
        ["zoom"],
        10.99,
        0,
        11,
        ['case',['boolean', ['feature-state', 'hover'], false],0.3,0.2 ],
        18,
        ['case',['boolean', ['feature-state', 'hover'], false],0.4,0.3 ]
    ]
}

/**
 * 
 * @param {*} data 
 * @param {*} input 
 * @param {*} color 
 * @param {*} stopInput 
 * @returns mapbox layer config
 */
export const circleRadiusLayer = (data, input, color, stopInput) => {
    return {
        id: 'circle-radius-layer',
        type: 'circle',
        source: {
            type: 'geojson',
            data: data
        },
        paint: {
            "circle-opacity": 0,
            "circle-stroke-width": 2,
            'circle-stroke-color': color,
            'circle-radius': [
                'interpolate', 
                ['linear'], 
                ['get', input],
                stopInput
            ]
        }
    }
}
