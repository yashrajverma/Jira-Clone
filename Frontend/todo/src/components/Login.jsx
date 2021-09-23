import React from 'react'
import illustration from '../Assets/img/Group.png'
import LoginRight from './LoginRight'

const Login = () => {
    return (
        <>
            <div className="container-fluid">
                <div>
                    <div className="row my-5">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mx-auto my-auto text-center">
                            <div className="container my-auto">
                                <img src={illustration} className="img-fluid img-responsive " alt="Login Png" />
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mx-auto my-5">
                            <LoginRight />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
