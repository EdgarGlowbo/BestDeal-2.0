import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const useFetch = (q) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchDocs = async () => {
      const docSnapshot = await getDocs(q);      
      const data = []    
      docSnapshot.forEach(doc => {         
        data.push(doc);
      });
      setData(data);
    }
    fetchDocs();
  }, []);
  return { data };
} 
export default useFetch;