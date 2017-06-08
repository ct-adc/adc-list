<script type="es6">
    export default{
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
                default: 0
            },
            vm: { // 插入的自定义组件名称
                type: Object,
                default() {
                    return {
                        name:'',
                        config:{}
                    }
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
                default(){
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
            }
        },
        computed: {
            column(){
                var column= {
                    type: this.type,
                    prop: this.prop,
                    name: this.name,
                    width: this.width * 1,
                    vm: this.vm,
                    visible: this.visible,
                    filter: this.filter,
                    mapper: this.mapper,
                    asHtml: this.asHtml
                };
                return column;
            }
        },
        render(h){
            return h('div');
        },
        created(){
            this.addCol();
        },
        methods: {
            addCol(){
                this.$parent.addCol(this.column);
            }
        },
        watch:{
            column(){
                this.addCol();
            }
        }
    }
</script>