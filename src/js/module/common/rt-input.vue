<template>
    <input type="text" class="form-control" @blur="save"/>
</template>
<script type="es6">
    export default {
        name: 'rt-input',
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
            }
        },
        data() {
            return {
                input: ''
            }
        },
        methods: {
            save() {
                console.log(this.item, this.prop, this.data);
                console.log('save');
            }
        }
    };
</script>
