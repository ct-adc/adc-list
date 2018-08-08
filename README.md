## 介绍

本组件用于渲染一个table，支持自定义单元格显示，如将一个单元格中的内容渲染为一个外部的组件。

## 使用

### 安装
```
npm install 'ct-adc-list';
```

### 使用

```
import {table, column} from 'ct-adc-list';

Vue.component('adc-table', table);
Vue.component('adc-column', column);

或

new Vue({
    component:{
        'adc-table': table,
        'adc-column': column
    }
})
```

## 参数说明

### table配置项

参数|描述|类型|是否必填|默认值
--- | --- | --- | --- |  --- |
data | 用来渲染表格的数据 | Array | 非必填 | []
checked | 选中状态 | Object | 否 | {checkAll: false, checked: []}
loading | 加载状态 | Boolean | 非必填 | false
status | 表格数据响应状态(成功/失败) | Boolean | 非必填 | true
msg | 显示信息(status为true时为提示信息(如'请点击搜索按钮'),status为false时为出错信息(如'请求失败')) | String | 非必填 | ''

### table-column配置项

参数|描述|类型|是否必填|默认值
--- | --- | --- | --- | --- |
type | 数据被渲染为什么类型 | String | 非必填 | ''(用对应data中的数据渲染)
prop | 对应的字段名 | String | 非必填 | ''(不对应data中的任何字段，为抽象字段，如复选框，可以不指定该项)
name | 表头显示名称 | String | 非必填 | ''(表头标题为字符串'')
width | 列宽 | String(Number) | 非必填 | ''(0)
visible | 该列是否可见（为方法时取决于返回值,当为function时详见下方说明） | Boolean,Function | 非必填 | true
filter | 过滤器(为字符串时会到Vue的公用filters中获取方法,当为function时详见下方说明 | String,Function | 非必填 | ''(不处理)
className | 设置单元格td的class(当为function时详见下方说明) | String,Function,Array | 非必填 | ''(不添加类)
mapper | 映射(将数据通过映射转换为显示内容(比如将数字1显示为'已启用')) | Array | 非必填 | []  (不映射)
ashtml | 是否将内容渲染为html | Boolean | 非必填 | false

className为Array时格式如下：
```
[
    {
        text: '系统研发',
        className: 'text-danger'
    },
    {
        text: '移动平台',
        className: 'text-success'
    }
]
```

### selection列的model

双向绑定属性: selection

默认值: 

```
{
    checkAll: false,
    checked: []
}
```

当指定了selection列且按以上形式双向绑定后，则当selection中的选中项发生变化时，则可同步到父组件。

### table-column插槽

table-column中支持普通插槽和作用域插槽，均为默认插槽，无需指定名字。

作用域插槽中可以拿到3个数据：分别是当前td中的值(需绑定prop属性)，所在行的数据，所在行的索引
```
<template slot-scope="{data, item, index}">
    <button type="button" class="btn btn-sm btn-danger" @click="clickSlot(data, item, index)">button in scopedSlot</button>
</template>
```


### 方法属性的说明

可为方法的属性有: visible, filter, className;

方法的this指向外层组件，及table组件的父组件，也是开发者项目中使用了table的组件。

方法的参数统一为 data, item, index, key，分别为当前项的值、当前行的值、当前项的索引、当前项的key。


## 方法说明

### getChecked

**参数:** 无参数

**描述:** 获取选中项

**返回值** {}

{}.checkAll 是否全选

{}.checked 一个数组；为选中项的索引集合

## 事件说明

### 事件列表

事件名称 | 说明 | 回调参数 | 描述
--- | --- | --- | --- 
check-all | 全选被选中/取消选中 | 是否被全选: Boolean | 全选被选中/取消选中触发的事件
check | 单项选中/取消选中 | {index: Number, checked: Boolean} | 单项选中/取消选中触发的事件

## Q & A

### 某些情况下需要整列不显示，怎么处理？

在html片段中去掉对应的adc-table-column

### 数据的处理可以通过mapper和filter，两者都可以干扰到数据的最终结果，内部规则是怎样的?

先使用mapper映射，再使用filter处理

### 注意事项

1. 给data赋值时，需要保证status为true，才能正确显示数据，否则整个table会被认为处于'错误'的状态。
