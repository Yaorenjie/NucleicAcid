<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		onNavigationBarButtonTap(e) {
			console.log('1111')
		},
		mounted () {
			// var scriptElement = document.createElement('script');
			// document.body.appendChild(scriptElement);
			// scriptElement.src = "https://map.qq.com/api/gljs?v=1.exp&key=TKUBZ-D24AF-GJ4JY-JDVM2-IBYKK-KEBCU"
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	// 设置整个项目的背景色
	page {
		background-color: #f5f5f5;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>
