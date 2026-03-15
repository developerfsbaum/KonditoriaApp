import React from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, logoutManager } from "../user/userSlice";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconButton } from '@mui/material';
import './NavBar.css';
import CartSummary from "../order/cartSummary";

const NavBar = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const manager = useSelector((state) => state.user.manager);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(logoutManager());
        localStorage.removeItem("currentUser");
        localStorage.removeItem("manager");
        navigate("/login");
    };

    const handleCartClick = () => {
        console.log("🛒 פתיחת סל (בקרוב)");
    };

    return (
        <>
            <ul>
                <li><Link to="home">דף הבית</Link></li>

                {(!currentUser && !manager) && (
                    <>
                        <li><Link to="/login">התחברות</Link></li>
                        <li><Link to="/signUp">הרשמה</Link></li>
                    </>
                )}

                {currentUser && (
                    <>
                        <li><Link to="productList">המוצרים</Link></li>
                        <li><Link to="myOrder">ההזמנות שלי</Link></li>
                        <li><Link to="cart">הסל שלי</Link></li>
                    </>
                )}

                {manager && (
                    <>
                        <li><Link to="productList">רשימת מוצרים</Link></li>
                        <li><Link to="addProduct">הוספת מוצר</Link></li>
                        <li><Link to="orders">צפייה בהזמנות</Link></li>
                        <li><Link to="users">צפייה במשתמשים</Link></li>
                    </>
                )}

                {(currentUser || manager) && (
                    <li><button onClick={handleLogout}>יציאה</button></li>
                )}
            </ul>

           
           
        </>
    );
};

export default NavBar;
