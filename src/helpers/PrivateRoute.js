import { Navigate, Outlet } from 'react-router-dom'
//import { useSelector } from 'react-redux';

const PrivateRoutes = () => {
    //const {userToken} = useSelector((state) => state.authUser);
    const userToken = localStorage.getItem('userToken')
    return (
        userToken ? <Outlet/> : <Navigate to='/login'/>
    )
}

export default PrivateRoutes