<template>
	<view class="input-box-card">
		<uni-card is-full :is-shadow="false">
			<view class="input-box">
				<picker class="pickerList" mode="multiSelector" :range="newProvinceDataList" range-key="text"
					:value="multiIndex" @change="pickerChange" @columnchange="pickerColumnchange">
					<view class="select-box">{{select}}</view>
				</picker>
				<view @click="clearCk">清空</view>
			</view>
		</uni-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oldpProvinceDataList: [],
				newProvinceDataList: [
					[],
					[],
					[]
				],
				multiIndex: [0, 0, 0],
				select: '请选择地区'
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			async init() {
				await this.getCity(0, 0)
				await this.getCity(1, this.newProvinceDataList[0][0].value)
				await this.getCity(2, this.newProvinceDataList[1][0].value)
			},
			async getCity(index, pid) {
				const data = await this.$http.httpGet('/admin/location_opt/', {
					pid: pid
				})
				this.$set(this.newProvinceDataList, index, data)
			},
			pickerChange(e) {
				var _this = this
				_this.multiIndex = e.detail.value
				_this.select =
					_this.newProvinceDataList[0][_this.multiIndex[0]].text + " - " +
					_this.newProvinceDataList[1][_this.multiIndex[1]].text + " - " +
			  _this.newProvinceDataList[2][_this.multiIndex[2]].text
				const arr = [_this.newProvinceDataList[0][_this.multiIndex[0]].value,
					_this.newProvinceDataList[1][_this.multiIndex[1]].value,
					_this.newProvinceDataList[2][_this.multiIndex[2]].value
				]
				this.$emit('change', arr)
			},
			clearCk() {
				this.multiIndex = [0, 0, 0]
				this.select = '请选择地区'
				this.init()
				this.$emit('change', [])
			},
			async pickerColumnchange(e) {
				if (e.detail.column === 0) {
					this.multiIndex[0] = e.detail.value
					this.multiIndex[1] = 0
					this.multiIndex[2] = 0
					await this.getCity(1, this.newProvinceDataList[0][this.multiIndex[0]].value)
					await this.getCity(2, this.newProvinceDataList[1][0].value)
				}
				if (e.detail.column === 1) {
					this.multiIndex[1] = e.detail.value
					this.multiIndex[2] = 0
					await this.getCity(2, this.newProvinceDataList[1][e.detail.value].value)
				}
				if (e.detail.column === 2) {
					this.multiIndex[2] = e.detail.value
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.input-box-card {
		margin-bottom: 20px;
	}

	.input-box {
		display: flex;
		justify-content: space-between;
	}

	.select-box {
		width: calc(100vw - 100px);
	}
</style>
