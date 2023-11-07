import { useTranslation } from "next-i18next";

function TermsAndConditions({ closeModal }) {
    const { t } = useTranslation("common");
    return (
        <div className='fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md'>
            <div className='bg-white text-black w-full md:w-1/2 rounded-lg p-4 max-h-[80vh] overflow-y-auto'>
                <div className='text-2xl font-bold mb-4'>{t("t&c.title")}</div>
                <div className='relative text-start'>
                    <div className='text-xl underline font-semibold'>
                        {t("t&c.t1")}
                    </div>
                    <div className='text-base'>{t("t&c.b1")}</div>
                    <div className='text-xl underline font-semibold'>
                        {t("t&c.t2")}
                    </div>
                    <div className='text-base'>{t("t&c.b2")}</div>
                    <div className='text-xl underline font-semibold'>
                        {t("t&c.t3")}
                    </div>
                    <div className='text-base'>{t("t&c.b3")}</div>
                    <div className='text-xl underline font-semibold'>
                        {t("t&c.t4")}
                    </div>
                    <div className='text-base'>{t("t&c.b4")}</div>
                    <div className='text-xl underline font-semibold'>
                        {t("t&c.t5")}
                    </div>
                    <div className='text-base'>{t("t&c.b5")}</div>
                    <div className='text-xl underline font-semibold'>
                        {t("t&c.t6")}
                    </div>
                    <div className='text-base'>{t("t&c.b6")}</div>
                    <div className='text-xl underline font-semibold'>
                        {t("t&c.t7")}
                    </div>
                    <div className='text-base'>{t("t&c.b7")}</div>
                    <div className='text-xl underline font-semibold'>
                        {t("t&c.t8")}
                    </div>
                    <div className='text-base'>{t("t&c.b8")}</div>
                    <div className='text-xl underline font-semibold'>
                        {t("t&c.t9")}
                    </div>
                    <div className='text-base'>{t("t&c.b9")}</div>
                    <div className='text-xl underline font-semibold'>
                        {t("t&c.t10")}
                    </div>
                    <div className='text-base'>{t("t&c.b10")}</div>
                </div>
                <button
                    onClick={() => closeModal(false)}
                    className='border-transparent bg-amber-500 hover:bg-green-500 focus:bg-green-700 rounded-lg px-4 py-2 mt-4'
                >
                    {t("t&c.button")}
                </button>
            </div>
        </div>
    );
}

export default TermsAndConditions;
