import {
    getStorage,
    ref,
    listAll,
    getMetadata,
  } from "firebase/storage";
  
  const getTotalStorageSize = async () => {
    const storage = getStorage();
    const listRef = ref(storage, "");
  
    try {
      const { items } = await listAll(listRef);
  
      let totalSize = 0;
  
      for (const itemRef of items) {
        const metadata = await getMetadata(itemRef);
        totalSize += metadata.size;
      }
  
      const totalSizeInMB = totalSize / (1024 * 1024);
  
      return totalSizeInMB;
    } catch (error) {
      console.error("Error getting total storage size:", error.message);
      throw error;
    }
  };
  
  export { getTotalStorageSize };