#!/usr/bin/env sh
# 當發生錯誤時終止腳本運行
set -e

npm run build

# 移動至到打包後的dist目錄
cd dist

# 因為dist資料夾預設是被ignore的，因此在進入dist資料夾後初始化git
git init
git add -A
git commit -m 'Deploy v0.2.0_20220622: 新增noGeoserver branch，此版本可以離線Demo'

# 將 dist資料夾中的內容推送至遠端 taxi_effective main分支中，並強制無條件將舊有的內容取代成目前的內容（指令 git push -f)
git push -f https://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@github.com/ingridkao/dashboard_demo.git master:github-pages
cd -
~