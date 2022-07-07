<template>
	<view>
		<uni-section title="编辑采样点" type="line">
					<view class="uni-edit-form">
						<!-- 基础用法，不包含校验规则 -->
						<uni-forms ref="valiForm" :modelValue="valiFormData">
							<uni-forms-item label="检测窗口" required>
								<uni-easyinput type="number" v-model="valiFormData.window" placeholder="请输入检测窗口" />
							</uni-forms-item>
						</uni-forms>
					</view>
				</uni-section>
				<button type="primary" @click="submit('valiForm')">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				value: '',
				// 校验表单数据
				valiFormData: {
					window: '',
				}
			}
		},
		computed: {
			data () {
				return this.$store.state.detectionData
			}
		},
		onLoad(e){
			if(e.id){
				this.id = e.id;
			}
			if (e.window) {
				this.$set(this.valiFormData, 'window', e.window)
			}
		},
		methods: {
			submit(ref) {
				this.$refs[ref].validate().then(res => {
					this.$store.commit("update_detectionData_window", this.valiFormData.window);
					uni.navigateTo({
						url: '/pages/detection/detection-edit/detection-edit?id='+ this.id,
						animationType: 'slide-in-right',
						animationDuration: 200
					})
				}).catch(err => {
					console.log('err', err);
				})
			}
		}
	}
</script>

<style lang="scss">
	.uni-edit-form{
		padding: 0 20rpx;
	}
</style>
