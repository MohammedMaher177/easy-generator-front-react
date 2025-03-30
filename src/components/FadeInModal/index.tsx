import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Loading from '../Loading/Loading';

type Props = {
    show: boolean;
    onClose: () => void;
    onSubmit: () => void;
    loading?: boolean;
    children: React.JSX.Element;
};

export default function FadeInModal({ onClose, onSubmit, show, loading, children }: Props) {
    return (
        <Transition appear show={show} as={Fragment}>
            <Dialog as="div" className="relative z-10 right-0" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-40" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto pt-8 flex items-center justify-center">
                    <div className={`flex justify-center p-4 text-center`}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-x-4"
                            enterTo="opacity-100 translate-x-0"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-x-0"
                            leaveTo="opacity-0 translate-x-4"
                        >
                            <Dialog.Panel className={`w-full max-w-fit transform overflow-hidden rounded-2xl text-white bg-white p-6 text-left align-middle shadow-xl transition-all`}>
                                {children}
                                {!!onSubmit && !!onClose && (
                                    <div className="p-5">
                                        <div className="mt-8 flex items-center justify-end">
                                            <button onClick={onClose} type="button" className="btn btn-outline-danger">
                                                Discard
                                            </button>
                                            {loading ? (
                                                <Loading />
                                            ) : (
                                                <button onClick={onSubmit} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                    Submit
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
