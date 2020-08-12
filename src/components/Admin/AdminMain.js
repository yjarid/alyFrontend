import React from "react"
import { Switch, Route } from "react-router-dom"
import { useQuery } from "@apollo/react-hooks"
import AdminTabs from "../Admin/AdminTabs/AdminTabs"
import AllReviews from "./AllReviews/AllReviews"
import Claim from "./Claim/Claim"
import Report from "./Report/Report"
import AddNewBus from "./AddNewBus/AddNewBus"
import AllBusiness from "./AllBusiness/AllBusiness"
import Location from "./Location/Location"
import Category from "./Category/Category"
import BusNotPub from "./BusNotPub/BusNotPub"
import { ME } from "../../qraphQl/userType"

export default function AdminMain(props) {
  const { data } = useQuery(ME, {
    onCompleted({ me }) {
      if (me.type != "ADMIN") {
        props.history.push("/")
      }
    }
  })

  return (
    <div>
      <AdminTabs tab={props.match.params.tab} />
      <div>
        <Switch>
          <Route path={`/admin`} render={() => <AllReviews />} exact={true} />
          <Route path={`/admin/claim`} render={() => <Claim />} />
          <Route path={`/admin/report`} render={() => <Report />} />
          <Route path={`/admin/all`} render={() => <AllBusiness />} />
          <Route path={`/admin/busNPub`} render={() => <BusNotPub />} />
          <Route path={`/admin/location`} render={() => <Location />} />
          <Route path={`/admin/category`} render={() => <Category />} />
          <Route path={`/admin/add`} render={() => <AddNewBus />} />
        </Switch>
      </div>
    </div>
  )
}
