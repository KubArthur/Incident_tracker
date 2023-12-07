import {
  getStorage,
  ref,
  listAll,
  deleteObject,
  getMetadata,
} from "firebase/storage";

const deletePhotos = async (date) => {
  const storage = getStorage();
  const listRef = ref(storage, "");

  try {
    const currentDate = new Date(date);

    const { items } = await listAll(listRef);
    console.log("currentDate: ", currentDate);
    for (const itemRef of items) {
      const metadata = await getMetadata(itemRef);

      const fileCreatedTime = new Date(metadata.timeCreated);

      if (fileCreatedTime < currentDate) {
        await deleteObject(itemRef);
      }
    }
  } catch (error) {
    console.error("Error deleting files:", error.message);
    throw error;
  }
};

export { deletePhotos };
