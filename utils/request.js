import config from "@/config";  // 配置文件
import storage from "./storage"; // 缓存封装
import store from "@/store/index.js"; 

export default {
	console(options){
		if(config.debug){
			// console.log("<<===============================================>>");
			// console.log("request start");
			// console.log("header" + JSON.stringify(options.header));
			// console.log("method: " + options.method + " URL: " + options.url);
			// console.log(options.data);
			// console.log("request end");
			// console.log("<<===============================================>>");
		} 
	},
	domain(){
		return config.uni_app_web_api_url.replace("api","");
	},
	send(options={}){
        // loading加载
        uni.showLoading({
           title: '加载中'
        });
        
        // 拼接路劲，下面的配置文件会提到
		options.url = config.uni_app_web_api_url + '' + options.url;
        // 请求方式
		options.method = options.method || "GET";
		
        // 这里看项目的情况来定，如果是没有token，那就删除这里，上面的storage也不需要引入
		let users = storage.getJson("users");
		if(users != null){
			options.header = { 'Authentication' : users.token}
		}
		// if ('POST' === options.method) {
		// 	options.header = {'Content-Type': 'application/x-www-form-urlencoded'}
		// }
        if (options.contentType) {
			options.header = {'Content-Type': options.contentType}
		}
        // 发起Promise请求
		return new Promise((resolve, reject) =>{
			uni.request(options).then(data=>{
				var [error, res] = data;
				uni.hideLoading();
				if(error != null){
					reject(error);
				}else{
                    // 相应拦截、根据后端的状态码来写，可以自行判断和封装
					if (!res.data.code) {
						resolve(res.data)
					} else if(res.data.code === 400){
						const pages = getCurrentPages()
						store.commit("update_last_route", pages[pages.length - 1].$route.fullPath)
						uni.navigateTo({
						    url: '/pages/login/login'
						});
						reject(res.data)
					} else if (res.data.code === 200) {
						resolve(res.data)
					} else{
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 2000
						})
						reject(res.data)
					}
				}
			});
		});
	},
	get(url="",data={}){
		return this.send({
			url: url,
			data: data
		});
	},
	post(url="",data={},contentType){
		return this.send({
			url: url,
			data: data,
			method: "POST",
			contentType: contentType
		});
	},
	put(url="",data={}){
		return this.send({
			url: url,
			data: data,
			method: "PUT"
		});
	},
};