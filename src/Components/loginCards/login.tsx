import React, { useState } from "react";
import CardsDemo from '../cardsDemo/cardsDemo'

const Login = () => {

    interface loginDataProps {
        name?: string,
        username: string,
        password: string
    }
    const [cardsPage, setCardsPage] = useState<boolean>(false)
    const [loginData, setLoginData] = useState<loginDataProps>({
        name: 'Imran Basha',
        username: 'imran',
        password: '123'
    })

    const [inputLogin, setInputLogin] = useState<loginDataProps>({
        username: '',
        password: ''
    })

    const onChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputLogin({ ...inputLogin, [name]: value })
    }
    const onSubmitEvent = (e: React.FormEvent<HTMLButtonElement | HTMLFormElement>) => {
        e.preventDefault()
        setCardsPage(true)
        // if(loginData.username == inputLogin.username){
        //     if(loginData.password == inputLogin.password){
        //         setCardsPage(true)
        //         alert('Login Success')
        //     }
        // }
    }
    if (cardsPage) {
        return <CardsDemo loginDetails={loginData} />
    }
    return (
        <div>
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmitEvent(e)}>
            <div>
                <label>Username : </label>
                <input type="text" value={inputLogin.username} placeholder="Username" name="username" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>onChangeEvent(e)} />
            </div>
            <div>
                <label>Password : </label>
                <input type="text" value={inputLogin.password} placeholder="Password" name="password" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>onChangeEvent(e)} />
            </div>
            <div>
                <button type="submit" onSubmit={(e: React.FormEvent<HTMLButtonElement>)=>onSubmitEvent(e)}>Submit</button>
            </div>
            </form>
        </div>
    )
}

export default Login;