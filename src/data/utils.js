// utils.js
export const generateCalendarLink = (data) => {
    // Parse Indonesian date format (e.g., "5 Januari 2025")
    const parseDate = (dateStr) => {
      const [day, monthName, year] = dateStr.split(' ');
      const months = {
        'Januari': '01', 'Februari': '02', 'Maret': '03',
        'April': '04', 'Mei': '05', 'Juni': '06',
        'Juli': '07', 'Agustus': '08', 'September': '09',
        'Oktober': '10', 'November': '11', 'Desember': '12'
      };
      return `${year}${months[monthName]}${day.padStart(2, '0')}`;
    };
  
    // Extract time (assuming format "10.00 - 12.00 WIB")
    const extractTime = (timeStr) => {
      const [startTime] = timeStr.split(' - ');
      return startTime.replace('.', '').padEnd(6, '0');
    };
  
    const eventDate = parseDate(data.date);
    const eventTime = extractTime(data.time);
    
    const startDateTime = `${eventDate}T${eventTime}`;
    const endDateTime = `${eventDate}T140000`; // Default end time 14:00
  
    return `https://www.google.com/calendar/render?action=TEMPLATE` +
      `&text=${encodeURIComponent(`Pernikahan ${data.coupleName}`)}` +
      `&dates=${startDateTime}/${endDateTime}` +
      `&details=${encodeURIComponent(`Undangan pernikahan ${data.coupleName}`)}` +
      `&location=${encodeURIComponent(data.location)}` +
      `&sf=true&output=xml`;
  };