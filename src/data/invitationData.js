// invitationData.js
import { generateCalendarLink } from './utils';

const invitationData = {
  coupleName: "Teosaner & Sherin",
  groom: "TEOSANER YUTANESY IMAN",
  bride: "SHERIN ANGELA",
  backgroundImage: "/assets/dq.jpg",
  backgroundImage2: "/assets/dq2.jpg",
  backgroundImageGroom: "/assets/groom.jpg",
  backgroundImageBride: "/assets/bride.jpg",
  backgroundImageLive: "/assets/live.jpg",
  backgroundDesign: "/assets/floral.jpg",
  audioUrl: "/assets/music.mp3",
  date: "5 Januari 2025",
  time: "10.00 - 12.00 WIB",
  location: "Hotel Grand Indonesia",
  locationAddress: "Gereja Sidang Jemaat Kristus\nJl. Raya Darmo Permai III\nSurabaya, Jawa Timur\n60239",
  dateTimeImage: "/assets/nikah.jpg",
  mapsLink: "https://maps.app.goo.gl/QAcpiFfeWeyWbKsbA",
  zoomLink: "https://zoom.us/your-meeting-link",
  youtubeLink: "https://youtube.com/your-livestream-link",
  galleryImages: [
    "/assets/1.jpg",
    "/assets/2.jpg",
    "/assets/3.jpg",
    "/assets/4.jpg",
    "/assets/5.jpg"
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