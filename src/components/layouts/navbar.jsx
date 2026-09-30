import React from 'react';
import Styles from "./_navbar.module.css";
import { Link } from 'react-router-dom';
import AuthNav from './AuthNav'
import AnonUser from './AnonUser';
import { useAuth } from '../../hooks/FetchUser';

const Navbar = () => {
    const {user} = useAuth();

  return (
    <section id={Styles.navbar}>
        <article className={Styles.container}>
            <aside className={Styles.logoBlock}>
                <a href='#'>Lets-Shop</a>
            </aside>
            <aside className={Styles.menuBlock}>
               <nav>
                <ul>
                    {
                        user ? <AuthNav /> : <AnonUser /> 
                    }
                   
                </ul>
               </nav>
            </aside>
        </article>
    </section>
  )
}

export default Navbar;