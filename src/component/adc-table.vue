<script type="text/jsx">
    import Vue from 'vue';
    import _ from 'lodash';

    export default {
        name: 'adc-table',
        model: {
            prop: 'selection',
            event: 'change'
        },
        props: {
            data: {
                type: Array,
                default() {
                    return [];
                }
            },
            selection: {
                type: Array,
                default(){
                    return [];
                }
            },
            selectionKey: {
                type: String,
                default: ''
            },
            selectionSave: {
                type: Boolean,
                default: false
            },
            status: {
                type: Boolean,
                default: true
            },
            msg: {
                type: String,
                default: ''
            },
            className: {
                type: [String, Array],
                default: 'table-bordered'
            }
        },
        data() {
            return {
                column: [],
                allChecked: false,
                checked: []
            };
        },
        computed: {
            isSelection() {
                return this.column.filter(col => {
                    return col.type === 'selection';
                }).length > 0;
            }
        },
        created() {
            this.initChecked();
        },
        render(h) {
            let rows,
                tip;

            const colgroups = this.column.map(col => {
                if (col.width !== '') {
                    return <col width={col.width}/>;
                }
                return <col/>;
            });
            const ths = this.column.map((col, index) => {
                if (col.thScopedSlot){
                    return h('th', [col.thScopedSlot({
                        index: index
                    })]);
                    
                }
                if (col.name !== '') {
                    return <th>{col.name}</th>;
                }
            });

            if (!this.status) {
                tip = <tr>
                    <td colspan={this.column.length} class="text-muted text-center">{this.msg || '请求出错'}</td>
                </tr>;
            } else if (this.status && this.msg !== '') {
                tip = <tr>
                    <td colspan={this.column.length} class="text-muted text-center">{this.msg}</td>
                </tr>;
            } else if (this.data.length === 0) {
                tip = <tr>
                    <td colspan={this.column.length} class="text-muted text-center">没有数据</td>
                </tr>;
            } else {
                rows = this.rows(h);
            }
            const allCheckbox = h('input', {
                attrs: {
                    type: 'checkbox'
                },
                domProps: {
                    checked: this.allChecked
                },
                on: {
                    click: this.checkAll
                }
            });
            const className = Array.isArray(this.className) ? ['table'].concat(this.className).join(' ') : `table ${this.className}`;

            return (
                    <div>
                        <div style={{display: 'hidden'}}>
                            {this.$slots.default}
                        </div>
                        <div class="panel panel-default">
                            <table class={className}>
                                <colgroup>{colgroups}</colgroup>
                                <thead>
                                <tr>
                                    {
                                        this.isSelection ? <th>
                                            {allCheckbox}
                                        </th> : ''
                                    }
                                    {ths}
                                </tr>
                                </thead>
                                <tbody>
                                {tip}
                                {rows}
                                </tbody>
                            </table>
                        </div>
                    </div>
            );
        },
        methods: {
            initChecked(){
                const checked = [];

                this.checked = JSON.parse(JSON.stringify(this.selection));
                const allChecked = this.data.length >0 && _.difference(this.data.map(item=>item[this.selectionKey]), this.checked).length === 0 && this.checked.length === this.data.length;

                if (allChecked){
                    this.allChecked = true;
                }
            },
            colIsVisible(col, item, index){
                const visible = [
                    typeof col.visible === 'boolean' && col.visible,
                    typeof col.visible === 'undefined',
                    typeof col.visible === 'function' && col.visible.apply(this.$parent, [item[col.prop], item, index, col.prop])
                ];

                return visible;
            },
            rows(h) {
                return this.data.map((item, index, data) => {
                    const tds = this.column.map(col => {
                        const visible = this.colIsVisible(col, item, index);

                        if (col.defaultSlots){
                            return h('td', col.defaultSlots);
                        } else if (col.tdScopedSlot){
                            return h('td', [col.tdScopedSlot({
                                data: item[col.prop], 
                                item, 
                                index
                            })]);
                        } else if (visible.indexOf(true) > -1) {
                            if (col.vm.name !== '') {
                                const vm = h(col.vm.name, {
                                    props: {
                                        config: col.vm.config,
                                        prop: col.prop,
                                        item,
                                        index,
                                        data
                                    }
                                });

                                return <td>{vm}</td>;
                            } else if (col.type === 'selection') {
                                const checked = this.checked.indexOf(this.data[index][this.selectionKey]) > -1;
                                const checkbox = h('input', {
                                    type: 'checkbox',
                                    attrs: {
                                        type: 'checkbox'
                                    },
                                    domProps: {
                                        checked: checked
                                    },
                                    on: {
                                        click: this.checkOne(index)
                                    }
                                });

                                return <td>{checkbox}</td>;
                            } else {
                                const val = item[col.prop];
                                let result;

                                // mapper
                                if (col.mapper.length > 0 && val !== null && typeof val !== 'undefined' && val !== '') {
                                    const matched = col.mapper.filter(item => {
                                        return item.key === val;
                                    });

                                    if (matched.length > 0) {
                                        result = matched[0].val;
                                    } else {
                                        result = val;
                                    }
                                } else {
                                    result = val;
                                }
                                // filter
                                if (col.filter !== '') {
                                    if (typeof col.filter === 'string') {
                                        result = Vue.filter(col.filter)(result);
                                    } else {
                                        result = col.filter.apply(this.$parent, [result, item, index, col.prop]);
                                    }
                                }
                                if (col.asHtml) {
                                    return h('td', {
                                        domProps: {
                                            innerHTML: result
                                        }
                                    });
                                } else {
                                    let className = '';

                                    if (typeof col.className !== 'undefined') {
                                        if (typeof col.className === 'string') {
                                            className += ' ' + col.className;
                                        } else if (typeof col.className === 'function') {
                                            className += ' ' + col.className.apply(this.$parent, [result, item, index, col.prop]);
                                        } else if (Array.isArray(col.className)) {
                                            let matched = col.className.filter(item => {
                                                return item.text === result;
                                            });
                                            if (matched.length > 0) {
                                                className += ' ' + matched[0].className;
                                            }
                                        }
                                    }
                                    return <td class={className}>{result}</td>;
                                }

                            }
                        } else {
                            return <td></td>;
                        }
                    });

                    return <tr>{tds}</tr>;
                });
            },
            // 供adc-column调用，解析cloumn并设置到this.column
            addCol(col) {
                this.column.push(col);
            },
            updateCol(col) {
                this.column = this.column.map(item => {
                    if (item.prop === col.prop && item.name === col.name) {
                        return col;
                    }
                    return item;
                });
            },
            // 选中/取消选中所有项
            checkAll() {
                this.allChecked = !this.allChecked;
                const checked = [];

                for (let i = 0; i < this.data.length; i++) {
                    checked.push(this.data[i][this.selectionKey]);
                }
                if (this.allChecked) {
                    if (this.selectionSave){
                        this.checked = _.unionWith(this.checked, checked);
                    } else {
                        this.checked = checked;
                    }
                } else {
                    this.checked = _.differenceWith(this.checked, checked);
                }
                this.$emit('check-all', this.allChecked);
                this.$emit('change', this.checked);
            },
            // 选中/取消选中一项
            checkOne(index) {
                return (e) => {
                    var targetKey = this.data[index][this.selectionKey];

                    if (e.target.checked && !this.checked.indexOf(targetKey) > -1) {
                        this.checked.push(targetKey);
                        const allChecked = this.data.length >0 && _.difference(this.data.map(item=>item[this.selectionKey]), this.checked).length === 0 && this.checked.length === this.data.length;
                        
                        this.allChecked = allChecked;
                    } else {
                        this.checked = _.without(this.checked, targetKey);
                        this.allChecked = false;
                    }
                    this.$emit('check', {index: index, key: targetKey, checked: e.target.checked});
                    this.$emit('change', this.checked);
                };
            },
            getChecked() {
                /**
                 * 获取选中的项
                 * @return {Object}
                 * @return {Boolean} {}.checkAll 是否选中了所有
                 * @return {Array} {}.checked 选中项的索引(从0开始)
                 */
                return this.checked;
            }
        },
        watch: {
            selection(){
                this.initChecked();
            },
            data(newVal){
                if (!this.selectionSave){
                    this.checked = _.intersection(this.checked, newVal.map(item=>item[this.selectionKey]));
                    // 触发initChecked来更新allChecked
                    this.initChecked();
                }
            }
        }
    };
</script>
