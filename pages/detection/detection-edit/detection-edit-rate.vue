<template>
	<view>
		<uni-section title="编辑检测时长" type="line">
			<view class="uni-edit-form">
				<!-- 基础用法，不包含校验规则 -->
				<uni-forms ref="valiForm" :modelValue="valiFormData">
					<uni-forms-item>
						<uni-number-box v-model="valiFormData.rate" :step="1" /> 
						<view class="uni-mt-10" v-if="valiFormData.rate !== ''">{{valiFormData.rate}} 秒/人</view>
					</uni-forms-item>
				</uni-forms>
			</view>
		</uni-section>
		<view class="button-group">
			<button type="primary" size="mini" @click="cancel()">取消</button>
			<button type="primary" size="mini" @click="submit('valiForm')">提交</button>
		</view>
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
					rate: '',
				}
			}
		},
		computed: {
			data() {
				return this.$store.state.detectionData
			}
		},
		onLoad(e) {
			if (e.id) {
				this.id = e.id;
			}
			if (e.rate) {
				this.$set(this.valiFormData, 'rate', e.rate)
			}
		},
		methods: {
			submit(ref) {
				this.$refs[ref].validate().then(res => {
					this.$store.commit("update_detectionData_rate", this.valiFormData.rate);
					this.cancel()
				}).catch(err => {
					console.log('err', err);
				})
			},
			cancel() {
				uni.navigateTo({
					url: '/pages/detection/detection-edit/detection-edit',
					animationType: 'slide-in-right',
					animationDuration: 200
				})
			}
		}
	}
</script>

<style lang="scss">
	.uni-edit-form {
		padding: 0 20rpx;
	}
</style>
