"use client";
import { Button } from "@/shared/button";
import LoadingScreen from "@/shared/loadingscreen";
import buttonIcon from "@public/images/buttonicon.png";
import Deleteicon from "@public/images/deleteicon.png";
import Updateicon from "@public/images/updateicon.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import AddModal from "./components/AddModal";
import DeleteConfirmationModal from "./components/DeleteModal";
import UpdateModal from "./components/UpdateModal";
import { useAddItemForm } from "./hooks";

const Page: FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<any | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    errors,
    addItem,
    fetchItems,
    deleteItem,
    updateItem,
    isLoading,
    updateLoading,
    deleteLoading,
    addLoading,
    logout,
  } = useAddItemForm(setItems);

  useEffect(() => {
    fetchItems();
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
    }
  }, []);

  const onSubmit = async (data: any) => {
    await addItem(data);
    setOpenAddModal(false);
  };

  const handleUpdate = async (data: any) => {
    if (currentItem) {
      await updateItem(currentItem.id, data);
      setOpenUpdateModal(false);
    }
  };

  const openUpdateModalWithItem = (item: any) => {
    setCurrentItem(item);
    setOpenUpdateModal(true);
  };

  const openDeleteModalWithItem = (item: any) => {
    setCurrentItem(item);
    setOpenDeleteModal(true);
  };

  const handleDelete = async () => {
    if (currentItem) {
      await deleteItem(currentItem.id);
      setOpenDeleteModal(false);
    }
  };

  return (
    <div className="flex justify-center py-10 bg-[#f4f4f4] h-screen">
      {isLoading && <LoadingScreen />}
      <AddModal
        open={openAddModal}
        close={() => setOpenAddModal(false)}
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        addLoading={addLoading}
      />
      <UpdateModal
        open={openUpdateModal}
        close={() => setOpenUpdateModal(false)}
        existingData={currentItem || { text: "", priority: "" }}
        onSubmit={handleUpdate}
        updateLoading={updateLoading}
      />
      <DeleteConfirmationModal
        open={openDeleteModal}
        close={() => setOpenDeleteModal(false)}
        onConfirm={handleDelete}
        deleteLoading={deleteLoading}
      />
      <div className="bg-white w-[421px] rounded-[10px] pt-[70.17px] px-[23.39px] relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-3xl">To Do List</h1>
          <Button
            onClick={logout}
            className="!bg-pink !h-[40px] !w-[100px]"
            type="button"
          >
            Log out
          </Button>
        </div>
        <h2 className="font-semibold text-lg mt-[42.01px]">This Week</h2>
        <div className="mt-[27.29px]">
          <p className="font-medium text-pink">Monday, 12th May</p>
          {items?.map((item, idx) => (
            <div
              key={idx}
              className="bg-white shadow-xl px-[23.39px] py-[15px] mt-[14px] rounded-[12px] flex justify-between items-center"
            >
              <div>
                <p className="text-lg text-black">{item.text}</p>
                <div
                  className={`bg-pink100 py-[3.51px] px-[5.85px] mt-[9px] rounded-[5px] ${
                    item.priority === "Medium" ? "w-[59.86px]" : "w-[38.86px]"
                  }`}
                >
                  <p
                    className={`font-semibold text-xs ${
                      item.priority === "High"
                        ? "text-highColor"
                        : item.priority === "Medium"
                        ? "text-mediumColor"
                        : "text-black"
                    }`}
                  >
                    {item.priority}
                  </p>
                </div>
              </div>
              <div className="flex gap-x-[12px]">
                <div>
                  <Image
                    onClick={() => openUpdateModalWithItem(item)}
                    className="w-[19px] cursor-pointer"
                    src={Updateicon}
                    alt="Update"
                  />
                </div>
                <div>
                  <Image
                    onClick={() => openDeleteModalWithItem(item)}
                    className="w-[19px] cursor-pointer"
                    src={Deleteicon}
                    alt="Delete"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          onClick={() => setOpenAddModal(true)}
          className="absolute bottom-5 right-5 cursor-pointer"
        >
          <div className="bg-pink p-[18px] rounded-full w-[70.17px] h-[70.17px] flex justify-center items-center">
            <Image className="w-[27.77px]" src={buttonIcon} alt="Add" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
