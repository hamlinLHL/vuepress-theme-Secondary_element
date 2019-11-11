<template>
    <div class="container">
        <div class="friendLink">
            <h1>欢迎交换友链 ꉂ(ˊᗜˋ)</h1>
            <div class="title-method">
                <p>请留言告诉我你的：</p>
                <p>1. 名字</p>
                <p>2. 头像地址</p>
                <p>3. 网页地址</p>
                <p>4. 一句话介绍</p>
            </div>
            <div class="title-method">
                <p>比如：</p>
                <p>名字：<span>{{links[0] && links[0].name}}</span></p>
                <p>头像地址： <span>{{links[0] && links[0].avatar}}</span></p>
                <p>网页地址： <span>{{links[0] && links[0].src}}</span></p>
                <p>一句话介绍： <span>{{links[0] && links[0].introduce}}</span></p>
            </div>
        </div>
        <div class="box">
            <div class="content" v-for="link in links" @click="open(link.src)">
                <img :src=link.avatar alt="">
                <div class="header-right">
                    <div class="name">{{link.name}}</div>
                    <div class="introduce">{{link.introduce}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default  {
        name: 'Friend',
        props: {
            friendLinks: Array
        },
        data() {
            return {
               links: this.friendLinks,
            }
        },
        mounted() {
        },
        methods: {
            open(src) {
                window.open(src)
            }
        }
    }
</script>
<style lang="stylus">
    $back = lightsalmon;
    *{
        list-style: none;
    }
    .container{
        padding: 1rem 8rem
        width: 100%;
        height: 100%;
        cursor: url(http://honglinliu.com/cur/normal.cur), auto;
        .friendLink{
            .title-method{
                margin-top: 30px;
                font-weight: 500;
            }
        }
        .box{
            width: 100%;
            margin-top: 20px;
            cursor pointer
            .content{
                display: flex;
                position: relative;
                justify-content: space-around;
                align-items: center;
                width: 30%;
                float: left;
                padding: 10px;
                margin: 0 15px 15px 0;
                font-size: 14px;
                border: 1px dotted #ccc;
                border-radius: 16px;
                overflow: hidden;
                &:hover{
                    border: 1px dotted $back;
                    & img{
                        transform: rotateZ(360deg);
                    }
                }
                img{
                    width: 65px;
                    height: 65px;
                    padding: 2px;
                    border-radius: 50%;
                    margin-right: 10px;
                    box-shadow: inset 0 0 10px #000;
                    transition: all ease 1s;
                    transform: rotateZ(0deg);
                }
                .header-right{
                    height: 100%;
                    .name{
                        font-size: 18px;
                        color: deepskyblue;
                        padding-bottom: 10px;
                        border-bottom: 1px dotted $back;
                    }
                    .introduce{
                        padding-top: 10px;
                        color: #949494;
                        font-size: 13px;
                    }
                }
            }
            &::after{
                clear: both;
                content: '';
                display: block;
            }
        }
    }
    @media (max-width: $MQMobile)
        .container{
            padding: 1rem !important
        }
        .content
            width: 45% !important;
    @media (max-width: $MQMobileNarrow)
        .container{
            padding: 1rem !important
        }
        .content
            width: 85% !important;
</style>
