export const groupItemsByDate = (items: any[]) => {
    const grouped: { [key: string]: any[] } = {};
    
    items.forEach(item => {
      const date = new Date(item.timestamp.toDate()).toDateString(); 
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(item);
    });
    
    return grouped;
  };
  