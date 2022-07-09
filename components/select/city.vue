<template>
	<view class="input-box">
		<picker class="pickerList" mode="multiSelector" :range="newProvinceDataList" range-key="text"
			:value="multiIndex" @change="pickerChange" @columnchange="pickerColumnchange">
			<view class="select-box">{{select}}</view>
		</picker>
		<uni-icons class="input-uni-icon" type="clear" size="18" color="#fff" @click="clearCk" />
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
	.input-box {
		width: 100%;
		display: flex;
		position: relative;
		align-items: center;
		uni-picker{
			width: 100%;
			background: rgba(255, 255, 255, .5);
			border-radius: 20px;
			height: 30px;
			text-align: center;
			line-height: 30px;
		}
		.uni-icons{
			position: absolute;
			top: 12px;
			right: 10px;
		}
	}
</style>
