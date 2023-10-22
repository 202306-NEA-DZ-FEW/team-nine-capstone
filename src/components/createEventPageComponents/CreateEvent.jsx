import { addDoc } from "firebase/firestore";

import { eventsCollection } from "@/lib/firebase/controller";

function CreateEvent() {
    function handleCreateForm(e) {
        e.preventDefault();

        addDoc(eventsCollection, {
            title: e.target.title.value,
            about: e.target.about.value,
            date: e.target.date.value,
            image: e.target.image.value,
            location: e.target.location.value,
            category: e.target.category.value,
        }).then(() => {
            e.target.reset();
        });
    }

    return (
        <div className='bg-white border rounded-lg shadow relative m-10'>
            <div className='flex items-start justify-between p-5 border-b rounded-t '>
                <h3 className='text-2xl font-semibold'>Create Event</h3>
                <button
                    type='button'
                    className='text-gray-600 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
                    data-modal-toggle='Event-modal'
                >
                    <svg
                        className='w-5 h-5'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            fillRule='evenodd'
                            d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                            clipRule='evenodd'
                        ></path>
                    </svg>
                </button>
            </div>
            <div className='p-6 space-y-6'>
                <form onSubmit={handleCreateForm}>
                    <div className='grid grid-cols-6 gap-6'>
                        <div className='col-span-6 sm:col-span-3'>
                            <label
                                htmlFor='title'
                                className='text-sm font-medium text-gray-900 block mb-2'
                            >
                                Title
                            </label>
                            <input
                                type='text'
                                name='title'
                                id='title'
                                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5'
                                placeholder='Green tech”'
                                required
                            />
                        </div>
                        <div className='col-span-6 sm:col-span-3'>
                            <label
                                htmlFor='category'
                                className='text-sm font-medium text-gray-900 block mb-2'
                            >
                                Category
                            </label>
                            <input
                                type='text'
                                name='category'
                                id='category'
                                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5'
                                placeholder='e.g ..sustaibility'
                                required
                            />
                        </div>
                        <div className='col-span-6 sm:col-span-3'>
                            <label
                                htmlFor='location'
                                className='text-sm font-medium text-gray-900 block mb-2'
                            >
                                Location
                            </label>
                            <input
                                type='text'
                                name='location'
                                id='location'
                                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5'
                                placeholder='e.g Kandahar..'
                                required
                            />
                        </div>
                        <div className='col-span-6 sm:col-span-3'>
                            <label
                                htmlFor='image'
                                className='text-sm font-medium text-gray-900 block mb-2'
                            >
                                Images
                            </label>
                            <input
                                type='text'
                                name='image'
                                id='image'
                                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5'
                                placeholder='provide an Url e.g http:// ...'
                            />
                        </div>
                        <div className='col-span-6 sm:col-span-3'>
                            <label
                                htmlFor='date'
                                className='text-sm font-medium text-gray-900 block mb-2'
                            >
                                date
                            </label>
                            <input
                                type='text'
                                name='date'
                                id='date'
                                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5'
                                placeholder='e.g 1 october ..'
                                required
                            />
                        </div>
                        <div className='col-span-full'>
                            <label
                                htmlFor='about'
                                className='text-sm font-medium text-gray-900 block mb-2'
                            >
                                About
                            </label>
                            <textarea
                                id='about'
                                rows='6'
                                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4'
                                placeholder='e.g helping kids, coach..etc'
                            ></textarea>
                        </div>
                    </div>
                    <button
                        className='text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                        type='submit'
                    >
                        Save all
                    </button>
                </form>
            </div>
            <div className='p-6 border-t border-gray-200 rounded-b'></div>
        </div>
    );
}

export default CreateEvent;
