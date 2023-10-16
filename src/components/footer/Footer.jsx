import { useTranslation } from "next-i18next";
import React, { useState } from "react";

function Footer() {
    const [user, setUser] = useState(false);
    const { t } = useTranslation("common");
    return (
        <footer className='layout absolute lg:h-44 bottom-0 w-screen'>
            {/*logo*/}
            <div className='flex lg:absolute justify-center p-4'>Logo</div>
            {/* footer navigation */}
            <div className='md:flex lg:ml-9 md:justify-around align-middle justify-center items-center'>
                <div className='p-4'>
                    <div className=''>{t("About")}</div>
                </div>
                <div className='md:flex justify-around'>
                    <div className='p-4'>
                        {user ? t("Your Profile") : t("Sign Up")}
                    </div>
                </div>
                <div className='md:flex justify-around'>
                    <div className='p-4'>
                        {user ? t("Your Events") : t("Sign In")}
                    </div>
                </div>
                <div className='md:flex justify-around'>
                    <div className='p-4'>{t("Events")}</div>
                </div>
            </div>
            {/*companyname*/}
            <div className='flex justify-center bottom-0 bg-slate-300'>
                RE:Codede | DZ NEA FEW 2023 - Team Nine
            </div>
        </footer>
    );
}

export default Footer;
