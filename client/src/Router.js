import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./views/Home";
// import PrivateRoute from "./components/PrivateRoute";
// import NavbarComponent from "./components/NavbarComponent";
// import Auth from "./utils/AuthService"

const Router = () => {
    return (
        <BrowserRouter>
            <Route path="/" component={Home}/>
            {/* <NavbarComponent wishList={wishList}/>
            <Route path="/register" component={CreateAccountForm}/>
            <Route path="/CreateBookForm" component={CreateBookForm}/>
            <Route path="/BooksByAuthor" component={BooksByAuthor}/>
            <Route path="/Cart" component={() => <Cart userEmail={Auth.getProfile().username}/>}/>
            <Route path="/CommentsForm" component={CommentsForm}/>
            <Route path="/BookDetailsForm" component={() => <BookDetailsForm userEmail={Auth.getProfile().username} wishListChange={handleWishListChange} shoppingCartChange={handleShoppingCartChange}></ BookDetailsForm>}/>
            <Route path="/MoreBookDetails" component={MoreBookDetails}/>
            <PrivateRoute path="/editProfile" component={() => <EditProfileComponent userEmail={Auth.getProfile().username}/>}/>
            <PrivateRoute path="/WishList" component={() => <WishList userEmail={Auth.getProfile().username}/>}/> */}
        </BrowserRouter>
    );
}

export default Router;