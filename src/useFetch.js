import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const useFetch = (q) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchDocs = async () => {
      const docSnapshot = await getDocs(q);      
      const data = {}      
      // data.push(doc);    
      docSnapshot.forEach(item => {                        
        const itemData = item.data();                
        Object.assign(data, {[itemData.id]: {
          price: itemData.price,            
          name: itemData.name,
          id: itemData.id,
          category: itemData.category,
          craftCost: itemData.craftCost,
          profit: itemData.profit,
          recipe: itemData.recipe,
        }});                          
      });
      setData(data);          
    }
    fetchDocs();
  }, []);
  return { data, setData };
} 
export default useFetch;