import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
    deleteObject,
    getDownloadURL,
    getMetadata,
    ref,
    uploadBytes,
} from "firebase/storage";
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
    const [imageInput, setImageInput] = useState(null);
    const [urlsBunch, setUrlsBunch] = useState(null);
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
    const [oldImgUrl, setOldImgUrl] = useState(null);
    console.log(id, "id from router");

    const eventRef = id ? doc(firestore, "events", id) : null;

    console.log("the eventref", eventRef);

    useEffect(() => {
        const fetchData = async () => {
            if (eventRef) {
                const docGet = await getDoc(eventRef);
                const eventData = docGet.data();
                setOldImgUrl(() => eventData.image);

                setOldInfo(() => ({
                    title: eventData.title,
                    about: eventData.about,
                    date: eventData.date,
                    image: eventData.image,
                    location: eventData.location,
                    interests: eventData.interests,
                    createdBy: eventData.CreatedBy,
                }));
            }
        };

        fetchData();
        updateDocument();
        // if (urlsBunch !== null) {
        //     // console.log(urlsBunch, "urlsBunch")
        //     updateDocument();
        // }
    }, [urlsBunch]);

    // useEffect(() => {
    //     if (urlsBunch !== null) {
    //         // console.log(urlsBunch, "urlsBunch")
    //         updateDocument();
    //     }
    // }, [urlsBunch]);

    const handleEditForm = async (e) => {
        e.preventDefault();

        const imgFile = e.target.image.files[0];

        if (imgFile !== undefined) {
            const storageRef = ref(storage, oldImgUrl);
            const metadata = await getMetadata(storageRef);
            const oldFileName = metadata.name;

            const deleteRef = ref(storage, `images/${user.uid}/${oldFileName}`);
            await deleteObject(deleteRef);

            setImageInput(() => imgFile);

            setNewInfo(() => ({
                title: e.target.title.value,
                about: e.target.about.value,
            }));

            const fileName = imgFile.name;
            const eventImageRef = ref(
                storage,
                `images/${user.uid}/${fileName}`
            );

            try {
                const snapshot = await uploadBytes(eventImageRef, imgFile);
                const url = await getDownloadURL(snapshot.ref);
                setUrlsBunch(() => url);
            } catch (error) {
                console.error("Error during upload:", error);
            }
        } else {
            setImageInput(() => "no image");
            setUrlsBunch(() => oldImgUrl);
        }
    };

    const updateDocument = async () => {
        const updatedInfo = {
            title: newInfo.title ? newInfo.title : oldInfo.title,
            about: newInfo.about ? newInfo.about : oldInfo.about,
            date: startDate
                ? startDate.toLocaleDateString("en-GB")
                : oldInfo.date,
            image: urlsBunch ? urlsBunch : oldInfo.image,
            location: loca ? loca : oldInfo.location,
            interests:
                selectedInterets.length !== 0
                    ? selectedInterets.map((interest) => interest.value)
                    : oldInfo.interests,
            createdBy: user.uid,
        };

        console.log("this is new info", updatedInfo);

        try {
            await updateDoc(eventRef, updatedInfo);
            console.log("updated................... ");
            router.push("/events");
        } catch (error) {
            console.error("Error updating document:", error);
        }
    };
    console.log("urlsBunch", urlsBunch);

    return (
        <div className='m-0 box-border bg-bgc-silver'>
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
                                <label htmlFor='title' className='form-input'>
                                    {t("editEvent.titleInput")}
                                </label>
                                <input
                                    type='text'
                                    name='title'
                                    id='title'
                                    className='shadow-sm bg-white border border-bgc-Charcoal text-txtc-DarkCharcoal sm:text-sm rounded-lg focus:ring-txtc-DarkCharcoal focus:border-txtc-DarkCharcoal block w-full p-2.5'
                                    placeholder='Green tech”'
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
                                <label htmlFor='image' className='form-input'>
                                    {t("editEvent.images")}
                                </label>
                                <input
                                    type='file'
                                    name='image'
                                    id='image'
                                    className='shadow-sm bg-white border border-bgc-Charcoal text-txtc-DarkCharcoal sm:text-sm rounded-lg focus:ring-txtc-DarkCharcoal focus:border-txtc-DarkCharcoal block w-full p-2.5'
                                    placeholder='provide an Image if possible ..'
                                    onChange={(e) => {
                                        setImageInput(() => e.target.files[0]);
                                    }}
                                />
                            </div>
                            <div className='col-span-6 sm:col-span-3'>
                                <label htmlFor='date' className='form-input'>
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
                                <label htmlFor='about' className='form-input'>
                                    {t("editEvent.about")}
                                </label>
                                <textarea
                                    id='about'
                                    rows='6'
                                    className='shadow-sm bg-white border border-bgc-Charcoal text-txtc-DarkCharcoal sm:text-sm rounded-lg focus:ring-txtc-DarkCharcoal focus:border-txtc-DarkCharcoal block w-full p-2.5'
                                    placeholder='e.g helping kids, coach..etc'
                                ></textarea>
                            </div>
                        </div>
                        <button
                            className='text-txtc-DarkCharcoal text-l font-Roboto bg-bgc-sunflower hover:bg-bgc-sunflower focus:ring-4 focus:ring-bgc-Charcoal font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                            type='submit'
                        >
                            {t("editEvent.save")}
                        </button>
                    </form>
                </div>
                <div className='p-6 border-t border-gray-200 rounded-b'></div>
            </div>
        </div>
    );
}

export default EditEvent;
