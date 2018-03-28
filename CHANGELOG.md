## 更新日志

### 4.0.0

*2018-03-28*

- 新增 增加className属性，用于对table的class属性进行配置

- 删除 删除loading属性，即组件本身不做loading逻辑，使用者需使用ct-adc-loading进行loading控制

### 3.0.0

*2017-11-30*

- 优化 将filter和className属性的this指向外层组件（即table的父组件）,同时将其参数设置为统一的四个：val,item,index,key

### 2.0.2

*2017-10-10*

- 修复 修改vue和vue-template-compiler的版本，vue版本写死win下导致引用该组件的项目编译不通过

### 2.0.1

*2017-10-10*

- 修改 为filter添加第二个参数item, 引用整行的数据

### 2.0.0

*2017-07-11*

- 优化 整体变为table加column的形式

### 0.1.0

*2017-04-20*

- 新增 添加responseMsg，提示响应数据的错误信息

### 0.0.5