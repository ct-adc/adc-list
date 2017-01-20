/**
 * @author rubyisapm
 */
import Vue from 'vue';
import List from '../../index.js';
Vue.component(List.name,List);
Vue.filter('dateTimeBToF', function (value) {
    return '时间'+value;
});
new Vue({
    el: '#list',
    data: {
        theads: [
            {
                key: 'BeginTime',
                name: '开始时间',
                filter: 'dateTimeBToF'
            },
            {
                key: 'EndTime',
                name: '结束时间',
                filter: 'dateTimeBToF'
            },
            {
                key:'ShowTime',
                name:'显示时间'
            },
            {
                key:'ImgUrl',
                name:'图片地址',
                component:{
                    name:'img',
                    props:{
                        width:120
                    }
                }
            },
            {
                key: 'H5Url',
                name: '跳转链接'
            },
            {
                key: 'Url',
                name: '文件地址'
            },
            {
                key:'Status',
                name:'状态'
            }
        ],
        loading: false,
        responseStatus: true,
        data: [
            {
                BeginTime: '20160101',
                EndTime: '20160103',
                H5Url: 'http://www.baidu.com',
                Url: 'http://www.baidu.com',
                ImgUrl: 'http://photocdn.sohu.com/20170113/Img478630902.jpg',
                Status:1
            },
            {
                BeginTime: '20160102',
                EndTime: '20160103',
                H5Url: 'http://www.baidu.com',
                Url: 'http://www.baidu.com',
                ImgUrl: 'http://photocdn.sohu.com/20170113/Img478630902.jpg',
                Status:2
            }
        ],
        config: {
            Url: function (value,item,index) {
                return '<img width="100" height="100" src="' + value + '"/><img ref="'+index+'dd'+'" width="100" height="100" style="display:none" src="' + value + '"/>';
            },
            ShowTime:function(value,item,index){
                return item.BeginTime+'-'+item.EndTime;
            },
            Status:{
                1:{
                    className:'text-success',
                    text:'正常'
                },
                2:{
                    className:'text-danger',
                    text:'停用'
                }
            }
        },
        operations: [
            {
                icon: 'edit',
                text: '查看',
                className:'btn-success',
                action: function (item) {
                    alert('查看操作，我接到的数据'+JSON.stringify(item));
                }
            },
            {
                icon: 'edit',
                text: '链接',
                className:'btn-info',
                link:'http://www.baidu.com'
            },
            {
                icon: 'edit',
                text: '只有状态为启用时我才显示',
                className:'btn-info',
                link:'http://www.baidu.com',
                displayFilter:function(item){
                    return item.Status===1;
                }
            }
        ]
    }
});
