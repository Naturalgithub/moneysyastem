import Vue from 'vue'
import Router from 'vue-router'
import Index from './components/Index.vue'

import Login from './components/Login.vue'
import MoneyManagement from './components/system/MoneyManagement.vue'
import CustomerManagement from './components/system/CustomerManagement.vue'
import AccountingItem from './components/system/AccountingItem.vue'
import BankManagement from './components/system/BankManagement.vue'
import CompanyInfo from './components/system/CompanyInfo.vue'
import ItemInfo from './components/system/ItemInfo.vue'
import ItemLine from './components/system/ItemLine.vue'
import PayPal from './components/system/PayPal.vue'
import DepartmentInfo from './components/system/DepartmentInfo.vue'

import Useradd from './components/rights/Useradd.vue'
// 收支系统
import InOutManagement from './components/moneysystem/InOutManagement.vue'
import InOutQuery from './components/moneysystem/InOutQuery.vue'
import InOutWrite from './components/moneysystem/InOutWrite.vue'
import InOutAddWrite from './components/moneysystem/InOutAddWrite.vue'
import PLine from './components/moneysystem/PLine.vue'
// 审批列表
import ApplicationList from './components/allow/ApplicationList.vue'
import ToDoList from './components/allow/ToDoList.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        { path: '/MoneyManagement', name: 'moneymanagement', component: MoneyManagement },
        { path: '/CustomerManagement', name: 'customermanagement', component: CustomerManagement },
        { path: '/AccountingItem', name: 'accountingitem', component: AccountingItem },
        { path: '/BankManagement', name: 'bankmanagement', component: BankManagement },
        { path: '/CompanyInfo', name: 'companyinfo', component: CompanyInfo },
        { path: '/ItemInfo', name: 'itemInfo', component: ItemInfo },
        { path: '/ItemLine ', name: 'itemline ', component: ItemLine },
        { path: '/PayPal', name: 'paypal', component: PayPal },
        { path: '/DepartmentInfo', name: 'departmentinfo', component: DepartmentInfo },
        // right
        { path: '/Useradd', name: 'useradd', component: Useradd },
        // moneysystem
        { path: '/InOutManagement', name: 'InOutManagement', component: InOutManagement },
        { path: '/InOutQuery', name: 'InOutQuery', component: InOutQuery },
        { path: '/InOutWrite', name: 'InOutWrite', component: InOutWrite },
        { path: '/InOutAddWrite', name: 'InOutAddWrite', component: InOutAddWrite },
        { path: '/PLine', name: 'PLine', component: PLine },
        { path: '/ApplicationList', name: 'ApplicationList', component: ApplicationList },
        { path: '/ToDoList', name: 'ToDoList', component: ToDoList }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  // 所有的导航的跳转都要经过导航守卫
  // 关注to, 如果to表示去登陆, 直接放行
  // 如果to不是去登陆, 去其他组件, 判断是否有token, 有就放行, 没有就去登陆
  const aa = localStorage.getItem('data')
  if (to.path === '/login' || aa) {
    console.log(22)
    next()
  } else {
    next('/login')
  }
})

export default router
