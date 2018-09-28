<template>
    <div>
        <button type="button"
                class="btn btn-sm btn-primary"
                @click="edit">
            <span class="glyphicon glyphicon-edit"></span>
            编辑
        </button>
        <button type="button"
                class="btn btn-sm btn-success">
            <span class="glyphicon glyphicon-eye-open"></span>
            查看
        </button>
    </div>
</template>

<script type="es6">
export default {
    name: 'buttons',
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
    methods: {
        edit() {
            console.log(this.item, this.index, this.data);
        }
    }
};
</script>
