import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import {
    deleteObject,
    getDownloadURL,
    getMetadata,
    ref,
    uploadBytes,
} from "firebase/storage";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { MultiSelect } from "react-multi-select-component";

import "react-datepicker/dist/react-datepicker.css";

import { firestore, storage } from "@/lib/firebase/controller";

import { useUser } from "@/context/UserContext";

import LocaInput from "../reusableComponents/LocaInput";
import { interestList } from "../../lib/interestsList";

function EditEvent() {
    const { user, setUser } = useUser();

    const { t } = useTranslation("common");

    const [startDate, setStartDate] = useState(new Date());
    const [selectedInterets, setSelectedInterets] = useState([]);
    const [loca, setLoca] = useState(null);
    const router = useRouter();
    const { id } = router.query;

    const options = interestList.map((obj) => {
        return {
            label: `${obj.title}`,
            value: `${obj.title}`,
        };
    });

    const handleLocationSelect = (selectedLocation) => {
        setLoca(selectedLocation);
    };

    const [oldInfo, setOldInfo] = useState({});
    const [newInfo, setNewInfo] = useState({});

    const eventRef = id ? doc(firestore, "events", id) : null;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docGet = await getDoc(eventRef);
                setNewInfo(() => docGet.data());
                setOldInfo(() => docGet.data());
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, []);

    const handleEditForm = async (e) => {
        e.preventDefault();

        const imgFile = e.target.image.files[0];

        if (imgFile !== undefined && imgFile !== null) {
            try {
                const storageRef = ref(storage, oldInfo.image);
                const metadata = await getMetadata(storageRef);
                const oldFileName = metadata.name;
                const deleteRef = ref(
                    storage,
                    `images/${user.uid}/${oldFileName}`
                );
                await deleteObject(deleteRef);

                const fileName = imgFile.name;
                const eventImageRef = ref(
                    storage,
                    `images/${user.uid}/${fileName}`
                );

                const snapshot = await uploadBytes(eventImageRef, imgFile);

                const url = await getDownloadURL(snapshot.ref);

                setNewInfo((prev) => ({ ...prev, image: url }));
            } catch (error) {
                console.log("Error during upload:", error);
            }
        }

        if (loca !== null) setNewInfo((prev) => ({ ...prev, location: loca }));

        if (selectedInterets.length !== 0)
            setNewInfo((prev) => ({
                ...prev,
                interests: selectedInterets.map((inter) => inter.value),
            }));

        if (e.target.title.value !== "") {
            const title = e.target.title;
            setNewInfo((prev) => ({ ...prev, title: title.value }));
        }

        if (e.target.about.value !== "") {
            const about = e.target.about;
            setNewInfo((prev) => ({ ...prev, about: about.value }));
        }

        if (e.target.date.value !== null) {
            setNewInfo((prev) => ({
                ...prev,
                date: startDate.toLocaleDateString("en-GB"),
            }));
        }

        handleUpdate();
    };

    const handleUpdate = async () => {
        try {
            await updateDoc(eventRef, newInfo);
            router.push("/events");
        } catch (error) {
            console.log("Error updating document:", error);
        }
    };

    const handleCancel = async () => {
        try {
            await deleteDoc(eventRef);
            router.push("/events");
        } catch (error) {
            console.log("error deleting event:", error);
        }
    };

    return (
        <>
            <Head>
                <title> {t("indxEdtEvent.title")} </title>

                <meta
                    name='description'
                    content={t("indxEdtEvent.description")}
                />
                <meta name='keywords' content={t("indxEdtEvent.keywords")} />
            </Head>

            <div className='m-5 box-border bg-bgc-silver'>
                <div className='relative overflow-hidden w-full h-96'>
                    <Image
                        src='/images/publicSpeak.jpg'
                        alt='plant'
                        className='w-full h-auto'
                        width={1920}
                        height={1080}
                    />
                    <div className='absolute inset-0 flex flex-col items-center justify-center '>
                        <div className='bg-black bg-opacity-50 p-8'>
                            <Image
                                className=' mx-auto my-auto'
                                src='/images/HeroLogo.png'
                                alt='logo'
                                width={40}
                                height={60}
                            ></Image>
                            <h1 className='text-4xl font-bold text-center mb-2 font-Montserrat text-txtc-Ivory'>
                                {t("editEvent.title")}
                            </h1>
                            <p className='text-lg font-Lora text-center text-txtc-Ivory'>
                                {t("editEvent.intro")}
                            </p>
                        </div>
                    </div>
                </div>
                <div className='w-full border border-x-bgc-Charcoal bg-bgc-silver mx-auto'>
                    <div className='flex items-start justify-between p-5 border-b rounded-t'>
                        <h3 className='font-Montserrat text-txtc-DarkCharcoal text-2xl text-center font-semibold'>
                            {t("editEvent.subTitle")}
                        </h3>
                    </div>
                    <div className='p-6 space-y-6'>
                        <form
                            onSubmit={handleEditForm}
                            className='space-y-4 space-x-4 m-2 p-2'
                        >
                            <div className='grid grid-cols-6 gap-6'>
                                <div className='col-span-6 sm:col-span-3'>
                                    <label
                                        htmlFor='title'
                                        className='form-input'
                                    >
                                        {t("editEvent.titleInput")}
                                    </label>
                                    <input
                                        type='text'
                                        name='title'
                                        id='title'
                                        className='shadow-sm bg-white border border-bgc-Charcoal text-txtc-DarkCharcoal sm:text-sm rounded-lg focus:ring-txtc-DarkCharcoal focus:border-txtc-DarkCharcoal block w-full p-2.5'
                                    />
                                </div>
                                <div className='col-span-6 sm:col-span-3'>
                                    <label
                                        htmlFor='Interests'
                                        className='form-input'
                                    >
                                        {t("editEvent.interests")}
                                    </label>
                                    <MultiSelect
                                        options={options}
                                        value={selectedInterets}
                                        onChange={setSelectedInterets}
                                        labelledBy='Select'
                                        className='m-0 shadow-sm bg-white border border-bgc-Charcoal text-txtc-DarkCharcoal sm:text-sm rounded-lg focus:ring-txtc-DarkCharcoal focus:border-txtc-DarkCharcoal block w-full '
                                    />
                                </div>
                                <div className='col-span-6 sm:col-span-3'>
                                    <label
                                        htmlFor='location'
                                        className='form-input'
                                    >
                                        {t("editEvent.location")}
                                    </label>
                                    <LocaInput
                                        name='location'
                                        id='location'
                                        className='shadow-sm bg-white border border-bgc-Charcoal text-txtc-DarkCharcoal sm:text-sm rounded-lg focus:ring-txtc-DarkCharcoal focus:border-txtc-DarkCharcoal block w-full p-2.5'
                                        placeholder='Location'
                                        initialLocation={loca}
                                        onSelectLocation={handleLocationSelect}
                                    />
                                </div>
                                <div className='col-span-6 sm:col-span-3'>
                                    <label
                                        htmlFor='image'
                                        className='form-input'
                                    >
                                        {t("editEvent.images")}
                                    </label>
                                    <input
                                        type='file'
                                        name='image'
                                        id='image'
                                        className='shadow-sm bg-white border border-bgc-Charcoal text-txtc-DarkCharcoal sm:text-sm rounded-lg focus:ring-txtc-DarkCharcoal focus:border-txtc-DarkCharcoal block w-full p-2.5'
                                        placeholder='provide an Image if possible ..'
                                    />
                                </div>
                                <div className='col-span-6 sm:col-span-3'>
                                    <label
                                        htmlFor='date'
                                        className='form-input'
                                    >
                                        {t("editEvent.date")}
                                    </label>
                                    <DatePicker
                                        type='text'
                                        name='date'
                                        id='date'
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        dateFormat="dd MMM yyyy 'at' HH'h'mm"
                                        showTimeSelect
                                        timeFormat='p'
                                        showYearDropdown
                                        scrollableMonthYearDropdown
                                        className='shadow-xl bg-white border border-bgc-Charcoal text-txtc-DarkCharcoal sm:text-sm rounded-lg focus:ring-txtc-DarkCharcoal focus:border-txtc-DarkCharcoal block w-full p-2.5'
                                    />
                                </div>
                                <div className='col-span-full'>
                                    <label
                                        htmlFor='about'
                                        className='form-input'
                                    >
                                        {t("editEvent.about")}
                                    </label>
                                    <textarea
                                        id='about'
                                        rows='6'
                                        className='shadow-sm bg-white border border-bgc-Charcoal text-txtc-DarkCharcoal sm:text-sm rounded-lg focus:ring-txtc-DarkCharcoal focus:border-txtc-DarkCharcoal block w-full p-2.5'
                                        placeholder={oldInfo.about}
                                    ></textarea>
                                </div>
                            </div>
                            <button
                                className='text-txtc-DarkCharcoal text-l font-Roboto bg-bgc-ForestGreen hover:bg-bgc-ForestGreen focus:ring-4 focus:ring-bgc-Charcoal font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                                type='submit'
                            >
                                {t("editEvent.save")}
                            </button>
                            <button
                                className='text-txtc-DarkCharcoal text-l font-Roboto bg-bgc-sunflower hover:bg-bgc-sunflower focus:ring-4 focus:ring-bgc-Charcoal font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                                onClick={() => handleCancel()}
                            >
                                {t("editEvent.delete")}
                            </button>
                        </form>
                    </div>
                    <div className='p-6 border-t border-gray-200 rounded-b'></div>
                </div>
            </div>
        </>
    );
}

export default EditEvent;
