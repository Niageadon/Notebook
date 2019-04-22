import store from '../../storage/index'

export default function (to, from, next) {

  if(store.getters.USER){
    next()
  }
  else{
    next('/Login')
  }
}
