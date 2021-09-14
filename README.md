# vioc_dashboard

## 1.Project setup
```
yarn install
```
or
```
npm install
```

## 2.Compiles and hot-reloads for development
```
yarn serve
```
or
```
npm run serve
```

## 3.Compiles and minifies for production
```
yarn build
```
or
```
npm run build
```

## 4.Usage Docker compose
### 資料夾結構
|     file           | Description                                               |
| ------------------ | --------------------------------------------------------- |
| default.conf       | nginx的設定，如有Api URL proxy需求                          |
| docker-compose.yml | docker設定                                                 |
| node_modules       | 如果有npm套件下載或更新，覆蓋 node_modules 及 dist 資料夾即可 |
| dist               | 如果僅置換網頁內容，覆蓋 dist 資料夾即可                      |

### 1.Stop containers
but it also removes the stopped containers as well as any networks that were created.
```
docker-compose down 
```

### 2. Create and start containers
--build : build images before starting containers.
-d : Detached mode: Run containers in the background
```
docker-compose up --build -d
```
