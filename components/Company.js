import React from "react";
import Image from "next/image";
import "../componentsStyle/Company.css";
import GoogleADS from "../public/GoogleADS.webp";
import ikas from "../public/ikas.webp";
import Meta from "../public/Meta.webp";
import Next from "../public/Next.webp";
import Shopify from "../public/Shopify.webp";
import ShopifyPlus from "../public/ShopifyPlus.webp";

function company() {
    return (
        <div className="companyPageMain">
            <div>
                <Image src={Shopify} alt="Shopify" />
            </div>
            <div>
                <Image src={ikas} alt="ikas" />
            </div>
            <div>
                <Image src={GoogleADS} alt="Google ADS" />
            </div>
            <div>
                <Image src={Meta} alt="Meta" />
            </div>
            <div>
                <Image src={ShopifyPlus} alt="Shopify Plus" />
            </div>
            <div>
                <Image src={Next} alt="Next.js" />
            </div>
        </div>
    );
}

export default company;