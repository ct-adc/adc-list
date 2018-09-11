<script>
    export default {
        name: 'adc-table-column',
        props: {
            prop: { // 对应的字段名
                type: String,
                default: ''
            },
            name: { // 表头显示
                type: String,
                default: ''
            },
            width: { // 列宽
                type: [Number, String],
                default: ''
            },
            vm: { // 插入的自定义组件名称
                type: Object,
                default() {
                    return {
                        name: '',
                        config: {}
                    };
                }
            },
            type: { // 除了内容，还可以是别的类型，如复选框('selection')
                type: String,
                default: ''
            },
            visible: { // 是否显示 某一行中的该列是否显示；因为有些情况下，根据该列数据的情况或者其他的外部原因，决定是否被显示
                type: [Boolean, Function],
                default: true
            },
            mapper: { // 数据映射
                type: Array,
                default() {
                    return [];
                }
            },
            filter: { // 数据过滤器(处理器，类似Vue的filter)，用于改变数据的最终显示内容
                type: [String, Function],
                default: ''
            },
            asHtml: { // 将数据渲染为html
                type: Boolean,
                default: false
            },
            color: {
                type: Array,
                default() {
                    return [];
                }
            },
            className: {
                type: [String, Function, Array],
                default: ''
            }
        },
        data(){
            return {
                defaultSlots: this.$slots.default,
                tdScopedSlot: this.$scopedSlots.default,
                thScopedSlot: this.$slots.th
            };
        },
        computed: {
            column() {
                return {
                    type: this.type,
                    prop: this.prop,
                    name: this.name,
                    width: this.width,
                    vm: this.vm,
                    visible: this.visible,
                    filter: this.filter,
                    mapper: this.mapper,
                    asHtml: this.asHtml,
                    color: this.color,
                    className: this.className
                };
            }
        },
        render(h) {
            this.tdScopedSlot = this.$scopedSlots.default;
            this.defaultSlots = this.$slots.default;
            this.thScopedSlot = this.$scopedSlots.th;
            return h('div');
        },
        created() {
            this.addCol();
        },
        methods: {
            addCol() {
                if (typeof this.$parent.addCol === 'function'){
                    this.$parent.addCol(Object.assign({}, this.column, {
                        tdScopedSlot: this.tdScopedSlot,
                        defaultSlots: this.defaultSlots
                    }));
                }
            },
            updateCol() {
                if (typeof this.$parent.addCol === 'function'){
                    this.$parent.updateCol(Object.assign({}, this.column, {
                        tdScopedSlot: this.tdScopedSlot,
                        defaultSlots: this.defaultSlots,
                        thScopedSlot: this.thScopedSlot
                    }));
                }
            }
        },
        watch: {
            column() {
                this.updateCol();
            },
            defaultSlots(){
                this.updateCol();
            },
            tdScopedSlot(){
                this.updateCol();
            },
            thScopedSlot(){
                this.updateCol();
            }
        }
    };
</script>
