## 介绍

本组件用于渲染一个table，支持自定义单元格显示，如将一个单元格中的内容渲染为一个外部的组件。

## 使用

### 安装
```
npm install 'ct-adc-list';
```

### 使用

Vue.component('adc-table',table['adc-table']);
Vue.component('adc-table-column',table['adc-table-column']);

或

new Vue({
    component:{
        'adc-table-column': table['adc-table-column'],
        'adc-table': table['adc-table']
    }
})
```

## 参数说明

### table配置项

参数|描述|类型|是否必填|默认值
--- | --- | --- | --- |  --- |
data | 用来渲染表格的数据 | Array | 非必填 | []
initialAllChecked | 是否要全选数据 (当含有type为selection的列时可用) | Boolean | 非必填 | false
initialChecked | 要选中的数据的索引集合 (当含有type为selection的列时可用) | Array | 非必填 | []
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
vm | 自定义组件的配置(详细见下方) | Object | 非必填 | {name:'',config:{}}
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

### 方法属性的说明

可为方法的属性有: visible, filter, className;

方法的this指向外层组件，及table组件的父组件，也是开发者项目中使用了table的组件。

方法的参数统一为 data, item, index, key，分别为当前项的值、当前行的值、当前项的索引、当前项的key。


#### vm

#### vm.name

自定义组件的名称

#### vm.config

自定义组件的配置项

## 方法说明

### getChecked

**参数:** 无参数

**描述:** 获取选中项

**返回值** {}

{}.allChecked 是否全选

{}.checked 一个数组；为选中项的索引集合


## Q & A

### 某些情况下需要整列不显示，怎么处理？

在html片段中去掉对应的adc-table-column

### 数据的处理可以通过mapper和filter，两者都可以干扰到数据的最终结果，内部规则是怎样的?

先使用mapper映射，再使用filter处理

### 自定义的vm怎么传入props？

自定义的vm中的props通过table-column配置项vm.config进行传入.外部的修改可以引发table的重新渲染

### 自定义vm的开发

嵌入到table中的vm具有一致的props, 以便table向其传值, props列表如下:

参数|描述|类型|是否必填|默认值
--- | --- | --- | --- | --- |
prop | 字段名 | String | 非必填 | ''
item | 改行的数据 | Object | 非必填 | {}
index | 索引 | Number | 非必填 | -1 (无意义)
data | 数据 | Array | 非必填 | []
config | 组件自身的配置 | Object | 非必填 | 不同的组件有不同的默认配置项


### 注意事项

1. 给data赋值时，需要保证status为true，才能正确显示数据，否则整个table会被认为处于'错误'的状态。
