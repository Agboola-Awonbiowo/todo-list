import { auth, db } from "@/app/firebaseConfig";
import { zodResolver } from "@hookform/resolvers/zod";
import { signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const schema = z.object({
  text: z.string().min(1, { message: "Item description is required" }),
  priority: z.string().min(1, { message: "Priority is required" }),
});

type FormValues = z.infer<typeof schema>;

export const useAddItemForm = (onItemsUpdated: (items: any[]) => void) => {
  const [error, setError] = useState<string | null>(null);
  const [addLoading, setAddLoading] = useState<boolean>(false);
  const [updateLoading, setUpdateLaoding] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      text: "",
      priority: "",
    },
  });

  const fetchItems = async () => {
    setIsloading(true);
    try {
      const q = query(collection(db, "todo"));
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      onItemsUpdated(items);
    } catch (e) {
      toast.error("Failed to fetch items.");
    } finally {
      setIsloading(false);
    }
  };

  const addItem = async (data: FormValues) => {
    setAddLoading(true);
    try {
      await addDoc(collection(db, "todo"), data);
      toast.success("Item added successfully!");
      reset();
      await fetchItems();
    } catch (e) {
      setError("Failed to add item. Please try again.");
      toast.error("Failed to add item. Please try again.");
    } finally {
      setAddLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    setDeleteLoading(true);
    try {
      await deleteDoc(doc(db, "todo", id));
      toast.success("Item deleted successfully!");
      await fetchItems();
    } catch (e) {
      toast.error("Failed to delete item. Please try again.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const updateItem = async (id: string, data: Partial<FormValues>) => {
    setUpdateLaoding(true);
    try {
      await updateDoc(doc(db, "todo", id), data);
      toast.success("Item updated successfully!");
      await fetchItems();
    } catch (e) {
      toast.error("Failed to update item. Please try again.");
    } finally {
      setUpdateLaoding(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("authToken");
      router.push("/auth/login");
    } catch (error) {
      toast.error(`Logout failed: ${error}`);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    error,
    addItem,
    fetchItems,
    deleteItem,
    updateItem,
    addLoading,
    updateLoading,
    deleteLoading,
    isLoading,
    logout
  };
};
