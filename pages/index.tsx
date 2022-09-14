import {Suspense} from "react"
import Link from "next/link"
import Layout from "app/core/layouts/Layout"
import {useCurrentUser} from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import {useMutation} from "@blitzjs/rpc"
import {BlitzPage, Routes} from "@blitzjs/next"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className="btn btn-primary btn-sm"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div className={"mt-2"}>
          User id: <code>{currentUser.id}</code>
          <br/>
          User e-mail: <code>{currentUser.email}</code>
          <br/>
          User role: <code>{currentUser.role}</code>
          <br/>
          <br/>
          <Link href={Routes.TradesPage()}>
            <button className={"btn btn-primary me-3"}>Market</button>
          </Link>
          <Link href={Routes.SpotPage()}>
            <button className={"btn btn-primary me-3"}>Spot</button>
          </Link>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <a className="btn btn-primary me-3">
            <strong>Sign Up</strong>
          </a>
        </Link>

        <Link href={Routes.LoginPage()}>
          <a className="btn btn-primary me-3">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <Layout title="Home">
      <div className="container">
        <main>
          <div className="buttons" style={{marginTop: "1rem", marginBottom: "1rem"}}>
            <Suspense fallback="Loading...">
              <UserInfo/>
            </Suspense>
          </div>
        </main>
      </div>
    </Layout>
  )
}

export default Home
