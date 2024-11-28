import React from 'react'
import "../componentsStyle/Footer.css"
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";

function Footer() {
    const thisYear = new Date().getFullYear();
    return (
        <div className='footerMain'>
            <div className='socialIcons'>
                <a target='_blank' href="https://www.instagram.com/bnbworksagency/">
                    <FaInstagram className='social' />
                </a>
                <a target='_blank' href="#">
                    <FaLinkedin className='social' />
                </a>
                <a target='_blank' href="#">
                    <FaFacebookSquare className='social' />
                </a>
            </div>
            <div className='footer'>© B&B WORKS {thisYear}. ALL RIGHTS RESERVED.</div>

        </div>
    )
}

export default Footer