## ct-adc-list

本组件用于渲染一个table，支持自定义单元格显示，如将一个单元格中的内容渲染为一个外部的组件。

## 组件示例图

[!img](图片地址)

## 在线demo

[在线demo]({在线demo地址})

## 功能点

1. 可以满足常规的表格需求，如全选、数据是否显示、对数据处理后再显示等
2. 支持对表格进行class配置
3. 支持表格中的内容为组件

## 使用

从npm安装ct-adc-list

```
npm install ct-adc-list --save
```
在代码中使用

```
import {table, column} from 'ct-adc-list';

//全局注册
Vue.component('adc-table', table);
Vue.component('adc-table-column', column);

//局部注册
new Vue({
    ...
    components: {
        'adc-table-column': column,
        'adc-table': table
    }
    ...
})

//html

<adc-table>
    <adc-table-column prop="name" name="名称" width="100"></adc-table-column>
</adc-table>
```

## props

参数 | 说明 | 类型 | 默认值 | 可选值 | 描述 |
--- | --- | --- | --- | ---- | ---
data | 表格数据 | Array | [] | 数组，每项的key一致，为规则数据 | 用来渲染表格的数据 |
initialAllChecked | 是否要全选数据 | Boolean | false | true/false | 是否要全选数据(当含有type为selection的列时可用)
initialChecked | 要选中的数据的索引集合 | Array | [] | 数组，每项为一个索引(>=0) | 要选中的数据的索引集合 (当含有type为selection的列时可用)
status | 数据响应状态 | Boolean | true | true/false | 表格数据响应状态(成功/失败)，当成功时显示数据，失败时显示msg
msg | 显示信息 | String | '' | 任何字符串 | 辅助信息提示。当status为true时为提示信息(如'请点击搜索按钮'),status为false时为出错信息(如'请求失败')

### table-column配置项

参数 | 说明 | 类型 | 默认值 | 可选值 | 描述 |
--- | --- | --- | --- | ---- | ---
type | 渲染类型 | String | '' | 非必填 | 'selection' / '' | 数据被渲染为什么类型(复选框 还是 数据)
prop | 对应的字段名 | String | '' | '' / 任何在data中包含的字段名 | 对应data中的哪个字段。''即为不对应data中的任何字段，为抽象字段，如复选框，可以不指定该项
name | 表头 | String | '' | 任何字符串 | 表头(th)显示名称
width | 列宽 | String(Number) | '' | 数字或字符串 | 将原样被输出为col标签的width属性
vm | 自定义组件的配置[详细说明](#propsvm) | Object | {name:'',config:{}} | | 对于自定义组件，可能含有自定义的配置，通过该属性配置组件的属性
visible | 该列是否可见 | Boolean,Function | true | true/false/方法(该方法需返回一个Boolean值) | 为方法时取决于返回值,当为function时[详细说明](#方法属性的说明)
filter | 过滤器 | String,Function | ''(不处理) | 公用过滤器的key / 方法(该方法需返回一个Boolean值) | 为字符串时会到Vue的公用filters中获取方法,当为function时[详细说明](#方法属性的说明)
className | 单元格td的class | String,Function,Array | ''(不添加类) | 类字符串 / 方法 / 数组(每项为一个类名) | 设置单元格td的class,当为Array时[详细说明](#propsclassName),当为function时[详细说明](#方法属性的说明)
mapper | 映射数据 | Array | []  (不映射) | 形如[{key: 1, val: '已启用'}]，请保证字段名是key/val | 将数据通过映射转换为显示内容(比如将数字1显示为'已启用')
ashtml | 是否将内容渲染为html | Boolean | false | true/false | 是否将内容渲染为html


#### props.vm

* vm.name: 自定义组件的名称

* vm.config: 自定义组件的配置项

#### props.className

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

#### 方法属性的说明

可为方法的属性有: visible, filter, className;

方法的this指向外层组件，及table组件的父组件，也是开发者项目中使用了table的组件。

方法的参数统一为 data, item, index, key，分别为当前项的值、当前行的值、当前项的索引、当前项的key。


## 方法

### getChecked

方法描述。。。。。。

#### 参数列表

无

#### 返回值

类型: {Object}

说明: 

Object含有两项，分别为：

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

