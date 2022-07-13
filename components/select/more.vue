<template>
	<view class="select-more-box">
		<view class="name" @click="open">{{name}}</view>
		<uni-popup ref="popup" background-color="#fff" @change="change">
			<view class="popup-content">
				<view class="btn-list">
					<button class="mini-btn" type="default" size="mini" @click="cancal">取消</button>
					<button class="mini-btn" type="primary" size="mini" @click="save">确定</button>
				</view>
				<view class="uni-list">
					<checkbox-group @change="checkboxChange">
						<label class="uni-list-cell uni-list-cell-pd" v-for="item in list" :key="item.value">
							<view>
								<checkbox :value="item.value" :checked="value.indexOf(item.value) > -1" />
							</view>
							<view>{{item.text}}</view>
						</label>
					</checkbox-group>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: () => {
					return []
				}
			},
			value: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		data() {
			return {
				id: '',
				form: {
					id: '',
					account: '',
					name: '',
					point: [],
					role: []
				},
				rules: {},
				pointList: [],
				roleList: [],
				newValue: [],
				name: '请选择'
			}
		},
		watch: {
			value () {
				let arr = []
				this.value.forEach(item => {
					for (let i in this.list) {
						if (this.list[i].value === item) {
							arr.push(this.list[i].text)
						}
					}
				})
				arr.length === 0 ? this	.name = '请选择' : this.name = arr.join(',')
			},
		},
		methods: {
			open() {
				this.newValue = this.value
				this.$refs.popup.open('bottom')
			},
			change(e) {
				console.log(e)
			},
			checkboxChange(e) {
				this.newValue = e.detail.value
			},
			cancal() {
				this.$emit('change', this.value)
				this.$refs.popup.close()
			},
			save() {
				this.$emit('change', this.newValue)
				this.$refs.popup.close()
			}
		}
	}
</script>

<style lang="scss">
	.select-more-box {
		border: 1px solid #F0F0F0;
		height: 36px;
		line-height:36px;
		padding: 0 10px;
		.popup-content {
			height: 50vh;
		}
	}
</style>
<style lang="scss" scoped>
	.name {
		width: 100%;
		overflow: hidden; //超出的文本隐藏
		text-overflow: ellipsis; //溢出用省略号显示
		white-space: nowrap; //溢出则不换行
	}
	.select-more-box {
		.btn-list {
			padding: 15px 15px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: relative;
			&:after {
				position: absolute;
				z-index: 3;
				right: 0;
				bottom: 0;
				left: 0;
				height: 1px;
				content: '';
				-webkit-transform: scaleY(0.5);
				transform: scaleY(0.5);
				background-color: #c8c7cc;
			}

			.mini-btn {
				margin: 0;
			}
		}
		.uni-list{
			overflow: auto;
			height: calc(100% - 60px);
			&:after {
				height: 0;
			}
		}
	}
</style>
