import Vue from 'vue'
import Vuex from 'vuex'
import storage from '../utils/storage'

Vue.use(Vuex);

const store = new Vuex.Store({
	// 属性值
	state: {
		users: storage.getJson("users"),
		permission: storage.getJson("permission"),
		detectionData: storage.getJson("detectionData") || {
			name: '',
			address: '',
			window: '',
			wait: '',
			rate: '',
			time: [],
			state: 1,
			latitude: '',
			longitude: ''
		}
	},
	// 对外方问state属性内容
	getters: {
		getCart: state => {
			let users = storage.getJson("users");
			if(users == null){
				return 0;
			}

			return users.shop_count;
		}
	},
	// Mutation 必须是同步函数
	// 更改state属性内容
	// 使用：this.$store.commit("setUserInfo",{  });
	mutations: {
		UPDATEUSERS(state, data){
			state.users = data;
			storage.setJson("users", data);
		},
		DELETEUSERS(state,name){
			state.users = null;
			storage.remove(name);
		},
		UPDATEPERMISSION(state, data){
			state.permission = data;
			storage.setJson("permission", data);
		},
		DELETEPERMISSION(state,name){
			state.permission = null;
			storage.remove(name);
		},
		update_detectionData(state, data){
			state.detectionData = data;
			storage.setJson("detectionData", state.detectionData);
		},
		update_detectionData_name(state, data){
			state.detectionData.name = data;
			storage.setJson("detectionData", state.detectionData);
		},
		update_detectionData_address(state, data){
			state.detectionData.address = data.address;
			state.detectionData.latitude = data.lat;
			state.detectionData.longitude = data.long;
			storage.setJson("detectionData", state.detectionData);
		},
		update_detectionData_window(state, data){
			state.detectionData.window = data;
			storage.setJson("detectionData", state.detectionData);
		},
		update_detectionData_wait(state, data){
			state.detectionData.wait = data;
			storage.setJson("detectionData", state.detectionData);
		},
		update_detectionData_rate(state, data){
			state.detectionData.rate = data;
			storage.setJson("detectionData", state.detectionData);
		},
		update_detectionData_time(state, data){
			state.detectionData.time = data;
			storage.setJson("detectionData", state.detectionData);
		},
		update_detectionData_state(state, data){
			state.detectionData.state = data;
			storage.setJson("detectionData", state.detectionData);
		},
		delete_detectionData(state, data){
			state.detectionData = null;
			storage.remove(name);
		},
	},
	// Action 可以包含任意异步操作
	// 通过 context.commit 可以方问mutations方法
	// 也可以获得getters内容
	// 通过 this.$store.dispatch("getUser") 来取得内容
	actions: {
		getCart(context){
		},
		usersStatus(context){
			return new Promise(function (resolve, reject) {
				if(storage.getJson("users") == null){
					reject();
				}else{
					resolve();
				}
			});
		}
	}
})

export default store