import React, { Suspense } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import FlashMessage from "../components/UI/FlashMessage/FlashMessage"
import FrontPage from "../components/FrontPage/FrontPage"
import NoPageFound from "../components/NoPageFound/NoPageFound"
import ResetPassword from "../components/Register/ResetPassword"
import ChangePassword from "../components/Register/ChangePassword"
import EditProfile from "../components/Profile/EditProfile"
import { StateContext, DispatchContext } from "../Context"
import Footer from "../components/Footer/Footer"
import { loggedInUser } from "../AccessToken"
import { useImmerReducer } from "use-immer"
import Spinner from "../components/UI/Spinner/Spinner"
const TaxBizList = React.lazy(() => import("../components/Business/TaxBizList/TaxBizList"))
const Profile = React.lazy(() => import("../components/Profile/Profile"))
const BuzSinglePage = React.lazy(() => import("../components/Business/BuzSinglePage/BuzSinglePage"))
const SearchResultPage = React.lazy(() => import("../components/Search/SearchResultPage/SearchResultPage"))
const AdminMain = React.lazy(() => import("../components/Admin/AdminMain"))
const Newbuz = React.lazy(() => import("../components/Business/NewBuz/Newbuz"))
const Editbuz = React.lazy(() => import("../components/Business/NewBuz/Editbuz"))
const Register = React.lazy(() => import("../components/Register/Register"))
const Login = React.lazy(() => import("../components/Register/Login"))
const AdvancedSearch = React.lazy(() => import("../components/Search/AdvancedSearch/AdvancedSearch"))

const AppRouter = () => {
  const initialState = {
    flash: {
      messages: [],
      type: "success"
    },
    user: loggedInUser()
  }

  const ourReducer = (draft, action) => {
    switch (action.type) {
      case "login":
        draft.user = action.value
        return
      case "logout":
        draft.user.userId = null
        draft.user.type = null
        return
      case "flashMessage":
        draft.flash.messages.push(action.value.message)
        draft.flash.type = action.value.type
        return
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessage messages={state.flash.messages} type={state.flash.type} />
          <Suspense fallback={<Spinner />}>
            <Switch>
              <Route path="/" component={FrontPage} exact={true} />
              <Route path="/map" component={AdvancedSearch} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/resetPassword" component={ResetPassword} />
              <Route path="/changePassword/:id" component={ChangePassword} />
              <Route path="/profile/edit/:id" component={EditProfile} />
              <Route path="/profile/:id/:tab?" component={Profile} />
              <Route path="/business/create" component={Newbuz} />
              <Route path="/business/edit/:id" render={props => <Editbuz {...props} />} />
              <Route path="/business/:id" component={BuzSinglePage} />
              <Route path="/tax/:type/:tax/:subTax?" component={TaxBizList} />
              <Route path="/search" component={SearchResultPage} />
              // admin
              {state.user.type == "ADMIN" && <Route path="/admin/:tab?" component={AdminMain} />}
              <Route component={NoPageFound} />
            </Switch>
          </Suspense>
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export default AppRouter
