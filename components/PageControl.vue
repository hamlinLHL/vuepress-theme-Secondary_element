<template>
    <div class="pageControl" v-if="total > perPage">
        <div class="leftPages">
            <button class="pre page-btn" @click="$emit('pageChange',getPre())">上一页</button>
            <button class="front page-btn" v-for="a in frontArr" :class="{active: a === currentPage}" @click="$emit('pageChange',a)">
                {{a}}
            </button>
            <span class="page-btn" v-if="showFront > maxFront">...</span>
            <button class="end page-btn" v-if="showFront > maxFront">{{this.totalPage}}</button>
            <button class="next page-btn" @click="$emit('pageChange',getNext())">下一页</button>
        </div>
        <div class="jumpPages">
            <span class="small">跳至</span>
            <input type="number" :max="Math.ceil(total/perPage)" min="0" v-model="inputValue" @keypress.enter="goTo">
            <span class="small">页</span>
            <button class="go page-btn" @click="goTo">GO</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PageControl",
        data() {
            return {
                showEnd: 1,
                maxFront: 4,
                inputValue: 1
            }
        },
        props: {
            total: Number,
            perPage: Number,
            currentPage: Number,
        },
        computed: {
            totalPage() {
                return Math.ceil(this.total/this.perPage);
            },
            frontArr() {
                const arr = [];
                for (let i = 0; i < this.showFront; i ++) {
                    arr.push(i + 1);
                }
                return arr;
            },
            showFront() {
                return this.totalPage > this.perPage ? this.maxFront : this.totalPage;
            },
        },
        methods: {
            getPre() {
                return this.currentPage - 1 > 0 ? this.currentPage -1 : 1;
            },
            getNext() {
                return this.currentPage + 1 < this.totalPage ? this.currentPage + 1 : this.totalPage;
            },
            goTo() {
                if (this.inputValue < 1 || this.inputValue > this.totalPage) {
                    alert(`请输入1 到 ${this.totalPage}的整数`)
                } else {
                    this.$emit('pageChange', +this.inputValue)
                }
            }
        },
        mounted() {
        }
    }
</script>

<style scoped lang="stylus">
    .pageControl
        display flex
        justify-content space-between
        width 100%
        .leftPages,.jumpPages
            display flex
            justify-content center
            align-items center
            input
                border 1px solid #ddd
                border-radius 0.4rem
                outline none
                padding 0.4rem
                &::-webkit-inner-spin-button,&::-webkit-outer-spin-button
                    -webkit-appearance none
            .page-btn
                margin-right 1rem;
                outline none
                text-align center
                color #222
                background-color #fff
                border 1px solid #ddd
                border-radius 0.25rem
                cursor pointer
                padding 0.4rem
                &.active,&:hover
                    background-color #00a1d6
                    border-color  #00a1d6
                    color #fff
            .small
                font-size: 0.8rem
                color #bbb
                padding 0 0.4rem

</style>
