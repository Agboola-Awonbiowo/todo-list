import { Button } from "@/shared/button";
import { Inputfield } from "@/shared/inputfield";
import Modal from "@/shared/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const schema = z.object({
  text: z.string().min(1, { message: "Item description is required" }),
  priority: z.string().min(1, { message: "Priority is required" }),
});

type FormValues = z.infer<typeof schema>;

interface UpdateModalProps {
  open: boolean;
  close: () => void;
  existingData: FormValues;
  onSubmit: (data: FormValues) => Promise<void>;
  updateLoading: boolean;
}

const UpdateModal: FC<UpdateModalProps> = ({
  open,
  close,
  existingData,
  updateLoading,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: existingData,
  });

  useEffect(() => {
    reset(existingData);
  }, [open, existingData, reset]);

  return (
    <Modal isOpen={open} onClose={close}>
      <h2 className="text-lg">Update todo</h2>
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
          isLoading={updateLoading}
          disabled={updateLoading}
          className="mt-[20px]"
          type="submit"
        >
          Update
        </Button>
      </form>
    </Modal>
  );
};

export default UpdateModal;
