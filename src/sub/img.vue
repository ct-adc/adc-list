<template>
    <div class="imgWrap">
        <img :src="imgSrc" :alt="imgAlt" @mouseenter="show" :width="width" :height="height" @mouseleave="hide"/>
        <img :src="imgSrc" :alt="imgAlt" class="originImg" ref="originImg"
             :style="originImgStyle"/>
    </div>
</template>

<script type="es6">
    export default{
        props: {
            imgSrc: {
                type: String,
                default: ''
            },
            imgAlt: {
                type: String,
                default: ''
            },
            width: {
                type: Number,
                default: 100
            },
            height: {
                type: Number,
                default: 100
            }
        },
        data(){
            return {
                originImgStatus: false
            }
        },
        computed: {
            originImgStyle(){
                var style={
                    top: this.height*0.95+'px',
                    left: this.width*0.95+'px'
                };
                if(this.originImgStatus){
                    style.display='block';
                }else{
                    style.display='none';
                }
                return style;
            }
        },
        methods: {
            show(){
                this.originImgStatus = true;
            },
            hide(){
                this.originImgStatus = false;
            }
        }
    }
</script>
<style scoped>
    .imgWrap{
        position:relative;
        cursor:pointer;
    }
    .originImg {
        position: absolute;
        z-index:99;
    }
</style>