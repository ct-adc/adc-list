<template>
    <img :width="config.width"
         :height="config.height"
         :src="item[prop]" />
</template>
<script type="es6">
export default {
    props: {
        prop: {
            type: String,
            default: ''
        },
        item: {
            type: Object,
            default() {
                return {};
            }
        },
        index: {
            type: Number,
            default() {
                return -1;
            }
        },
        data: {
            type: Array,
            default() {
                return [];
            }
        },
        config: {
            type: Object,
            default() {
                return {
                    width: 100,
                    height: 100
                };
            }
        }
    }
};
</script>
