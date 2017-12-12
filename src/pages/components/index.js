/**
 * @author flyerjay
 * @desc 方便快速引用全局组件
 */
import ZHeader from './header';
import ZMenu from './menu';
import ZSelect from './select';
import ZTable from  './table';

const components = {
    ZHeader, 
    ZMenu,
    ZSelect,
    ZTable
}
const install = function(Vue, opts = {}) {
    if (install.installed) return;
    Object.keys(components).forEach(v=>{
        Vue.component(v, components[v]);
    })
}
export default {
    ...components,
    install
}