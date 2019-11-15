##  仿b站风格的一套vuepress主题， 基于默认主题修改， 食べにようこそ(版本号：1.0.4)

##  增加了分类， 标签， 友链， 时间线， 分页等功能

##  使用方法
    1. npm install vuepress-theme-secondary_element --save
    2. 在config.js中添加字段 theme:  vuepress-theme-secondary_element
    3. 添加themeConfig:{}字段
    
## 以下配置都在themeConfig里面
###  添加首页背景图片
     在docs下添加README.md
     ---
     home: true
     search: true
     bgImage: './xxx.jpg'
     bgImageStyle: {
           
     }
     ---
     home是开启主页，search是开启搜索功能， bgImage 是主页的背景图片路径
     图片路径：
        1. 如果填相对路径， 把xxx.jpg资源放在docs/.vuepress/public目录下，
        2. 或者直接填绝对路径 ： http:// xxxxx/xx.png
     bgImageStyle自定义主页背景图片样式
### 添加头像
    首先在config.js里的themeConfig里添加以下字段：
    avatar: './xxx.jpg',
    图片路径：
            1. 如果填相对路径， 把xxx.jpg资源放在docs/.vuepress/public目录下，
            2. 或者直接填绝对路径 ： http:// xxxxx/xx.png
### 添加分类功能
    首先在config.js里的themeConfig里添加以下字段：
    categories: {
                text: '分类',
                index: 2,
                icon: 'hamlin-categories'
            },
    text是显示的文字， index是显示在导航栏的第几个， icon是文字前的图标的类名
    然后在docs文件夹下新建categories文件夹， 文件夹下新建README.md文件
    README.md里的内容：
     ---
     isCategories: true
     sidebar: false
     isComment: false
     ---    
### 可选图标类名
    hamlin-categories 分类
    hamlin-friendLink 友链
    hamlin-bili bilibili电视
    hamlin-home 房子
    hamlin-comment 对话框
    hamlin-eye 眼睛
    hamlin-tag 标签
    hamlin-date 日历
    hamlin-person 人头
    hamlin-rocket 火箭
    hamlin-time 时间沙漏
    如需其它图标请微信/邮箱告诉我
### 添加标签功能
    首先在config.js里的themeConfig里添加以下字段：
    tags: {
               text: '标签',
                index: 3,
               icon: 'hamlin-tag'
            },
    text是显示的文字， index是显示在导航栏的第几个， icon是文字前的图标的类名
    然后在docs文件夹下新建tags文件夹， 文件夹下新建README.md文件
    README.md里的内容：
     ---
     isTags: true
     sidebar: false
     isComment: false
     ---
### 添加时间线功能
    首先在config.js里的themeConfig里添加以下字段：
    timeLine: {
                text: '时间线',
                index: 5,
                icon: 'hamlin-date'
            },
    text是显示的文字， index是显示在导航栏的第几个， icon是文字前的图标的类名
    然后在docs文件夹下新建timeLine文件夹， 文件夹下新建README.md文件
    README.md里的内容：
    ---
    isTimeLine: true
    sidebar: false
    isComment: false
    ---
### 添加友链功能
    首先在config.js里的themeConfig里添加以下字段：
    friendLink: {
                text: '友链',
                index: 10,
                data: [{
                    name: 'xxx', // 名字
                    introduce: 'xxxxx', // 一句话简介
                    avatar: 'http://xxxx.jpg', // 头像
                    src: 'http://xxxx' // 博客链接
                }],
                icon: 'hamlin-friendLink'
            },
    text是显示的文字， index是显示在导航栏的第几个， icon是文字前的图标的类名，data是友链的数据
    然后在docs文件夹下新建friendLink文件夹， 文件夹下新建README.md文件
    README.md里的内容：
    ---
    isFriendLink: true
    sidebar: false
    --- 
### 添加评论功能
    首先在config.js里的themeConfig里添加以下字段：
    valineConfig: {
                appId: '你的id',// your appId
                appKey: '你的密钥', // your appKey
                notify:true,
                verify:true,
                avatar:'identicon',
                placeholder: '填写邮箱可以收到回复提醒哦',
                visitor: true,  // 阅读量统计,
                recordIP: true
            },
### 要开启评论功能请参考[这里](https://valine.js.org/quickstart.html)

### 可以的话赏颗star吧

### 联系方式 
    微信：qq110035 加我口令：愿你出走半生，归来仍是少年
    qq邮箱： 1780597343@qq.com 
