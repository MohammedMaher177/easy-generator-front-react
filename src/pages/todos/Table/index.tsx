import { ITodo } from '@/util/interfaces';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { deleteRecord, updateRecord } from '@/store/slices/todos/slice';
import { resetErrors } from '@/store/slices/auth/slice';
import ToggleActive from '@/components/Btns/ToggleActive';
import Actions from '@/components/Actions';
import ActiveModal from '@/components/Modals/ActiveModal';
import DeleteModal from '@/components/Modals/DeleteModal';
import CustomModal from '@/components/CustomModal/CustomModal';
import TodosForm from '../Form';
import { formatedDate } from '@/util/util';

type Props = {
    data: ITodo[];
};

const titles = ['Title', 'Description', 'Category', 'Due Date', ''];

export default function TodosTable({ data }: Props) {
    const dispatch = useAppDispatch();
    const { success, loading } = useAppSelector(({ todos }) => todos.actions);

    const [toggleActive, setToggleActive] = useState<ITodo | null>(null);
    const [updated, setUpdated] = useState<Partial<ITodo> | null>(null);
    const [deleted, setDeleted] = useState<ITodo | null>(null);

    const closeModal = () => {
        setUpdated(null);
        setDeleted(null);
        setToggleActive(null);
        dispatch(resetErrors());
    };

    const handleUpdate = (record: ITodo) => {
        dispatch(updateRecord({ payload: record, id: updated?._id! }));
    };

    const handleDelete = () => {
        dispatch(deleteRecord(deleted?._id!));
    };

    const handleToggleActive = async () => {
        const updates = { id: toggleActive?._id!, data: { isActive: !toggleActive?.isActive } };
        dispatch(updateRecord({ id: updates.id, payload: updates.data }));
    };

    useEffect(() => {
        if (success) {
            setUpdated(null);
            setDeleted(null);
            setToggleActive(null);
        }
    }, [success]);

    return (
        <div>
            <div className="table-responsive mb-5 max-w-full ">
                <div className="w-full flex flex-col min-w-[900px] overflow-x-auto">
                    {/* Table Header */}
                    <div className="grid grid-cols-5 bg-gray-200 dark:bg-gray-800 p-3 font-semibold">
                        {titles.map((title) => (
                            <div key={title} className={`flex-1 text-left ${title === 'Title' || title === 'Description' ? 'col-sp/an-2' : ''}`}>
                                {title}
                            </div>
                        ))}
                    </div>

                    {/* Table Body */}
                    <div className="flex flex-col">
                        {data.map((item: ITodo, index: number) => (
                            <div
                                key={item._id}
                                className={`fl/ex grid grid-cols-5 p-3 items-center gap-4 border-b border-[#ebedf2] dark:border-[#191e3a] ${
                                    index % 2 === 0 ? 'bg-white dark:bg-[#191e3a]' : 'bg-[#f7f8fa] dark:bg-[#111827]'
                                }`}
                            >
                                {/* Name */}
                                <div className="flex-1 flex items-center col-sp/an-2">
                                    <span>{index + 1}- </span>
                                    <span className="text-xl ml-1.5 font-semibold hidden md:inline dark:text-white-light transition-all duration-300 text-nowrap text-ellipsis w-fit overflow-hidden">
                                        {item.title}
                                    </span>
                                </div>

                                {/* Email */}
                                <div className="flex-1 flex items-center justify-start col-sp/an-2">
                                    <span className="flex-1 text-left overflow-hidden whitespace-nowrap text-ellipsis">{item.description}</span>
                                </div>
                                {/* <div className="flex-1 text-left">{item.email}</div> */}

                                {/* Contact Number */}
                                <div className="flex-1 text-left">{item.category}</div>

                                {/* Contact Person */}
                                <div className="flex-1 text-left">{formatedDate(item?.dueDate!)}</div>

                                {/* Actions */}
                                <div className="flex-1 flex gap-2 p-3 text-left borde/r-b border-[#ebedf2] dark:border-[#191e3a]">
                                    <ToggleActive checked={!!item.isActive} onChange={() => setToggleActive(item)} />
                                    <Actions actions={['Edit', 'Delete']} onDelete={() => setDeleted(item)} onEdit={() => setUpdated(item)} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <ActiveModal loading={loading} isActive={!!toggleActive?.isActive} onClose={closeModal} onSubmit={handleToggleActive} name={toggleActive?.title!} show={!!toggleActive} />

            <DeleteModal loading={loading} onClose={closeModal} onSubmit={handleDelete} name={deleted?.title!} show={!!deleted} />

            <CustomModal show={!!updated} onClose={closeModal}>
                <TodosForm onCancel={closeModal} onSubmit={handleUpdate} updated={updated!} />
            </CustomModal>
        </div>
    );
}
