<script type="text/ecmascript-6">
    import Vue from 'vue';
    function deepClone(vnodes, createElement) {
        function cloneVNode(vnode) {
            const clonedChildren = vnode.children && vnode.children.map(vnode => cloneVNode(vnode));
            const cloned = createElement(vnode.tag, vnode.data, clonedChildren);
            cloned.text = vnode.text;
            cloned.isComment = vnode.isComment;
            cloned.componentOptions = vnode.componentOptions;
            cloned.elm = vnode.elm;
            cloned.context = vnode.context;
            cloned.ns = vnode.ns;
            cloned.isStatic = vnode.isStatic;
            cloned.key = vnode.key;
            return cloned;
        }

        const clonedVNodes = vnodes.map(vnode => cloneVNode(vnode))
        return clonedVNodes;
    }

    export default{
        name: 'adc-table',
        props: {
            data: {
                type: Array,
                default(){
                    return [];
                }
            },
            initialAllChecked: {
                type: Boolean,
                default: false
            },
            initialChecked: {
                type: Array, // 选中的行的索引,从0开始
                default(){
                    return [];
                }
            },
            loading: {
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
            }
        },
        data(){
            return {
                column: [],
                allChecked: false,
                checked: []
            }
        },
        computed: {
            isSelection(){
                return this.column.filter(col=> {
                            return col.type === 'selection';
                        }).length > 0;
            }
        },
        created(){
            this.allChecked = this.initialAllChecked;
            if (this.allChecked) {
                let checked = [];
                for (let i = 0; i < this.data.length; i++) {
                    checked.push(i);
                }
                this.checked = checked;
            } else {
                this.checked = this.initialChecked;
            }
        },
        render(h){
            let colgroups,
                    ths,
                    rows,
                    allCheckbox,
                    loading,
                    tip;

            colgroups = this.column.map(col=> {
                return <col width={col.width}/>;
            });
            ths = this.column.map(col=> {
                if (col.name !== '') {
                    return <th>{col.name}</th>;
                }
            });
            if (this.loading) {
                loading = <tr>
                    <td colspan={this.column.length}>
                        <div class="loading" style="height:300px;"></div>
                    </td>
                </tr>;
            } else if (!this.status) {
                tip = <tr>
                    <td colspan={this.column.length} class="text-muted text-center">{this.msg || '请求出错'}</td>
                </tr>
            } else if (this.status && this.msg !== '') {
                tip = <tr>
                    <td colspan={this.column.length} class="text-muted text-center">{this.msg}</td>
                </tr>;
            } else if (this.data.length === 0) {
                tip = <tr>
                    <td colspan={this.column.length} class="text-muted text-center">没有数据</td>
                </tr>
            } else {
                rows = this.rows(h);
            }
            allCheckbox = h('input', {
                attrs: {
                    type: 'checkbox'
                },
                domProps: {
                    checked: this.allChecked
                },
                on: {
                    click: this.checkAll
                }
            })
            return (
                    <div>
                        <div style={{display:'hidden'}}>
                            {this.$slots.default}
                        </div>
                        <div class="panel panel-default">
                            <table class="table table-bordered">
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
                                {loading}
                                {tip}
                                {rows}
                                </tbody>
                            </table>
                        </div>
                    </div>
            )
        },
        methods: {
            rows(h){
                return this.data.map((item, index, data)=> {
                    let tds = this.column.map(col=> {
                        let visible = [
                            typeof col.visible === 'boolean' && col.visible,
                            typeof col.visible === 'undefined',
                            typeof col.visible === 'function' && col.visible(item, index, data)
                        ];
                        if (visible.indexOf(true) > -1) {
                            if (col.vm.name !== '') {
                                let vm = h(col.vm.name, {
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
                                let checked = this.checked.indexOf(index) > -1 || this.allChecked;
                                let checkbox = h('input', {
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
                                })
                                return <td>{checkbox}</td>;
                            } else {
                                let val = item[col.prop];
                                let result;
                                // mapper
                                if (col.mapper.length > 0 && val !== null && typeof val !== 'undefined' && val !== '') {
                                    let matched = col.mapper.filter(item=> {
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
                                        result = col.filter(result,item);
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
                                    if (col.color.length > 0) {
                                        let matched = col.color.filter(item=> {
                                            return item.text === result;
                                        });
                                        if (matched.length > 0) {
                                            className = 'text-' + matched[0].color;
                                        }
                                    }
                                    if (typeof col.className !== 'undefined') {
                                        if (typeof col.className === 'string') {
                                            className += ' ' + col.className;
                                        } else if (typeof col.className === 'function') {
                                            className += ' ' + col.className(result);
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
            addCol(col){
                this.column.push(col);
            },
            updateCol(col){
                this.column = this.column.map(item=> {
                    if (item.prop === col.prop && item.name === col.name) {
                        return col;
                    } else {
                        return item;
                    }
                });
            },
            // 选中/取消选中所有项
            checkAll(e){
                this.allChecked = !this.allChecked;
                if (this.allChecked) {
                    let checked = [];
                    for (let i = 0; i < this.data.length; i++) {
                        checked.push(i);
                    }
                    this.checked = checked;
                } else {
                    this.checked = [];
                }
            },
            // 选中/取消选中一项
            checkOne(index){
                return (e)=> {
                    if (e.target.checked && !this.checked.indexOf(index) > -1) {
                        this.checked.push(index);
                        this.allChecked = this.checked.length === this.data.length;
                    } else {
                        this.checked = this.checked.filter(item=> {
                            return item !== index;
                        })
                        this.allChecked = false;
                    }
                }
            },
            getChecked(){
                /**
                 * 获取选中的项
                 * @return {Object}
                 * @return {Boolean} {}.allChecked 是否选中了所有
                 * @return {Array} {}.checked 选中项的索引(从0开始)
                 */
                if (this.allChecked) {
                    return {
                        allChecked: true
                    }
                } else {
                    return {
                        allChecked: false,
                        checked: this.checked
                    }
                }
            }
        },
        beforeDestroy(){
            console.log('beforeDestroy');
        }
    }
</script>
