// invitationData.js
import { generateCalendarLink } from './utils';
import { assetPath } from './assetPath';

const invitationData = {
  coupleName: "Teosaner & Sherin",
  groom: "TEOSANER YUTANESY IMAN",
  bride: "SHERIN ANGELA",
  backgroundImage: assetPath('dq.jpg'),
  backgroundImage2: assetPath('dq2.webp'),
  backgroundImageGroom: assetPath('groom.webp'),
  backgroundImageBride: assetPath('bride.webp'),
  backgroundImageLive: assetPath('live.webp'),
  backgroundDesign: assetPath('floral.jpg'),
  audioUrl: assetPath('music.mp3'),
  date: "5 Januari 2025",
  time: "10.00 - 12.00 WIB",
  location: "Hotel Grand Indonesia",
  locationAddress: "Gereja Sidang Jemaat Kristus\nJl. Raya Darmo Permai III\nSurabaya, Jawa Timur\n60239",
  dateTimeImage: assetPath('nikah.webp'),
  mapsLink: "https://maps.app.goo.gl/QAcpiFfeWeyWbKsbA",
  zoomLink: "https://zoom.us/your-meeting-link",
  youtubeLink: "https://youtube.com/your-livestream-link",
  galleryImages: [
    assetPath('1.jpg'),
    assetPath('2.jpg'),
    assetPath('3.jpg'),
    assetPath('4.jpg'),
    assetPath('5.jpg')
  ],
  get calendarLink() {
    return generateCalendarLink({
      coupleName: this.coupleName,
      date: this.date,
      time: this.time,
      location: this.location
    });
  }
};

export default invitationData;
