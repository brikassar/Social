import React from 'react'
import {Navigate} from 'react-router-dom'
import {connect} from 'react-redux'
import {AppStateType} from "../../Redux/reduxStore";



let mapStateToPropsForRedirect = (state: AppStateType) => {
  return {
    isAuth: state.auth.isAuth
  } // as MapPropsType // работает и без этого
}

type MapPropsType = { isAuth: boolean }

type DispatchPropsType = {}

// WCP это - WrappedComponentProps

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {

  const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    let {isAuth, ...restProps} = props


    if (!isAuth) {

      return <Navigate to ='/login'/>
    }

    // @ts-ignore
    // Fix it Later
    return <WrappedComponent {...restProps as WCP}/>
  }

  let ConnectedAuthRedirectComponent = connect<MapPropsType, DispatchPropsType, WCP, AppStateType>(
      mapStateToPropsForRedirect, {})
  (RedirectComponent)

  return ConnectedAuthRedirectComponent;
}