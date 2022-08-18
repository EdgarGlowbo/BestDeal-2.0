import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const useFetch = (q) => {
  const [data, setData] = useState(null);
  const [mats, setMats] = useState(null);
  useEffect(() => {    
    const fetchDocs = async () => {
      const data = {};
      const matsSet = new Set();      
      const docSnapshot = await getDocs(q);                    
      docSnapshot.forEach(item => {                        
        const itemData = item.data();        
        Object.assign(data, {[item.id]: {...itemData, id: item.id}});        
        if (itemData.recipe) { 
          Object.keys(itemData.recipe).forEach(mat => matsSet.add(mat));          
        }
      });    
      const mats = Array.from(matsSet);    
      setMats(mats);
      setData(data);
    }
    fetchDocs();
  }, []);
  return { data, setData, mats };
} 
export default useFetch;