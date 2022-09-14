import Head from "next/head"
import React from "react"
import {BlitzLayout, Routes} from "@blitzjs/next"
import Link from "next/link"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({title, children}) => {
    return (
        <>
            <Head>
                <title>{title || "crypto-market"}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <header>
                <div className="collapse bg-dark" id="navbarHeader">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-8 col-md-7 py-4">
                                <h4 className="text-white">About</h4>
                                <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate excepturi impedit necessitatibus nulla quasi quidem tempora veritatis? Accusantium, alias autem, blanditiis deserunt dolor
                                    enim fuga fugit minima neque perspiciatis sit.</p>
                            </div>
                            <div className="col-sm-4 offset-md-1 py-4">
                                <h4 className="text-white">Contact</h4>
                                <ul className="list-unstyled">
                                    <li><a href="#" className="text-white">Follow on Twitter</a></li>
                                    <li><a href="#" className="text-white">Like on Facebook</a></li>
                                    <li><a href="#" className="text-white">Email me</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="navbar navbar-dark bg-dark shadow-sm">
                    <div className="container">
                        <Link href={Routes.Home()}>
                            <a className="navbar-brand d-flex align-items-center">
                                <strong>CryptoMarket</strong>
                            </a>
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </div>
            </header>

            {children}
        </>
    )
}

export default Layout
