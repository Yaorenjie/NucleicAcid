<template>
	<view class="container">
		<uni-group title="核酸采样点智能推荐" margin-top="0">
			<view class="uni-list-item" v-for="(item, index) in list" :key="index">
				<view class="uni-list-item__container">
					<view class="uni-list-item__content">
						<text class="uni-list-item__content-title">{{item.name}}</text>
					</view>
					<view class="uni-list-item__extra" @click="urlCk(item.url)">
						<uni-icons type="right" size="20"></uni-icons>
					</view>
				</view>
			</view>
		</uni-group>
		<uni-group title="基本信息" margin-top="0">
			<view class="uni-list-item">
				<view class="uni-list-item__container">
					<view class="uni-list-item__content">
						<text class="uni-list-item__content-title">姓名</text>
					</view>
					<view class="uni-list-item__extra">
						<text class="uni-list-item__content-title">{{user.name}}</text>
					</view>
				</view>
			</view>
			<view class="uni-list-item">
				<view class="uni-list-item__container">
					<view class="uni-list-item__content">
						<text class="uni-list-item__content-title">手机号</text>
					</view>
					<view class="uni-list-item__extra">
						<text class="uni-list-item__content-title">123123345</text>
					</view>
				</view>
		    </view>
			<view class="uni-list-item">
				<view class="uni-list-item__container">
					<view class="uni-list-item__content">
						<text class="uni-list-item__content-title">退出</text>
					</view>
					<view class="uni-list-item__extra" @click="logOut">
						<uni-icons type="right" size="20"></uni-icons>
					</view>
				</view>
			</view>
		</uni-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "核酸检测点",
				list: [
					{
						name: "用户管理",
					},
					{
						name: "角色管理",
					},
					{
						name: "管理员管理",
						url: "/pages/administrators/list"
					},
					{
						name: "采样点管理",
						url: "/pages/detection/detection"
					},
				],
				loading: false
			}
		},
		computed: {
			user() {
				return this.$store.state.users
			}
		},
		methods: {
			urlCk (url) {
				uni.navigateTo({
				    url: url	
				})
			},
			logOut() {
				if (this.loading) return
				this.loading = true
				this.$http.httpPost('/logout/').then((res) => {
					this.loading = false
					this.$store.commit("UPDATEUSERS", {});
					uni.navigateTo({
					    url: '/pages/login/login'
					});
				})
				.catch((error) => {
					this.loading = false
				    console.log(error);
				});
			}
		}
	}
</script>

<style lang="scss" scoped>

	.uni-list-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		flex-direction: row;
		background-color: #FFFFFF;
	}


	.uni-list-item__container {
		padding: 12px 15px;
		width: 100%;
		flex: 1;
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom-style: solid;
		border-bottom-width: 1px;
		border-bottom-color: #eee;
	}

	.uni-list-item__content-title {
		font-size: 14px;
	}
</style>
