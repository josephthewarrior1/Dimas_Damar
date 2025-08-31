// invitationData.js
import { generateCalendarLink } from './utils';
import { assetPath } from './assetPath';

const invitationData = {
  coupleName: "Chris & Yoanda",
  groom: "Christian Nathan",
  bride: "Yoanda Angela",
  backgroundImage: assetPath('1.jpeg'),
  backgroundImage2: assetPath('krisyoan1.jpg'),
  thanks:assetPath('krisyoan3.jpg'),
  backgroundImageGroom: assetPath('groomsbackground.png'),
  backgroundImageBride: assetPath('bridesbackground.png'),
  weddingImage: assetPath('krisyoan2.jpg'),
  timeImage: assetPath('krisyoan3.jpg'),
  brideimages: assetPath('brides.png'),
  groomimages: assetPath('grooms.png'),
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
    assetPath('krisyoan5.jpg'),
    assetPath('krisyoan2.jpg'),
    assetPath('krisyoan3.jpg'),
    assetPath('krisyoan4.jpg'),
    assetPath('krisyoan6.jpg')
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
