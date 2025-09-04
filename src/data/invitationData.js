// invitationData.js
import { generateCalendarLink } from './utils';
import { assetPath } from './assetPath';

const invitationData = {
  coupleName: "Chris & Yoanda",
  groom: "Joshia Tjhai",
  bride: "Vinny Wijaya",
  backgroundImage: assetPath('putih.webp'),
  putih : assetPath('putih.webp'),
  background: assetPath('background.png'),
  backgroundImage2: assetPath('joshvin6.webp'),
  thanks:assetPath('joshvin5.webp'),
  backgroundImageGroom: assetPath('groomsbackground.webp'),
  backgroundImageBride: assetPath('bridesbackground.webp'),
  weddingImage: assetPath('joshvin4.webp'),
  timeImage: assetPath('krisyoan4.webp'),
  brideimages: assetPath('framebunga.png'),
  groomimages: assetPath('framebunga1.png'),
  frame: assetPath('photoFrame.png'),
  SaveTheDate: assetPath('save.png'),
  rsvpImage: assetPath('test9.jpg'),
  backgroundImageLive: assetPath('live.webp'),
  backgroundDesign: assetPath('floral.jpg'),
  gradient : assetPath('gradienthitam.png'),
  ornamenImage: assetPath('ornamen.png'),
  ornamenImage1: assetPath('ornamen2.png'),
  imagetime : assetPath ('test6.png'),
  audioUrl: assetPath('music.mp3'),
  eventDate: "2025-11-09",
  date: "9 November 2025",
  cincin : assetPath('cincin.png'),
  gelas : assetPath('gelas.png'),
  bunga : assetPath('bunga.png'),
  bunga1 : assetPath('bunga1.png'),
  gift : assetPath('gift.png'),
  icon : assetPath('icon.png'),
  time: "10.00 - 12.00 WIB",
  location: "Gereja Sidang Jemaat Kristus",
  locationAddress: "Gereja Sidang Jemaat Kristus\nJl. Raya Darmo Permai III\nSurabaya, Jawa timur\n60239",
  dateTimeImage: assetPath('test10.png'),
  mapsLink: "https://maps.app.goo.gl/hrsEuRxabUe5R8g1A",
  zoomLink: "https://zoom.us/your-meeting-link",
  youtubeLink: "https://youtube.com/your-livestream-link",
  galleryImages: [
    assetPath('joshvin1.webp'),
    assetPath('joshvin2.webp'),
    assetPath('joshvin3.webp'),
    assetPath('joshvin4.webp'),
    assetPath('joshvin5.webp')
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
