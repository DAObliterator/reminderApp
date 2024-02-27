 //authentication middleware that checks if the user is Authenticated everytime any api endpoint is hit with a request 
export const checkAuthentication = ( sessionObject ) => {

    if ( sessionObject.isAuthenticated ) {
        return true
    } else {
        false
    }

}