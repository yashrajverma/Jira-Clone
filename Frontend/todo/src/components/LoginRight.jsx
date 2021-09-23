import React, { useState } from 'react'
import styles from '../Assets/css/loginRight.module.css'
import { BASE_URL } from '../env';
const LoginRight = () => {
    const [activeLogin, setActiveLogin] = useState(true);
    const [activeSignUp, setActiveSignUp] = useState(false);
    const [LoginEmail, setLoginEmail] = useState("");
    const [LoginPassword, setLoginPassword] = useState("");
    const [LoginEmailError, setLoginEmailError] = useState(false);
    const [LoginPasswordError, setLoginPasswordError] = useState(false);
    const [SignUpEmail, setSignUpEmail] = useState("");
    const [SignUpPassword, setSignUpPassword] = useState("");
    const [SignUpName, setSignUpName] = useState("");
    const [SignUpEmailError, setSignUpEmailError] = useState(false);
    const [SignUpPasswordError, setSignUpPasswordError] = useState(false);
    const [SignUpNameError, setSignUpNameError] = useState(false);
    const [LoginError, setLoginError] = useState(false)
    const [LoginErrorMsg, setLoginErrorMsg] = useState("")
    const [SignUpError, setSignUpError] = useState(false)
    const [SignUpErrorMsg, setSignUpErrorMsg] = useState("")
    const [LoginSuccess, setLoginSuccess] = useState(false)
    const [LoginSuccessMsg, setLoginSuccessMsg] = useState("")
    const [SignUpSuccess, setSignUpSuccess] = useState(false)
    const [SignUpSuccessMsg, setSignUpSuccessMsg] = useState("")
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    async function onLogin() {
        if (validateEmail(LoginEmail)) {
            if (LoginPassword != "") {
                setLoginEmailError(false)
                setLoginPasswordError(false)

                await fetch(BASE_URL + "/signIn", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: LoginEmail, password: LoginPassword })
                }).then(res => res.json()).then((response) => {
                    if (response.error) {
                        setLoginError(true);
                        setLoginErrorMsg(response.error)
                    }
                    if (response.message) {
                        setLoginSuccess(true)
                        setLoginSuccessMsg(response.message)
                    }
                    console.log(response);
                })
            } else {
                setLoginPasswordError(!LoginPasswordError)
            }
        } else {
            setLoginEmailError(!LoginEmailError)
        }
    }
    async function onSignUp() {
        if (validateEmail(SignUpEmail)) {
            if (SignUpPassword !== "" || SignUpName !== "") {
                setSignUpEmailError(false)
                setSignUpPasswordError(false)
                setSignUpNameError(false)

                await fetch(BASE_URL + "/signUp", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: SignUpEmail, password: SignUpPassword })
                }).then(res => res.json()).then((response) => {
                    if (response.error) {
                        setSignUpError(true);
                        setSignUpErrorMsg(response.error)
                    }
                    if (response.message) {
                        setSignUpSuccess(true)
                        setSignUpSuccessMsg(response.message)
                    }
                    console.log(response);
                })
            } else {
                setSignUpPasswordError(!SignUpPasswordError)
                setSignUpNameError(!SignUpNameError)
            }
        } else {
            setSignUpEmailError(!SignUpEmailError)
        }
    }

    return (
        <div className={`${styles.main_card}`}>
            <div className={`${styles.switch}`}>
                <h4 id="login_switch" className={activeLogin ? styles.active : styles.login_switch} onClick={() => { setActiveLogin(!activeLogin); setActiveSignUp(!activeSignUp) }}>LogIn<p><span className={styles.border_bottom}>_</span></p></h4>
                <h4 id="signup_switch" className={activeSignUp ? styles.active : styles.signup_switch} onClick={() => { setActiveLogin(!activeLogin); setActiveSignUp(!activeSignUp) }}>SignUp<p><span className={styles.border_bottom}>_</span></p></h4>
            </div>
            <hr style={{ width: "80%", margin: "2% auto" }} />

            <div className={styles.login}>
                {activeLogin ? <> <div className={styles.to_continue_div}>
                    <h5 className={styles.to_continue}>To Continue</h5>
                    <p className={styles.to_continue_p}>We Need Your Email & Password</p>
                </div> <div className="d-flex flex-column justify-content-around align-items-center">
                        <input required className={LoginEmailError ? styles.login_email_error : styles.login_email} name="email" id="email_login" placeholder="Email" type="email" onChange={(e) => { setLoginEmail(e.target.value) }} />
                        <input required className={LoginPasswordError ? styles.login_password_error : styles.login_password} name="password" id="password_login" placeholder="password" type="password" onChange={(e) => { setLoginPassword(e.target.value) }} />
                        {LoginError ? <p className="text-center text-danger">{LoginErrorMsg}</p> : ""}
                        {LoginSuccess ? <p className="text-center text-success">{LoginSuccessMsg}</p> : ""}
                        <button className={styles.login_btn} onClick={() => { onLogin() }}>Login</button>
                    </div> </> : ''}
            </div>
            {activeSignUp ? <div className={styles.signup}>
                <div className={styles.to_continue_div}>
                    <h5 className={styles.to_continue}>To Continue</h5>
                    <p className={styles.to_continue_p}>We Need Your Name, Email & Password</p>
                </div>
                <div className="d-flex flex-column justify-content-around align-items-center">
                    <input required className={styles.signup_name} placeholder="Name" type="text" id="name_signup" onChange={(e) => { setSignUpName(e.target.value) }} />
                    <input required className={styles.signup_email} name="email" id="email_signup" placeholder="Email" type="email" onChange={(e) => { setSignUpEmail(e.target.value) }} />
                    <input required className={styles.signup_password} name="password" id="password_signup" placeholder="password" type="password" onChange={(e) => { setSignUpPassword(e.target.value) }} />
                    {SignUpError ? <p className="text-center text-danger">{SignUpErrorMsg}</p> : ""}
                    {SignUpSuccess ? <p className="text-center text-success">{SignUpSuccessMsg}</p> : ""}
                    <button className={styles.signup_btn} onClick={() => { onSignUp() }}>SignUp</button>
                </div></div>
                : ""}

        </div>
    )
}

export default LoginRight
