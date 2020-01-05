import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import firebase from '@/firebase/init'



Vue.config.productionTip = false


let app=null;
// wait for firebase auth to init before creating the app
firebase.auth().onAuthStateChanged(()=>{
	//init app if not already exist
	if(!app){
		app = new Vue({
			router,
			vuetify,
			render: h => h(App)
		}).$mount('#app')
	} 
})