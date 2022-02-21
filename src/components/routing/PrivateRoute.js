// import React, { useContext } from 'react'
// import { Route } from 'react-router-dom'
// import { UiContext } from '../../context/UiContext'
// import Login from '../login/Login'
// import MineBeatLoader from '../components/Common/Loader/MineBeatLoader'
// function PrivateRoute({ component: Component, ...rest }) {
//   const { isAuthentificated } = useContext(AuthContext)
//   const token = localStorage.getItem('accessToken')
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         token && !isAuthentificated ? (
//           <MineBeatLoader />
//         ) : !isAuthentificated ? (
//           <Login showModal={true} setShowModal={() => console.log('connect')} />
//         ) : (
//           <Component {...props} />
//         )
//       }
//     />
//   )
// }

// export default PrivateRoute