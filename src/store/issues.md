```javascript
import { mapState, mapGetters, mapMutations } from 'vuex';

computed: {
	// 原生
	hasLogin() {
			return this.$store.state.hasLogin
	},

	...mapGetters(['clientId']),
	...mapGetters({
		doneTodosAlias: 'doneTodos',
	}),

	...mapState(["hasLogin", "token"]),
	...mapState({
		userName: state => state.user.name,
		userAge: state => state.user.age,
		orderName: state => state.order.name
	}),
	...mapState({
			hasLogin(state) {
					return state.hasLogin
			},
	}),
	...mapState({
			hasLogin: (state) => {
					return state.hasLogin
			},
	}),
},

methods: {
		// 是吗?
		// ? vuex 在使用了 modules 模式时
		// ? mutation依然没有命名空间的概念 所以在定义 mutations 时要注意全局的唯一性
		// ? 否则后者会覆盖前者
		
		// magic style1
		...mapMutations([
			"setUserName",       
			'increment', // 將 `this.increment()` 映射為 `this.$store.commit('increment')`
		]),

		// magic style2
		...mapMutations({
			setUser(commit, userName) {
				commit("setUserName", userName)
			},
		}),

		...mapMutations({
      add: 'increment' // 將 `this.add()` 映射為 `this.$store.commit('increment')`
    })

		// 原生写法
		setUserName(userName) {
			this.$store.commit("setUserName", userName)
		},
}

```
