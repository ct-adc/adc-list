/**
 * @author rubyisapm
 */
import Vue from 'vue';
import {table, column} from 'index.js';
import Img from 'common/adc-img.vue';
import Buttons from 'common/buttons.vue';
import RtInput from 'common/rt-input.vue';
import A from './component/a.vue';
import B from './component/b.vue';
import utility from 'ct-utility';
import loading from 'ct-adc-loading';

Vue.component('adc-table-operator', Buttons);
Vue.component('adc-img', Img);
Vue.component('rt-input', RtInput);
Vue.use(loading);
Vue.filter('a', function(v) {
    return v * 2;
});
const tableData = [
    {
        name: 'ruby',
        age: 12,
        dep: 1,
        img: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
        html: 'hello',
        time1: +new Date() + 86400000,
        time2: +new Date()
    }, {
        name: 'ruby2',
        age: 15,
        dep: 1,
        img: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
        html: 'hello',
        time1: +new Date() + 86400000,
        time2: +new Date()
    }, {
        name: 'ruby',
        age: 12,
        dep: 1,
        img: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
        html: 'hello',
        time1: +new Date() + 86400000,
        time2: +new Date()
    }, {
        name: 'ruby2',
        age: 16,
        dep: 1,
        img: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
        html: 'hello',
        time1: +new Date() + 86400000,
        time2: +new Date()
    }, {
        name: 'ruby',
        dep: 3,
        age: 12,
        img: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
        html: 'hello',
        time1: +new Date() + 86400000,
        time2: +new Date()
    }, {
        name: 'ruby2',
        age: 15,
        dep: 1,
        img: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
        html: 'hello',
        time1: +new Date() + 86400000,
        time2: +new Date()
    }, {
        name: 'ruby',
        age: 12,
        dep: 2,
        img: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
        html: 'hello',
        time1: +new Date() + 86400000,
        time2: +new Date()
    }, {
        name: 'ruby2',
        age: 15,
        dep: 3,
        img: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
        html: 'hello',
        time1: +new Date() + 86400000,
        time2: +new Date()
    }
];

new Vue({
    components: {
        'adc-table-column': column,
        'adc-table': table,
        'aaa': A,
        'bbb': B
    },
    el: '#app',
    data: {
        table: 'table1',
        tableData: tableData,
        loading: true,
        visibleFilter(data) {
            return data > 13;
        },
        deps: [
            {
                key: 1,
                val: '系统研发'
            }, {
                key: 2,
                val: '移动平台'
            }, {
                key: 3,
                val: '移动发行'
            }
        ],
        htmlResolve(data, item, index, key) {
            return `${this.table}<b>${data}-${item.age}-${key}</b>`;
        },
        vms: {
            img: {
                name: 'adc-img',
                config: {
                    width: 180,
                    height: 180
                }
            },
            operator: {
                name: 'adc-table-operator'
            },
            order: {
                name: 'rt-input'
            }
        },
        className(val) {
            if (val === 30) {
                return 'text-danger';
            }
            return 'text-success';
        },
        dateTimeFormat(v) {
            return utility.dateFilter(v, 'yyyy-MM-dd HH:mm:ss');
        },
        dateTimeFormat2(v) {
            return utility.dateFilter(v, 'yyyy-MM-dd HH:mm:ss');
        }
    },
    created(){
        setTimeout(()=>{
            this.loading = false;
        }, 1000);
    },
    methods: {
        getChecked() {
            console.log(this.$refs.table.getChecked());
        },
        change() {
            this.vms.img.config = {
                width: 100,
                height: 100
            };
        },
        changeTable() {
            this.table = 'table2';
        }
    }
});
