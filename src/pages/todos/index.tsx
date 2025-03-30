import CustomModal from "@/components/CustomModal/CustomModal";
import Header from "@/components/Header";
import Loading from "@/components/Loading/Loading";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  createRecord,
  fetchRecords,
  generateRandomTasks as generateRandomTasksDispatch,
} from "@/store/slices/todos/slice";
import { ITodo } from "@/util/interfaces";
import { useEffect, useState } from "react";
import TodosTable from "./Table";
import Form from "./Form";
import Pagination from "@/components/Pagination";

type Props = {};

let searchTimeout: NodeJS.Timeout;

export default function Todos({}: Props) {
  const [tableData, setTableData] = useState<ITodo[]>([]);
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [filterModal, setFilterModal] = useState<boolean>(false);

  const { data, pagination } = useAppSelector(({ todos }) => todos);
  const { loading } = useAppSelector(({ todos }) => todos.list);
  const { success } = useAppSelector(({ todos }) => todos.actions);

  const dispatch = useAppDispatch();

  const handleSubmit = (value: string) => {
    list(1, `title=${value}`);
  };

  const onPageChange = (page: number) => {
    list(page);
  };

  const list = async (page: number = 1, query: string = "") => {
    dispatch(fetchRecords({ page, query }));
  };

  const hanldeSearchChange = (value: string) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      list(1, `title=${value}`);
    }, 1000);
  };

  const handlCreate = (record: ITodo) => {
    dispatch(createRecord(record));
  };

  const closeModal = () => {
    setCreateModal(false);
    setFilterModal(false);
  };

  const generateRandomTAsks = async () => {
    dispatch(generateRandomTasksDispatch());
  };

  useEffect(() => {
    list();
  }, []);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  useEffect(() => {
    if (success) {
      closeModal();
    }
  }, [success]);

  return (
    <div>
      <Header
        BTNs={[
          { label: "Generate Random Tasks", onClick: generateRandomTAsks },
        ]}
        lable="TODO List"
        handleSubmit={handleSubmit}
        hanldeSearchChange={hanldeSearchChange}
        handleRefresh={list}
        handleOpenCreate={() => setCreateModal(true)}
      />

      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <Loading />
        </div>
      ) : (
        <TodosTable data={tableData} />
      )}

      <Pagination onPageChange={onPageChange} pagination={pagination} />

      <CustomModal show={createModal} onClose={closeModal}>
        <Form onSubmit={handlCreate} onCancel={closeModal} />
      </CustomModal>

      <CustomModal show={filterModal} onClose={closeModal}>
        <h1>Supplier Filter</h1>
      </CustomModal>
    </div>
  );
}
