import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Loading from "../Loading/Loading";
import IconOpenfull from "../Icon/IconOpenfull";

type Props = {
  show: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  children: React.ReactNode;
  loading?: boolean;
};

export default function CustomModal({
  show,
  onClose,
  onSubmit,
  children,
  loading,
}: Props) {
  const [fullScreen, setFullScreen] = useState<boolean>(false);

  useEffect(() => {
    if (show) {
      setFullScreen(false);
    }
  }, [show]);
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

        <div className="fixed inset-0 overflow-y-auto pt-8">
          <div className={`flex min-h-full justify-end p-4 text-center`}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-x-4"
              enterTo="opacity-100 translate-x-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 translate-x-4"
            >
              <Dialog.Panel
                className={`${
                  fullScreen ? "w-[90%] " : "max-w-md"
                } transform overflow-hidden rounded-2xl pb-[8rem] text-white bg-white p-6 text-left align-middle shadow-xl transition-all`}
              >
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setFullScreen(!fullScreen)}
                  >
                    <IconOpenfull
                      className={`text-violet-700 rotate-90 ${
                        fullScreen ? "w-7 h-7" : "h-5 w-5"
                      } transition-transform`}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className=" text-violet-700 text-xl"
                  >
                    ×
                  </button>
                </div>
                {children}

                <div className="p-5">
                  <div className="mt-8 flex items-center justify-end">
                    {/* {!!onClose && (
                      <button
                        onClick={onClose}
                        type="button"
                        className="btn btn-outline-danger"
                      >
                        Discard
                      </button>
                    )} */}
                    {!!onSubmit ? (
                      loading ? (
                        <Loading />
                      ) : (
                        <button
                          onClick={onSubmit}
                          type="button"
                          className="btn btn-primary ltr:ml-4 rtl:mr-4"
                        >
                          Submit
                        </button>
                      )
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
