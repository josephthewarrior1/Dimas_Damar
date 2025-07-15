// invitationData.js
import { generateCalendarLink } from './utils';
import { assetPath } from './assetPath';

const invitationData = {
  coupleName: "Nathan & Tia",
  groom: "Nathanael Erikson",
  bride: "Nathania Octaviani",
  backgroundImage: assetPath('test8.jpg'),
  backgroundImage2: assetPath('test12.png'),
  backgroundImageGroom: assetPath('test16.jpg'),
  backgroundImageBride: assetPath('test17.jpg'),
  weddingImage: assetPath('test11.jpg'),
  rsvpImage: assetPath('test9.jpg'),
  backgroundImageLive: assetPath('live.webp'),
  backgroundDesign: assetPath('floral.jpg'),
  audioUrl: assetPath('music.mp3'),
  eventDate: "2025-01-05",
  date: "5 Januari 2025",
  time: "10.00 - 12.00 WIB",
  location: "Hotel Grand Indonesia",
  locationAddress: "Gereja Sidang Jemaat Kristus\nJl. Raya Darmo Permai III\nSurabaya, Jawa Timur\n60239",
  dateTimeImage: assetPath('test11.jpg'),
  mapsLink: "https://maps.app.goo.gl/QAcpiFfeWeyWbKsbA",
  zoomLink: "https://zoom.us/your-meeting-link",
  youtubeLink: "https://youtube.com/your-livestream-link",
  galleryImages: [
    assetPath('test3.png'),
    assetPath('test6.png'),
    assetPath('test7.jpg'),
    assetPath('test8.jpg'),
    assetPath('test9.jpg')
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
