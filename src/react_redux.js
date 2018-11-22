// react-redux
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from './my_redux'
// connect 负责链接组件,给到redux里的数据放到组件的属性中
// 1.负责接受一个组件,把state里的一些数据放进去,返回一个组件
// 2. 数据变化的时候,能够通知组件更新

// 多层嵌套函数
// export function connect(mapStateToProps,mapDispatchToProps) {
//   return function (WrapComponent) {
//     return class ConnectComponent extends Component{
//
//     }
//   }
// }
export const connect = (mapStateToProps = state => state, mapDispatchToProps = {}) => (WrapComponent) => {
  return class ConnectComponent extends Component {
    static contextTypes = {
      store: PropTypes.object
    }

    constructor(props, context) {
      super(props, context)
      this.state = {
        props: {}
      }
    }

    componentDidMount() {
      const {store} = this.context
      this.update()
      // 数据变化时触发方法
      store.subscribe(() => this.update())
    }

    update() {
      // 获取mapStateToProps和mapDispatchToProps 放入this.props里
      const {store} = this.context //从全局的Provider组件中获取的store
      const stateProps = mapStateToProps(store.getState()) // 获取store

      // 触发action的方法不能直接给,需要store.dispatch才有用
      // 如: addGun = ()=>store.dispatch(addGun())
      const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch)
      this.setState({
        props: {
          ...this.state.props,
          ...stateProps,
          ...dispatchProps
        }
      })
    }

    render() {
      return <WrapComponent {...this.state.props}></WrapComponent>
    }
  }
}

// Provider , 把store放到context里,所有的子元素可以直接取到store
export class Provider extends Component {
  static ChildContextTypes = {
    store: PropTypes.object
  }

  getChildContext() {
    return {store: this.store}
  }

  constructor(props, context) {
    super(props, context)
    this.store = props.store
  }

  render() {
    // 返回所有的子组件
    return this.props.children
  }
}
