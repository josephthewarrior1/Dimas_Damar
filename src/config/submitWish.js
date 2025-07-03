import { ref, push } from "firebase/database";
import { db } from "./firebaseConfig";

export const submitWish = async ({ name, hadir, wish }) => {
  try {
    const wishRef = ref(db, "wishList");
    await push(wishRef, {
      name,
      hadir,
      wish,
      createdAt: Date.now()
    });
  } catch (err) {
    console.error("Gagal simpan ke Firebase:", err);
  }
};
