<template>
    <main>
        <div class="back" @click="toTop">

        </div>
        <button class="back-btn" @click="toTop"><i class="iconfont hamlin-rocket"></i></button>
    </main>
</template>

<script>
    import {isMobie} from '../util'
    export default {
        name: "BackToTop",
        data() {
            return {
                scrollTop: 0,
                back: null,
                back_btn: null,
                speed: 30,
                speedInterval: null
            }
        },
        mounted() {
            window.addEventListener('scroll', () => {
                this.handleScroll();
            });
            this.back =  document.querySelector('.back');
            this.back_btn = document.querySelector('.back-btn');
        },
        destroyed() {
            window.removeEventListener('scroll', () => {
                this.handleScroll();
            })
        },
        computed: {

        },
        methods: {
            isMobie,
            handleScroll() {
                this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop; // 滚动条偏移量
                if (this.scrollTop <= 0) {
                    this.back.style.top = '-80rem';
                    this.back_btn.style.bottom = '-4rem';
                    this.back_btn.style.opacity = '0'
                } else{
                    this.back.style.top = this.isMobie() ? '-30rem':'-20rem';
                    this.back_btn.style.bottom = '1rem';
                    this.back_btn.style.opacity = '1'
                }
            },
            toTop() {
                this.speed = 30;
                clearInterval(this.speedInterval);
                this.speedInterval = setInterval(() => {
                    this.scrollTop -= this.speed;
                    this.speed += 5;
                    if (this.scrollTop > 0) {
                        window.scrollTo(0,this.scrollTop) ;
                    } else {
                        this.scrollTop = 0;
                        window.scrollTo(0,this.scrollTop) ;
                        clearInterval(this.speedInterval);
                    }
                }, 20);
            }
        }
    }
</script>

<style scoped lang="stylus">
    .back
        position fixed;
        top -80rem
        right -1rem;
        z-index 99;
        width 4rem;
        height 70rem;
        background url(https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/scroll.png) no-repeat center;
        cursor pointer;
        background-size contain;
        -webkit-transition all .5s ease-in-out;
        transition all .5s ease-in-out;
    .back-btn
        position fixed;
        bottom -4rem;
        right 1rem;
        z-index 99;
        border 0;
        outline 0;
        opacity 0;
        background-color rgba(255,255,255,.4);
        transition all .5s ease-in-out;
        border-radius 50%
        cursor pointer
</style>
