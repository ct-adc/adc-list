<template>
    <table class="table table-striped table-bordered">
        <colgroup v-if="colgroup.length===0">
            <col v-for="col in theads"/>
            <col v-if="operations.length>0" width="200px"/>
        </colgroup>
        <colgroup v-else>
            <col v-for="col in colgroup" :width="col" track-by="$index"/>
        </colgroup>
        <thead>
        <tr>
            <th v-for="thead in theads" :class="thead.className || ''">{{thead.name}}</th>
            <th v-if="operations.length>0">操作</th>
        </tr>
        </thead>
        <tbody>
        <template v-if="loading">
            <tr>
                <td :colspan="colspan">
                    <div class="loading" style="height:300px"></div>
                </td>
            </tr>
        </template>
        <template v-else-if="!responseStatus">
            <tr>
                <td :colspan="colspan" class="text-center">请求出错!</td>
            </tr>
        </template>
        <template v-else>
            <tr v-if="data.length===0">
                <td :colspan="colspan" class="text-center">没有信息!</td>
            </tr>
            <tr v-for="(item,index) in data">
                <td v-for="thead in theads">
                    <!--config是一个自定义函数 接收参数为:该处的原始value值/该项数据/该项数据在原数组中的索引-->
                    <span v-if="typeof config[thead.key]==='function'"
                          v-html="config[thead.key](item[thead.key],item,index)">
                    </span>
                    <!--config是一个对象，其中定义了某个值应该被显示出来的真正内容-->
                    <span v-else-if="renderByConfigItem(item,thead.key)"
                          :class="configItemClassName(item,thead.key)">
                        {{configItemContent(item,thead.key)}}
                    </span>
                    <!--td的显示内容需要使用公用的filter-->
                    <template v-else-if="renderByFilter(thead.key,thead.filter)">
                        {{item[thead.key] | privateFilter(thead.filter,index)}}
                    </template>

                    <template v-else-if="typeof thead.component!=='undefined' && thead.component.name==='img'">
                        <template v-if="typeof thead.component.props!=='undefined'">
                            <td-img :img-src="item[thead.key]" :width="thead.component.props.width"
                                    :height="thead.component.props.height"></td-img>
                        </template>
                        <template v-else>
                            <td-img :img-src="item[thead.key]"></td-img>
                        </template>
                    </template>

                    <!--常规显示-->
                    <template v-else>
                        {{item[thead.key]}}
                    </template>
                </td>

                <template v-for="operation in operations">
                    <td>
                        <a v-if="(typeof operation.displayFilter==='function' && operation.displayFilter(JSON.parse(JSON.stringify(item)))) || typeof operation.displayFilter==='undefined'"
                           class="btn btn-xs"
                           style="margin-right:5px"
                           :href="operation.link"
                           :target="operation.linkToNew ? '_blank' : ''"
                           :class="operation.className"
                           @click="typeof operation.action==='function' ? operation.action(JSON.parse(JSON.stringify(item))) : new Function()">
                            <span v-if="operation.icon!==''" class="glyphicon"
                                  :class="'glyphicon-'+operation.icon"></span>
                            {{operation.text}}
                        </a>
                    </td>
                </template>

            </tr>
        </template>

        </tbody>
    </table>
</template>

<script type="es6">
    import Vue from 'vue';
    import Img from './sub/img.vue';
    export default{
        name: 'list',
        components: {
            'td-img': Img
        },
        props: {
            loading: {
                //表格的加载状态
                type: Boolean,
                default: false
            },
            responseStatus: {
                //表格的信息响应状态
                type: Boolean,
                default: true
            },
            colgroup: {
                //表格的colgroup分布规则
                type: Array,
                default(){
                    return [];
                }
            },
            operations: {
                //表格中的操作列
                type: Array,
                default(){
                    return [];
                }
            },
            config: {
                //表格的数据渲染配置
                type: Object,
                default(){
                    return {};
                }
            },
            theads: {
                //表格的表头
                type: Array,
                default(){
                    return []
                }
            },
            data: {
                //表格数据
                type: Array,
                default(){
                    return [];
                }
            }
        },
        filters: {
            /**
             * 在组件内部注册私有过滤器，用于处理该组件中需要处理后才能显示的内容
             * @param {*} value 需要解析的内容
             * @param {string} filter 用于解析数据的公共过滤器名称
             * @param {number} index 该条数据在数组中的索引
             * @returns {*} 处理后的内容
             */
                    privateFilter(value, filter, index){
                if (typeof Vue.filter(filter) === 'function') {
                    return Vue.filter(filter)(value, index);
                } else {
                    return value;
                }
            }
        },
        computed: {
            colspan(){
                return this.operations.length > 0 ? this.theads.length + 1 : this.theads.length;
            }
        },
        methods: {
            renderByConfigItem(item, key){
                return typeof this.config[key] === 'object' && item[key] !== '' && item[key] != null;
            },
            configItemClassName(item, key){
                return typeof this.config[key][item[key]] != 'undefined' ? this.config[key][item[key]].className : '';
            },
            configItemContent(item, key){
                return typeof this.config[key][item[key]] !== 'undefined' ? this.config[key][item[key]].text : '';
            },
            renderByFilter(key, filter){
                return typeof this.config[key] === 'undefined' && typeof filter !== 'undefined';
            }
        }
    }
</script>




