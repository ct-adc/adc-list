# 表格渲染组件

## 使用

从npm安装`ct-adc`
```
npm install ct-adc
```
在代码中引用
```
import adc from 'ct-adc';
Vue.use(adc)
```
或
```
import adc from 'ct-adc';
import {List} from 'ct-adc'
Vue.component(autoComplete.name,autoComplete);
```
## 参数说明

参数|描述|类型|默认值
--- | --- | --- | --- |
loading | 加载状态 | Boolean | false
responseStatus | 响应状态 | Boolean | true
colgroup | 每列的宽度 | Array | []
operations | 操作列的操作项描述[见下方详细信息] | Array | []
config | 数据的渲染配置[见下方详细信息] | Object | {}
theads | 表格的表头标题[见下方详细信息] | Array | []
data | 表格数据 | Array | []

### operations 

表格中的操作列的说明，该数组的每项代表一个操作按钮，具体配置为一个对象;

#### 配置项

参数 | 描述 | 类型 | 必填 | 默认
--- | --- | --- | --- | --- | 
icon | 操作按钮中的图标 | String | 否 | 无
text | 操作按钮的文字 | String | 是 | 无
action | 操作按钮的click事件回调 | Function | 否 | 无
link | 操作按钮的链接地址 | String | 否 | 无
linkToNew | 操作按钮的链接地址是否跳转到新页面 | String | 否 | 无
displayFilter | 操作按钮的显示隐藏规则 | 否 | 无

### config

config用于数据到显示内容的转换。该对象的每项代表一个数据转换规则，该项的key以具体的字段名命名；

该项可以配置为一个对象或一个方法;

#### 对象

如:
```
SignInConfigType:{
    1:{
      className: '',
      text: '签到'
    },
    2:{
      className:'',
      text:'抽奖奖励'
    },
    3: {
      className:'',
      text:'分享奖励'
    }
}
```
其中每一项为对应的属性值，即当属性为该属性值时显示其中text标注的内容；

##### 配置项

参数 | 描述 | 类型 | 必填 | 默认
--- | --- | --- | --- | --- | 
className | 数据渲染时要添加的类名，比如把内容显示为红色 | String | 否 | 无
text | 显示内容 | String | 否 | 无

#### 方法

如:
```
Url: function (value,item,index) {
    return '<img width="100" height="100" src="' + value + '"/>';
}
```
定义了该字段在渲染时进行的处理，该函数返回一个字符串，该字符串以html的形式被显示到实际页面上；
config默认有三个参数，分别是value/item/index，分别表示该项数据该字段的值、该项数据的完整对象和该项数据在列表中的索引；

### theads

该数组中的每一项代表一列数据的表头;

如
```
{
    key: 'BeginTime',
    name: '开始时间',
    filter: 'dateTimeBToF'
}
```
#### 配置项

参数 | 描述 | 类型 | 必填 | 默认
--- | --- | --- | --- | --- | 
key | 对应的字段名 | String | 是 | 无
name | 表头名称 | String | 是 | 无
filter | 全局过滤器名称 | String | 否 | 无
component | 该列数据用到的组件名称[见下方详细信息] | Object | 否 | 无

### theads[i].component

此项用于配置表格中的组件级渲染,对应thead的component配置项；

#### 配置项
参数 | 描述 | 类型 | 必填 | 默认
--- | --- | --- | --- | --- | 
name | 指定组件的名称[参见内置组件列表] | String | 是 | 无
props | 指定传入组件的props | Object | 否 | 无

### 其他说明 

#### 内置组件列表

组件名称 | 组件说明
--- | --- |
img | 用于图片项的渲染，该组件会将图片渲染为一张可自定义尺寸的图片，图片的hover用于展示图片的原图


## Q & A

1.字段的原始内容要经过处理才能显示出来，该怎么配置？

- 对于公用的数据处理，如果在全局有相应的vue过滤器，使用theads中的filter指定过滤器；

- 如果是针对本次渲染的特殊处理，如图片地址需要显示成图片，通过将config中的配置项设置为转换函数来处理；

- 如果是一一对应的列表，如状态字段，属性值为1，要显示为"正常",则通过将config中的配置项设置为转换对象来配置内容转换规则；


2.如果操作列中有的按钮需要根据情况设置为不显示，该怎么配置？

通过operations中的对应操作的displayFilter字段进行配置。

该过滤器是一个函数，接收该条数据的内容作为参数；如：
```
function(item){
    return item.Status===1;
}
```
那么只有该条数据的Status字段为1时才会显示相应的操作按钮；

3.theads中的项是否需要和数据中的key一一对应？

不需要。
举例说明：如果数据中有BeginTime和EndTime两个字段，但是实际渲染时，想显示一列"起始时间"。
那么，可以在theads中配置一列:
```
{
    key:'ShowTime',
    name:'显示时间'
}
```
并在config中设置该列实际的内容：
```
ShowTime:function(value,item,index){
    return item.BeginTime+'-'+item.EndTime;
}
```
那么实际渲染时，list组件会显示一列"起始时间"，内容为BeginTime-EndTime。