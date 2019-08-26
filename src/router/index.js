import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import VueDes from '@/components/VueDes'
import VModel from '@/components/VModel'
import IFElse from '@/components/IFElse'
import For from '@/components/For'
import Ajax from '@/components/Ajax'
import Baidu from '@/components/Baidu'
import HandoutTest from '@/components/HandoutTest'
import RoomHandout from '@/components/room_handout'



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
    },
    {
      path: '/IF',
      name: 'IF',
      component: IFElse
    },
    {
      path: '/For',
      name: 'For',
      component: For
    },
    {
      path: '/Ajax',
      name: 'Ajax',
      component: Ajax
    },
    {
      path: '/Baidu',
      name: 'Baidu',
      component: Baidu
    },
    {
      path: '/HandoutTest',
      name: 'HandoutTest',
      component: HandoutTest
    },
      {
          path: '/RoomHandout',
          name: 'RoomHandout',
          component: RoomHandout
      }
  ]
})
