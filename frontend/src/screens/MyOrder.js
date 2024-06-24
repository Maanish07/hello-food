import React, { useContext } from 'react'
import Header from '../components/Header'
import { Footer } from '../components/Footer'
import UserContext from '../utils/UserContext'

export default function MyOrder() {
    const {Username} = useContext(UserContext);
    console.log({Username})
    return (
        <>
            <div > <Header /></div>
            <div>MyOrder</div>
            <h1>Username : {Username}</h1>
            <div><Footer/></div>
        </>

    )
}
