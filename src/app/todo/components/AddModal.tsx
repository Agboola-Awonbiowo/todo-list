import { Button } from "@/shared/button";
import { Inputfield } from "@/shared/inputfield";
import Modal from "@/shared/Modal";
import React from "react";
import { useTodoManager } from "../hooks";

interface AddModalProps {
  open: boolean;
  close: () => void;
  register: ReturnType<typeof useTodoManager>["register"];
  errors: ReturnType<typeof useTodoManager>["errors"];
  onSubmit: (data: any) => Promise<void>;
  handleSubmit: ReturnType<typeof useTodoManager>["handleSubmit"];
  addLoading: boolean;
}

const AddModal = ({
  open,
  close,
  register,
  errors,
  onSubmit,
  addLoading,
  handleSubmit,
}: AddModalProps) => {
  return (
    <Modal isOpen={open} onClose={close}>
      <h2 className="text-lg">Add todo</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-[10px]">
        <div>
          <Inputfield
            type="text"
            placeholder="Type here"
            {...register("text")}
          />
          {errors.text && (
            <p className="text-darkRed text-xs mt-[5px]">
              {errors.text.message}
            </p>
          )}
        </div>
        <div className="mt-[20px]">
          <h2 className="font-semibold mb-[5px]">Priority</h2>
          {["High", "Medium", "Low"].map((priority) => (
            <div key={priority}>
              <label className="flex gap-x-[5px]">
                <input
                  type="radio"
                  value={priority}
                  {...register("priority")}
                />
                {priority}
              </label>
            </div>
          ))}
          {errors.priority && (
            <p className="text-darkRed text-xs mt-[5px]">
              {errors.priority.message}
            </p>
          )}
        </div>
        <Button
          isLoading={addLoading}
          disabled={addLoading}
          className="mt-[20px] !bg-pink"
          type="submit"
        >
          Add
        </Button>
      </form>
    </Modal>
  );
};

export default AddModal;
