# vioc_dashboard_demo

## 1.Project setup
For dependency warning for @mapbox/mapbox-gl-traffic
```
npm install --force
```



## 2. .env
1. 新增.env
    `vi .env`
2. 編輯.env
    ```
    VUE_APP_I18N_LOCALE=zh-TW
    VUE_APP_I18N_FALLBACK_LOCALE=zh-TW

    VUE_APP_MAPBOXTOKEN=pk.?????????

    ```


### 資料夾結構
|     file           | Description                                               |
| ------------------ | --------------------------------------------------------- |
| node_modules       | 如果有npm套件下載或更新，覆蓋 node_modules 及 dist 資料夾即可 |
| dist               | 如果僅置換網頁內容，覆蓋 dist 資料夾即可                      |
