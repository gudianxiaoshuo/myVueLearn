import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import VueDes from '@/components/VueDes'
import VModel from '@/components/VModel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Des',
      name: 'Des',
      component: VueDes
    },
    {
      path: '/VModel',
      name: 'VModel',
      component: VModel
    }
  ]
})
