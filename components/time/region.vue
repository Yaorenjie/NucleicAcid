<template>
	<view class="time-one">
		<view class="uni-title uni-common-pl">
			<view>工作时间段</view>
			<view @click="deleteCk">删除</view>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					起始时间
				</view>
				<view class="uni-list-cell-db">
					<picker mode="time" :value="times.startAt" start="09:01" end="21:01"  @change="bindTimeChange($event, 'start')">
						<view class="uni-input">{{times.startAt}}</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					结束时间
				</view>
				<view class="uni-list-cell-db">
					<picker mode="time" :value="times.endAt" start="09:01" end="21:01"  @change="bindTimeChange($event, 'end')">
						<view class="uni-input">{{times.endAt}}</view>
					</picker>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			times: {
				type: Object,
				default: () => {
					return {
						startAt: '',
						endAt: ''
					}
				}
			},
			index: {
				type: Number,
				default: 0
			}
		},
		methods: {
			deleteCk () {
				this.$emit('bindTimeDelete', this.index)
			},
			bindTimeChange (e, key) {
				this.times[key] = e.detail.value
				if (key === 'start') {
					this.$emit('bindTimeChange', {
						data: {
							startAt: e.detail.value + ':00',
							endAt: this.times.endAt
						},
						index: this.index
					})
				} else {
					this.$emit('bindTimeChange', {
						data: {
							startAt: this.times.startAt,
							endAt: e.detail.value + ':00'
						},
						index: this.index
					})
				}
			}
		}
	}
</script>

<style scoped>
	.uni-title{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
