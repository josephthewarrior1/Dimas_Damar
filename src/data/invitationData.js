// invitationData.js
import { generateCalendarLink } from './utils';
import { assetPath } from './assetPath';

const invitationData = {
  coupleName: "Nathan & Tia",
  groom: "Romeo Nathan",
  bride: "Julieta Margaretha",
  backgroundImage: assetPath('1.jpeg'),
  backgroundImage2: assetPath('test12.png'),
  backgroundImageGroom: assetPath('test16.jpg'),
  backgroundImageBride: assetPath('test17.jpg'),
  weddingImage: assetPath('test11.jpg'),
  rsvpImage: assetPath('test9.jpg'),
  backgroundImageLive: assetPath('live.webp'),
  backgroundDesign: assetPath('floral.jpg'),
  gradient : assetPath('gradienthitam.png'),
  ornamenImage: assetPath('ornamen.png'),
  ornamenImage1: assetPath('ornamen2.png'),
  imagetime : assetPath ('test6.png'),
  audioUrl: assetPath('music.mp3'),
  eventDate: "2025-09-01",
  date: "1 September 2025",
  cincin : assetPath('cincin.png'),
  gelas : assetPath('gelas.png'),
  bunga : assetPath('bunga.png'),
  gift : assetPath('gift.png'),
  icon : assetPath('icon.png'),
  time: "10.00 - 12.00 WIB",
  location: "Hotel Grand Indonesia",
  locationAddress: "Gereja Sidang Jemaat Kristus\nJl. Raya Darmo Permai III\nSurabaya, Jawa Timur\n60239",
  dateTimeImage: assetPath('test10.png'),
  mapsLink: "https://maps.app.goo.gl/hrsEuRxabUe5R8g1A",
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
