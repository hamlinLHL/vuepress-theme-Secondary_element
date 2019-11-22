<template>
    <main>
        <ul class="timeline" @mouseover="mouseEnter($event)" @mouseout="mouseLeave($event)">
            <h3  class="lineItems year" >{{now}}</h3>
            <li v-for="item in timeLines" :key="item.title" class="timeGroup">
                    <h3 class="lineItems year">{{item.title}}</h3>
                    <ul>
                        <li v-for="t in item.arr" class="lineItems" >
                            <router-link :to="t.path">
                                {{t.date}}
                                <span>{{t.title}}</span>
                            </router-link>
                        </li>
                    </ul>
            </li>
        </ul>
    </main>
</template>

<script>
    export default {
        name: "TimeLine",
        data() {
            return {
                now: '人间值得，未来可期',
                circles: null,
                color: '#cccaaa',
                colorInterval: null,
                time: 500,
            }
        },
        computed: {
            pages() {
                return this.$site.pages.filter(page => page.frontmatter.date !== undefined).map(page => {
                        const date = page.frontmatter.date, title = page.frontmatter.title, path =  page.path;
                        return {
                            date,
                            title,
                            path
                        }
                })
            },
            timeLines() {
                const data = [];
                this.pages.map(page => {
                    const year = new Date(page.date).getFullYear();
                    let exist = false, i = -1;
                    data.forEach((d, index) => {
                        if (d.title && d.title === year) {
                            exist = true;
                            i = index;
                        }
                    });
                    if (exist) {
                        data[i].arr.push({
                            title: page.title,
                            path: page.path,
                            date: new Date(page.date).getMonth() +  '-' + new Date(page.date).getDay()
                        });
                    }else {
                        data.push({
                            title: year,
                            arr: [{
                                title: page.title,
                                path: page.path,
                                date: new Date(page.date).getMonth() +  '-' + new Date(page.date).getDay()
                            }]
                        })
                    }
                });
                data.forEach(d => {
                    d.arr.sort((a, b) => {
                        return new Date(b.date).getTime() - new Date(a.date).getTime()
                    })
                });
                return data;
            }
        },
        methods: {
            changeColor() {
                let index = 0;
                this.clearColorInterval();
                this.colorInterval = setInterval(() => {
                    this.clearActive();
                    this.circles[index].classList.add('active');
                    if (index >= this.circles.length - 1) {
                        index = 0
                    } else {
                        index += 1;
                    }
                },this.time)
            },
            clearColorInterval() {
                if (this.colorInterval) {
                    clearInterval(this.colorInterval);
                }
            },
            clearActive() {
                [...this.circles].map(circle => {
                    circle.classList.remove('active');
                });
            },
            mouseEnter(e) {
                const target = e.target;
                if (target.classList.contains('lineItems') && !target.classList.contains('year')) {
                    this.clearColorInterval();
                    this.clearActive();
                    target.classList.add('active');
                }
            },
            mouseLeave(e) {
                const target = e.target;
                if (target.classList.contains('lineItems') && !target.classList.contains('year')) {
                    this.changeColor();
                }
            }
        },
        mounted() {
            this.circles = document.querySelectorAll('.lineItems');
            this.changeColor()
        },
        destroyed() {
            this.clearColorInterval();
        }
    }
</script>

<style scoped lang="stylus">
    $lineWidth = 0.6rem
    ul
        li
            list-style: none;
    .timeline
        position relative
        margin -2rem auto
        padding-left 2rem
        margin-bottom 2rem
        &::after
            content ''
            position absolute
            width 0.2rem
            height 100%
            top $lineWidth + 0.1rem
            left $lineWidth - 0.2rem
            background-color #f2d3de
        .lineItems
            position relative
            cursor pointer
            a
                display inline-block
                width 100%
                height 100%
                color #222
            &:hover
                &:not(.year)
                    a
                        color #f45a8d
            &:not(.year)
                padding 1rem 0
                border-bottom 0.05rem dashed #ffafc9
            &::before
                content ''
                position absolute
                width $lineWidth
                height $lineWidth
                left -3rem
                top $lineWidth + 1.1rem
                border-radius 50%
                background-color #fbc4d7
                z-index 99
        .lineItems.active
            &::before
                background-color #e95789
        .year
            &::before
                top $lineWidth + 0.1rem
                left -1.8rem
</style>
