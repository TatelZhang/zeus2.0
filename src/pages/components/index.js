/**
 * @author flyerjay
 * @desc 方便快速引用全局组件
 */
import ZHeader from './header';
import ZMenu from './menu';
import ZSelect from './select';
import ZTable from  './table';
import Dialog from './dialog';

const components = {
    ZHeader, 
    ZMenu,
    ZSelect,
    ZTable,
    Dialog
}
const install = function(Vue, opts = {}) {
    if (install.installed) return;
    Object.keys(components).forEach(key=>{
        Vue.component(components[key].name, components[key]);
    })
}
export default {
    ...components,
    install
}