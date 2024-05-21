import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface ModalType {
  isOpen: any;
  handleModal: any;
  children: any;
  title?: any;
  modalWidth?:
    | 'max-w-2xl'
    | 'max-w-4xl'
    | 'max-w-5xl'
    | 'max-w-7xl'
    | 'max-w-8xl'
    | 'max-w-full';
}

export function Modal({
  title,
  isOpen,
  handleModal,
  children,
  modalWidth,
}: ModalType) {
  function closeModal() {
    handleModal(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[1000]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`xl:pb-1shadow-xl z-[100] w-full ${modalWidth} transform overflow-hidden rounded-md border border-stroke bg-white pb-2.5 shadow-default transition-all`}
                >
                  {title && (
                    <Dialog.Title
                      as="h3"
                      className="bg-gray-2  px-5 py-5 text-left text-lg  font-medium leading-6  text-black dark:bg-meta-4 sm:px-7.5 "
                    >
                      {title}
                    </Dialog.Title>
                  )}
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
