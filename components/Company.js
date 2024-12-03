import React from "react";
import Image from "next/image";
import "../componentsStyle/Company.css";
import GoogleADS from "../public/GoogleADS.webp";
import Meta from "../public/Meta.webp";
import Next from "../public/Next.webp";
import Shopify from "../public/Shopify.webp";
import ShopifyPlus from "../public/ShopifyPlus.webp";

function company() {
    return (
        <div className="companyPageMain">
            <div>
                <Image src={Shopify} alt="B&B_Shopify" />
            </div>
            <div>
                <Image src={GoogleADS} alt="B&B_Google ADS" />
            </div>
            <div>
                <Image src={Meta} alt="B&B_Meta" />
            </div>
            <div>
                <Image src={ShopifyPlus} alt="B&B_Shopify Plus" />
            </div>
            <div>
                <Image src={Next} alt="B&B_Next.js" />
            </div>
        </div>
    );
}

export default company;