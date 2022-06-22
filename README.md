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
    VUE_APP_BASE_URL=/dashboard_demo
    VUE_APP_DOMAIN_RUL=https://ingridkao.github.io/dashboard_demo/
    VUE_APP_GOOGLE_ANALYTICS=G-XXXXXXXXX
    VUE_APP_MAPBOXTOKEN=pk.?????????

    ```

## 3. Deploy
1. 編輯deploy.sh
 - Line.13 ： commit msg
 - Line.16 ： 相關字串確認
2. 於專案目錄執行`sh deploy.sh`

### 資料夾結構
| file  | Description            |
| ----- | ---------------------- |
| dist  | 部署僅dist 資料夾即可     |
