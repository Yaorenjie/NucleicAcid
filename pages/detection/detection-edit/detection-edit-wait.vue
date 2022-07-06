<template>
	<view>
		<uni-section title="编辑采样点" type="line">
					<view class="uni-edit-form">
						<!-- 基础用法，不包含校验规则 -->
						<uni-forms ref="valiForm" :modelValue="valiFormData">
							<uni-forms-item label="目前总排队人数" required>
								<uni-easyinput type="number" v-model="valiFormData.wait" placeholder="请输入目前总排队人数" />
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
					name: '',
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
			if (e.wait) {
				this.$set(this.valiFormData, 'wait', e.wait)
			}
		},
		methods: {
			submit() {
				this.$store.commit("update_detectionData_wait", this.valiFormData.wait);
					uni.navigateTo({
						url: '/pages/detection/detection-edit/detection-edit?id='+ this.id,
						animationType: 'slide-in-right',
						animationDuration: 200
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
